import { supabase } from "../config/supabase";
import { Buyer, CreateBuyerDTO } from "../models/buyer";

// Use Supabase built-in auth.users via service role, with a profile table fallback.
// The 'buyers' table stores custom profile fields (name, wallet_address, password_hash)
// that Supabase Auth does not store natively.

const TABLE = "users";

export class BuyerService {
  static async createBuyer(dto: CreateBuyerDTO): Promise<Buyer> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([dto])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create buyer: ${error.message}`);
    }

    return data as Buyer;
  }

  static async findByEmail(email: string): Promise<Buyer | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("email", email)
      .maybeSingle();                // maybeSingle() returns null if not found — no error

    if (error) {
      throw new Error(`Failed to query buyer by email: ${error.message}`);
    }

    return data as Buyer | null;
  }

  static async findById(id: string): Promise<Buyer | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to query buyer by id: ${error.message}`);
    }

    return data as Buyer | null;
  }
}
