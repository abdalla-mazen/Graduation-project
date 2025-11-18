"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordValues, useResetPasswordSchema } from "@/lib/schemas/auth.forget.schemes";
import useResetPassword from "../_hooks/use-resetPassword";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import PasswordInputRHF from "@/components/shared/password-input-RHF";

export default function ResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, resetPassword } = useResetPassword();

  // Form
  const schema = useResetPasswordSchema();
  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      email: "",
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  //  Function
  const onSubmit = (values: ResetPasswordValues) => {
    resetPassword(values);
  };

  // Effect
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      form.setValue("email", email);
    }
  }, [form]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <PasswordInputRHF name="password" label={t("password-label")} />

          {/* Confirm Password */}
          <PasswordInputRHF name="newPassword" label={t("confirm-password-label")} />

          {/* Error Validation */}
          {(form.formState.errors.password || form.formState.errors.newPassword) && (
            <>
              <div className="relative ">
                <CircleX className="absolute bg-white dark:bg-zinc-800 rounded-full w-fit -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-maroon-600 dark:text-softPink-300" />
              </div>
              <Alert className="text-center mb-4 border-maroon-600 dark:border-softPink-300 dark:bg-zinc-800  ">
                <AlertDescription className="text-zinc-700 dark:text-zinc-50 ">
                  {t("operationFailed")}
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* Error from server */}
          {error && (
            <Alert className="text-center mb-4 dark:text-softPink-300">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || (!isValid && isSubmitted)}
            variant={"primary"}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : t("reset-password")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
