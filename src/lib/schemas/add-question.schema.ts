import { z } from "zod";

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  is_correct: z.boolean()
});

export const addQuestionSchema = z.object({
  text: z.string().min(1, "Question is required"),
  question_type: z.string("mcq"),
  marks: z.number().min(0),
  options: z
    .array(optionSchema)
    .min(2, "At least 2 options required")
    .refine(
      (opts) => opts.some((opt) => opt.is_correct),
      "At least one correct answer is required"
    )
});

export type AddQuestionSchema = z.infer<typeof addQuestionSchema>;