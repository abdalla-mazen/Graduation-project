import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required").min(3, "Min 3 characters"),
  provider: z.string().min(1, "Provider is required"),
  credential_url: z.string().min(1, "Credential URL is required").url("Enter a valid URL"),
skill_id: z.number( "Please select a skill" ),
  issue_date: z.string().optional(),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;