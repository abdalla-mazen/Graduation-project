import { useMutation } from "@tanstack/react-query";
import { finishExamAPI } from "../_actions/finish-exam.action";

export interface FinishExamResult {
  success: boolean;
  score?: number;
  max_score?: number;
  total_questions?: number;
  correct_answers?: number;
  wrong_answers?: number;
  invalidated?: boolean;
  finished_at?: string;
}

export default function useFinishExam() {
  const { error, isPending, mutateAsync, data } = useMutation<
    FinishExamResult,
    Error,
    number
  >({
    mutationFn: async (examSessionId: number) => {
      const response = await finishExamAPI(examSessionId);

      if (response && "error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  return { isPending, error, finish: mutateAsync, data };
}
