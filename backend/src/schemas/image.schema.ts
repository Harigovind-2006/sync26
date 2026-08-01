import { z } from "zod";

export const uploadImageSchema = z.object({
  title: z.string().min(1, "Title is required"),
});
