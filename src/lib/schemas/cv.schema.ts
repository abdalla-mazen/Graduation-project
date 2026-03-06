import { z } from "zod";
export const cvSchema = z.object({
  file: z
    .instanceof(File, { message: "PDF file is required" })
    .refine((file) => file.size > 0, "File is required")
    .refine((file) => file.type === "application/pdf", "Only PDF files are allowed"),
});
