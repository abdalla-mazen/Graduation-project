import { z } from "zod";

export const addExamSchema = z.object({
  academic_course_id: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  description: z.string().max(3000).optional(),
  exam_type: z.enum(["midterm", "final", "quiz", "assignment"]),
  duration_minutes: z.number().int().positive(),
  passing_score: z.number().min(0).max(100),
  total_marks: z.number().positive(),
starts_at: z.iso.datetime({ local: true }),
ends_at: z.iso.datetime({ local: true }),
})
.refine((data) => new Date(data.ends_at) > new Date(data.starts_at), {
  message: "End date must be after start date",
  path: ["ends_at"],
});

export type AddExamValues = z.infer<typeof addExamSchema>;

