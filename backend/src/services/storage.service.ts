import fs from "fs";
import path from "path";
import { supabase } from "../config/supabase";
import { logger } from "../utils/logger";

export class StorageService {
  private static BUCKET_NAME = "images";

  private static async uploadFile(
    folder: "originals" | "watermarked" | "suspects",
    filePath: string,
    filename: string
  ): Promise<string> {
    const fileBuffer = fs.readFileSync(filePath);
    const destinationPath = `${folder}/${Date.now()}-${filename}`;

    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(destinationPath, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      logger.warn(`Supabase Storage upload fallback (using local path): ${error.message}`);
      return `/uploads/${path.basename(filePath)}`;
    }

    return this.getPublicURL(data.path);
  }

  static async uploadOriginal(filePath: string, filename: string): Promise<string> {
    return this.uploadFile("originals", filePath, filename);
  }

  static async uploadWatermarked(filePath: string, filename: string): Promise<string> {
    return this.uploadFile("watermarked", filePath, filename);
  }

  static async uploadSuspect(filePath: string, filename: string): Promise<string> {
    return this.uploadFile("suspects", filePath, filename);
  }

  static async deleteImage(storagePath: string): Promise<void> {
    const { error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .remove([storagePath]);

    if (error) {
      logger.error(`Failed to delete image from Supabase storage: ${error.message}`);
    }
  }

  static getPublicURL(storagePath: string): string {
    const { data } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(storagePath);

    return data.publicUrl;
  }
}
