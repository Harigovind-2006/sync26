import { supabase } from "../config/supabase";
import { Buyer, CreateBuyerDTO } from "../models/buyer";

export class BuyerService {
  static async createBuyer(dto: CreateBuyerDTO): Promise<Buyer> {
    const { data, error } = await supabase
      .from("buyers")
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
      .from("buyers")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to query buyer by email: ${error.message}`);
    }

    return data as Buyer | null;
  }

  static async findById(id: string): Promise<Buyer | null> {
    const { data, error } = await supabase
      .from("buyers")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to query buyer by id: ${error.message}`);
    }

    return data as Buyer | null;
  }
}
