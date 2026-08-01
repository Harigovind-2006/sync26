import { supabase } from "../config/supabase";
import { LicenseModel, CreateLicenseDTO } from "../models/license";
import { v4 as uuidv4 } from "uuid";

export class LicenseService {
  static async createLicense(
    buyerId: string,
    imageId: string,
    licenseTerms: string
  ): Promise<LicenseModel> {
    const licenseId = uuidv4();
    const watermarkPayload = `LENSTRACE:${imageId}:${buyerId}:${licenseId}`;

    const dto: CreateLicenseDTO = {
      buyer_id: buyerId,
      image_id: imageId,
      watermark_payload: watermarkPayload,
      license_terms: licenseTerms,
      status: "active",
    };

    const { data, error } = await supabase
      .from("licenses")
      .insert([{ id: licenseId, ...dto }])
      .select()
      .single();

    if (error) {
      return { id: licenseId, ...dto };
    }

    return data as LicenseModel;
  }

  static async getAllLicenses(): Promise<LicenseModel[]> {
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data || []) as LicenseModel[];
  }

  static async getLicenseById(id: string): Promise<LicenseModel | null> {
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }

    return data as LicenseModel;
  }

  static async findByWatermarkPayload(payload: string): Promise<LicenseModel | null> {
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("watermark_payload", payload)
      .single();

    if (error) {
      return null;
    }

    return data as LicenseModel;
  }
}
