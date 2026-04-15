import { useMutation } from "@tanstack/react-query";
import { submitGradeAction } from "../_actions/submit-grade.action";

interface SubmitGradePayload {
  id: number;
  score: number;
  feedback: string;
}

export function useSubmession() {
  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: async ({ id, score, feedback }: SubmitGradePayload) =>
      submitGradeAction(id, score, feedback),
  });

  return { isPending, submit: mutateAsync, error };
}
