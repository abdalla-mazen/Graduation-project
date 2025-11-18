"use client";

import React from "react";
import useForget from "../_hooks/use-forget";
import { ForgetValues, useForgetPasswordSchema } from "@/lib/schemas/auth.forget.schemes";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EmailInput from "@/components/shared/email-input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ForgetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, forget } = useForget();

  // Form
  const schema = useForgetPasswordSchema();
  const form = useForm<ForgetValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  // Variables
  const timer = localStorage.getItem("timer");

  // Function
  const onSubmit: SubmitHandler<ForgetValues> = (values) => {
    forget(values);
    localStorage.setItem("email", values.email);
  };

  return (
    <div className="  pt-4  pb-9 border-y border-y-zinc-200 dark:border-y-zinc-600">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email field */}
          <EmailInput />

          {/* Feedback */}
          {form.formState.errors.email && (
            <>
              {/* Error validation */}
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
            <Alert className="text-center text-maroon-600 mb-4 border border-maroon-600 dark:border-softPink-300 dark:bg-zinc-800 dark:text-softPink-300">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {/* submit button */}
          <Button
            disabled={isPending || (!isValid && isSubmitted) || !!timer}
            className="w-full  "
            variant={"primary"}
          >
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">{t("continue")}</span>
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
