import { useMutation } from "@tanstack/react-query";
import { SubmitAnsewerAssesment } from "../_actions/assessment.action";

export default function useAssessment() {
  const { error, isPending, mutateAsync  } = useMutation({
    mutationFn: async (values: any) => {
      const response = await SubmitAnsewerAssesment(values);

      if ("error" in response) {
        throw new Error(response.error);
      }

      console.log(response);
      return response;
    },
  });
  return { isPending, error, submit: mutateAsync  };
}
