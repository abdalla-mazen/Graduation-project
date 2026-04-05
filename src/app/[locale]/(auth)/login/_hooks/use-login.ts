// import { useMutation } from "@tanstack/react-query";
// import { loginAction } from "../_actions/login.action";
// import { cookies } from "next/headers";

export interface LoginValues {
    username: string;
    password: string;
} 

// export default function useLogin() {
//     const { error, isPending, mutate } = useMutation({
//         mutationFn: async (values: LoginValues) => {
//             const response = await loginAction(values);

//             if ("error" in response) {
//                 throw new Error(response.error);
//             }   
//             if ("access_token" in response) {
//                cookies().set("access_token", response.access_token);
//             }
//             return response;
// }


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
        window.location.href = "/choosetrack";
      }

      return response;
    },
  });
  return { isPending, error, login: mutate };
}
