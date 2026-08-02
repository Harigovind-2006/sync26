export interface ImageModel {
  id: string;
  creator_id: string;
  filename: string;
  original_url?: string | null;
  watermarked_url?: string | null;
  sha256?: string | null;
  blockchain_tx?: string | null;
  status?: string;
  created_at?: string;
}

export type CreateImageDTO = Omit<ImageModel, "id" | "created_at">;
