"use client";

import { RegisterValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";

export default function useRegister() {
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const response = await registerAction(values);

      if ("error" in response) {
        throw new Error(response.error);
      }

      // return response;
      location.href = "/login";

      return response;
    },
  });

  return { isPending, error, register: mutate };
}
