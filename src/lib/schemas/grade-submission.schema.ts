import { z } from "zod";

const scoreSchema = z.number().min(0, "Score must be at least 0");

export const gradeSubmissionSchema = z.object({
  score: scoreSchema,
  feedback: z.string().trim().max(1000, "Feedback is too long"),
});

export const createGradeSubmissionSchema = (maxScore: number) =>
  gradeSubmissionSchema.extend({
    score: z
      .number()
      .min(0, "Score must be at least 0")
      .max(maxScore, `Score cannot exceed ${maxScore.toFixed(2)}`),
  });

export type GradeSubmissionValues = z.infer<typeof gradeSubmissionSchema>;
