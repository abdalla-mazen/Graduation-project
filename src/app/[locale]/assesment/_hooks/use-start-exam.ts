// import { useMutation } from "@tanstack/react-query";
// import { startExamAction } from "../_actions/exam-start.action";

// export default function useStartExam() {
//   const { error, isPending, mutate } = useMutation({
//     mutationFn: async (values: Record<string, number>) => {
//       const response = await startExamAction(values);
//       return response;
//     },
//   });
//   return { isPending, error, start: mutate };
// }

import { useMutation } from "@tanstack/react-query";
import { startExamAction } from "../_actions/exam-start.action";

export default function useStartExam() {
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: async (values: Record<string, number>) => {
      const response = await startExamAction(values);
      return response;
    },
  });

  return { isPending, error, start: mutateAsync }
}