import { z } from "zod";

export const createLicenseSchema = z.object({
  image_id: z.string().uuid("Invalid image ID UUID"),
  license_terms: z.string().min(3, "License terms are required"),
});
