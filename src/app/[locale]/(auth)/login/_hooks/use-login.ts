import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";

export interface LoginValues {
  username: string;
  password: string;
}

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      // Login error
      console.log(response, "responseeee");
      if (response?.error) {
        throw new Error("Invalid email or password");
      }
      // On success navigate to home
      if (response?.ok) {
        const session = await getSession();
        console.log(session);
        const role = session?.user?.role;
        console.log(role);
        if (session?.user?.role == "TEACHER") {
          window.location.href = "/doctor-view";
        }
        if (session?.user?.role == "STUDENT") {
          if (session?.user?.isFirstTime) {
            window.location.href = "/assesment-access";
          } else {
            window.location.href = "/";
          }
        }
      }

      return response;
    },
  });
  return { isPending, error, login: mutate };
}
