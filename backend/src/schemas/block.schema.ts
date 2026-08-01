import { z } from "zod";

export const blockImageSchema = z.object({
  imageId: z.string().min(1, "Image ID is required"),
  reason: z.enum([
    "Copyright Theft",
    "Unauthorized AI Scraping",
    "License Expiration",
    "DMCA Order",
    "Manual Creator Block"
  ], {
    errorMap: () => ({ message: "Invalid block reason" })
  }),
  notes: z.string().optional(),
  blockScope: z.enum([
    "Global Crawler Quarantine",
    "Public Access Revocation",
    "Polygon On-Chain Blacklist"
  ]).default("Global Crawler Quarantine"),
});

export const unblockImageSchema = z.object({
  imageId: z.string().min(1, "Image ID is required"),
  reason: z.string().min(2, "Unblock reason is required"),
});
