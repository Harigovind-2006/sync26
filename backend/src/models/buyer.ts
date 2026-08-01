export interface Buyer {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  wallet_address?: string | null;
  created_at?: string;
}

export type CreateBuyerDTO = Omit<Buyer, "id" | "created_at">;
