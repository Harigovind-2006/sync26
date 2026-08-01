export interface LicenseModel {
  id: string;
  buyer_id: string;
  image_id: string;
  watermark_payload: string;
  license_terms: string;
  status: "active" | "expired" | "revoked";
  created_at?: string;
}

export type CreateLicenseDTO = Omit<LicenseModel, "id" | "created_at">;
