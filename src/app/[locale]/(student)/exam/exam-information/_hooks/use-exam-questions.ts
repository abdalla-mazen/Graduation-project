import { useMutation } from "@tanstack/react-query";
import { getExamQuestions } from "../_actions/exam-questions.action";
import { ExamResponse } from "@/lib/types/exam-questions";

export function useStartExam() {
  return useMutation({
    mutationFn: async (examId: number) => {
      const data:ExamResponse = await getExamQuestions(examId);
      return data;
    },
  });
}