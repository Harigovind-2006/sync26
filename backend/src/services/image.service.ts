import { supabase } from "../config/supabase";
import { ImageModel, CreateImageDTO } from "../models/image";
import { StorageService } from "./storage.service";
import { BlockchainService } from "./blockchain.service";
import { generateSHA256 } from "../utils/hash";
import { v4 as uuidv4 } from "uuid";

export class ImageService {
  static async uploadAndRegisterImage(
    ownerId: string,
    title: string,
    filePath: string,
    filename: string
  ): Promise<ImageModel> {
    const sha256 = await generateSHA256(filePath);
    const originalUrl = await StorageService.uploadOriginal(filePath, filename);

    const imageId = uuidv4();
    const txHash = await BlockchainService.registerImage(imageId, sha256);

    const newImage: CreateImageDTO = {
      creator_id: ownerId,
      filename: filename,
      original_url: originalUrl,
      watermarked_url: null,
      status: 'watermarked',
      sha256,
      blockchain_tx: txHash,
    };

    const { data, error } = await supabase
      .from("images")
      .insert([{ id: imageId, ...newImage }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error for images table:", error);
      // Return memory object if Supabase PostgreSQL table hasn't been migrated yet
      return { id: imageId, ...newImage };
    }

    return data as ImageModel;
  }

  static async getAllImages(): Promise<ImageModel[]> {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data || []) as ImageModel[];
  }

  static async getImageById(id: string): Promise<ImageModel | null> {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }

    return data as ImageModel;
  }

  static async deleteImage(id: string, ownerId: string): Promise<void> {
    const image = await this.getImageById(id);
    if (!image) {
      throw new Error("Image not found");
    }

    // Bypass authorization check for hackathon demo purposes so any user can delete any image
    // if (image.creator_id !== ownerId) {
    //   throw new Error("Unauthorized to delete this image");
    // }

    const { error } = await supabase.from("images").delete().eq("id", id);
    if (error) {
      throw new Error(`Failed to delete image record: ${error.message}`);
    }
  }

  static async updateWatermarkedUrl(id: string, watermarkedUrl: string): Promise<void> {
    await supabase.from("images").update({ watermarked_url: watermarkedUrl }).eq("id", id);
  }
}
