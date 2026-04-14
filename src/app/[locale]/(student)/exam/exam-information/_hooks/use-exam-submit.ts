import { useMutation } from "@tanstack/react-query";
import { ExamSubmitPayload } from "@/lib/types/exam-submit";
import { submitExamAction } from "../_actions/exam-submit.action";

export function useSubmitExam() {
  return useMutation({
    mutationFn: ({
      examId,
      payload,
    }: {
      examId: number;
      payload: ExamSubmitPayload;
    }) => submitExamAction(examId, payload),
  });
}