"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormInput, useLoginFormSchema } from "@/lib/schemas/auth.login.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/ui/password-input";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import GoogleSignInButton from "@/components/shared/google-button";
import FacebookLoginButton from "@/components/shared/facebook-button";

export default function LoginForm() {
  // Translation
  const t = useTranslations();

  // Schema
  const schema = useLoginFormSchema();

  // Form
  const form = useForm<LoginFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  // Hooks
  // const { isPending, login, error } = useLogin();

  // Functions
  const onSubmitHandler: SubmitHandler<LoginFormInput> = (values) => {
    console.log(values);
  };

  // Effect
  useEffect(() => {
    const timerId = setTimeout(() => {
      form.setFocus("email");
    }, 0);

    return () => clearTimeout(timerId);
  }, [form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4 ">
          {/* Email form field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-sm capitalize text-blue-500 ">
                  {t("email-label")}
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password form field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-sm text-blue-500">
                  {t("password-label")}
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot password */}
          <div className="flex flex-col items-center space-y-6 pt-2">
            <div className="w-full rtl:text-start text-end">
              <Link href="/forgot-password" className="text-blue-500 text-sm hover:underline">
                {t("forgot-password")}
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitted && !form.formState.isValid}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {t("login-button")}
            </Button>
            <div className=" flex flex-col sm:flex-row w-full items-center justify-between pt-2 gap-2">
              <GoogleSignInButton className=" w-full" />
              <FacebookLoginButton className="w-full" />
            </div>
            {/* Register */}
            <p className="text-slate-700 dark:text-white">
              {t.rich("no-account", {
                Link: (chunks) => (
                  <Link
                    href="/register"
                    className="font-bold text-blue-500 text-sm hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
