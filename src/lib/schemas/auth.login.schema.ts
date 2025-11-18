import { useTranslations } from "next-intl";
import { z } from "zod";

export const useLoginFormSchema = () => {
  // Translation
  const t = useTranslations();

  const schema = z.object({
    email: z
      .email(t("validation.email.invalid"))
      .min(1, t("validation.email.required")),
    password: z.string().min(1, t("validation.password.required")),
  });

  return schema;
};

export type LoginFormInput = z.infer<ReturnType<typeof useLoginFormSchema>>;
