import { z } from "zod";

export const addExperienceSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    company_name: z.string().min(1, "Company name is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().nullable().optional(),
    description: z.string().min(1, "Description is required").max(4000),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    is_current_role: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (!values.is_current_role && !values.end_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date is required unless this is your current role.",
        path: ["end_date"],
      });
    }

    if (
      !values.is_current_role &&
      values.end_date &&
      values.end_date < values.start_date
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date cannot be earlier than start date.",
        path: ["end_date"],
      });
    }
  });

export type AddExperienceValues = z.infer<typeof addExperienceSchema>;

export type AddExperiencePayload = Omit<AddExperienceValues, "is_current_role">;
export type UpdateExperiencePayload = Partial<AddExperiencePayload>;

export function toExperiencePayload(
  values: AddExperienceValues
): AddExperiencePayload {
  return {
    title: values.title,
    company_name: values.company_name,
    start_date: values.start_date,
    end_date: values.is_current_role ? null : values.end_date ?? null,
    description: values.description,
    skills: [...values.skills],
  };
}
