import { z } from "zod";

export const createBreachReportSchema = z.object({
  imageId: z.string().uuid("Invalid image ID UUID"),
  suspect_url: z.string().url("Invalid suspect image URL"),
  confidence: z.number().min(0).max(1).optional(),
});
