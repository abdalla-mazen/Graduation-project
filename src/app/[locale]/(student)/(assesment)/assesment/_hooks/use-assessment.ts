import { useMutation } from "@tanstack/react-query";
import { SubmitAnsewerAssesment } from "../_actions/assessment.action";

 interface SubmitAnswerRequest {
  exam_id: number;
  question_id: number;
  option_id: number;
}

// export default function useAssessment() {
//   const { error, isPending, mutateAsync  } = useMutation({
//     mutationFn: async (values: SubmitAnswerRequest) => {
//       const response = await SubmitAnsewerAssesment(values);
// console.log(response);
//       if ("error" in response) {
//         throw new Error(response.error);
//       }

//       console.log(response);
//       return response;
//     },
//   });
//   return { isPending, error, submit: mutateAsync  };
// }


export default function useAssessment() {
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: async (values: SubmitAnswerRequest) => {
      const response = await SubmitAnsewerAssesment(values);

      if ("error" in response) {
        // مش بنـthrow عشان متكسرش الـ UI
        // بنرجع الـ response زي ما هو والـ caller يقرر
        console.warn("Assessment submission rejected:", response.error);
        return response;
      }

      return response;
    },
  });
  return { isPending, error, submit: mutateAsync };
}