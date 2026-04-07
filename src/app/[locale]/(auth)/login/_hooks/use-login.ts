export interface LoginValues {
    username: string;
    password: string;
} 
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response  = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      // Login error
      console.log(response);
      if (response?.error) {
        throw new Error("Invalid email or password");
      }
      // On success navigate to home
      if (response?.ok) {
        window.location.href = "/home";
      }

      return response;
    },
  });
  return { isPending, error, login: mutate };
}
