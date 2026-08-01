import { z } from "zod";

export const updateBuyerSchema = z.object({
  name: z.string().min(2).optional(),
  wallet_address: z.string().optional(),
});
