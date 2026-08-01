export interface ImageModel {
  id: string;
  owner_id: string;
  title: string;
  original_url: string;
  watermarked_url?: string | null;
  sha256: string;
  phash?: string | null;
  blockchain_tx?: string | null;
  created_at?: string;
}

export type CreateImageDTO = Omit<ImageModel, "id" | "created_at">;
