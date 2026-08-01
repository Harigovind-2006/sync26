import { z } from "zod";

export const coOwnerSchema = z.object({
  name: z.string().min(2, "Co-owner name is required"),
  role: z.string().min(2, "Role is required"),
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{4}\.\.\.[a-fA-F0-9]{4}$/, "Invalid Polygon wallet address"),
  share: z.number().min(1, "Share must be at least 1%").max(100, "Share cannot exceed 100%"),
});

export const updateCoOwnersSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  coOwners: z.array(coOwnerSchema).min(1, "At least one co-owner is required"),
});

export const transferOwnershipSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  newOwnerWallet: z.string().min(10, "Valid new owner wallet address is required"),
  newOwnerName: z.string().min(2, "New owner name is required"),
  transferReason: z.string().optional(),
});

export const executePayoutSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  amountMatic: z.number().positive("Payout amount must be greater than 0"),
});
