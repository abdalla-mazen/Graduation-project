import { useMutation } from "@tanstack/react-query";
import { forgetAction } from "../_actions/forget.action";
import { ForgetValues } from "@/lib/schemas/auth.forget.schemes";
import { useRouter } from "next/navigation";
export default function useForget() {
  const router = useRouter();

  //   Mutation action
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: ForgetValues) => {
      // Call server action
      const response = await forgetAction(values);

      // Handle Error
      if ("error" in response) {
        throw new Error(response.error || "Something went wrong");
      }

      // Handle Success Response to redirect
      if (response?.message === "success") {
        router.push("/otp");
      }
      return response;
    },
  });
  return { isPending, error, forget: mutate };
}
