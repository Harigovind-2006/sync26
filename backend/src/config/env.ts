import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000").transform((val) => parseInt(val, 10)),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  POLYGON_RPC: z.string().url(),
  PRIVATE_KEY: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.warn("Invalid or missing environment variables. Using fallback configurations:", _env.error.format());
}

export const config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  SUPABASE_URL: process.env.SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_service_role_key",
  JWT_SECRET: process.env.JWT_SECRET || "default_lenstrace_jwt_secret",
  POLYGON_RPC: process.env.POLYGON_RPC || "https://rpc-amoy.polygon.technology/",
  PRIVATE_KEY: process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000",
};
