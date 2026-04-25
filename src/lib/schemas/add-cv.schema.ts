import { z } from "zod";

export const CVschema = z.object({
  name: z.string(),
  job_title: z.string().min(1, "Job title is required"),
  email: z.string().email(),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  linkedin: z.string().url().or(z.literal("")),
  github: z.string().url().or(z.literal("")),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  experience: z.string(), 
  courses: z.string(),  
  education: z.array(z.string()),
  languages: z.string().min(1, "Select a language"),
});

export type FormValues = z.infer<typeof CVschema>;