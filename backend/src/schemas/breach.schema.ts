import { z } from "zod";

export const createBreachReportSchema = z.object({
  license_id: z.string().uuid("Invalid license ID UUID").optional(),
  suspect_url: z.string().url("Invalid suspect image URL"),
  confidence: z.number().min(0).max(1).optional(),
});
