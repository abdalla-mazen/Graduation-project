import { useTranslations } from "next-intl";
import z from "zod";

// Forget Schema
export const useForgetPasswordSchema = () => {
  // Translation
  const t = useTranslations();

  // Schema
  return z.object({
    email: z
    .email(t("invalid-email-error"))
    .nonempty(t("email-required-error")),
  });
};
// type  Forget Schema
export type ForgetValues = z.infer<ReturnType<typeof useForgetPasswordSchema>>;

// Reset Password Schema
export const useResetPasswordSchema = ()=>{
  // Translation
  const t = useTranslations();

  // Schema
  return z.object({
    email: z
    .email(t("invalid-email-error"))
    .nonempty(t("email-required-error")),
    password: z
      .string(t("invalid-password-error"))
      .nonempty(t("password-required-error")),
    newPassword: z
      .string(t("invalid-password-error"))
      .nonempty(t("password-required-error")),
  })
  .refine((data) => data.password === data.newPassword, {
    error: t("invalid-confirm-password-error"),
    path: ["newPassword"],
  });
}
// type Reset Password
export type ResetPasswordValues = z.infer<ReturnType<typeof useResetPasswordSchema>>;
