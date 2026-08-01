import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "./env";
import { logger } from "../utils/logger";

class DatabaseConnection {
  private static instance: SupabaseClient | null = null;

  public static getClient(): SupabaseClient {
    if (!this.instance) {
      const url = config.SUPABASE_URL;
      const key = config.SUPABASE_SERVICE_ROLE_KEY;

      if (!url || url.includes("placeholder")) {
        logger.warn("Supabase DB URL is not configured. Database operating with mock/fallback client.");
      }

      this.instance = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        db: {
          schema: "public",
        },
        global: {
          headers: {
            "x-application-name": "LaxmanRekha-SecurityEngine",
          },
        },
      });

      logger.info("Secure Supabase Database connection initialized.");
    }

    return this.instance;
  }

  public static async checkHealth(): Promise<{ status: "connected" | "disconnected" | "fallback"; error?: string }> {
    try {
      const client = this.getClient();
      const { error } = await client.from("users").select("id").limit(1);

      if (error) {
        return { status: "fallback", error: error.message };
      }

      return { status: "connected" };
    } catch (err: any) {
      return { status: "disconnected", error: err.message || "Connection failed" };
    }
  }
}

export const db = DatabaseConnection.getClient();
export const checkDbHealth = DatabaseConnection.checkHealth;
export default db;
