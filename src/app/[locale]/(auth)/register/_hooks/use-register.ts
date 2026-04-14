import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";
import { ApiResponse } from "@/lib/types/register";
import { RegisterPayload } from "@/lib/types/registerPayload";


export default function useRegister() {
  const mutation = useMutation<ApiResponse, Error, RegisterPayload>({
    mutationFn: async (values: RegisterPayload) => {
      const response = await registerAction(values);

      if (!response.ok) {
        throw new Error(response.error ?? "Registration failed");
      }

      window.location.href = "/login";

      return response;
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error ?? null,
    register: mutation.mutateAsync,
  };
}