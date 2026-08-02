export interface Buyer {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role?: string | null;
  wallet_address?: string | null;
  created_at?: string;
}

export type CreateBuyerDTO = Omit<Buyer, "id" | "created_at">;
