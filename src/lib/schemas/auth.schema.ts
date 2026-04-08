
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  const t = useTranslations();

  return z.object({
    username: z.string().nonempty(t("firstname-req")),
    email: z.string().nonempty(t("email-req")),
    password: z
      .string()
      .min(8, t("password-mess"))
      .nonempty(t("password-req")),
    role: z.string().nonempty("role is required"),

    university: z.string().optional(),
    faculty : z.string().optional(),
    department: z.string().optional(),
    semester: z.string().optional(),
    track: z.string().optional(),
     drPassword: z.string().optional(),
  });
};

export type RegisterValues = z.infer<ReturnType<typeof useRegisterSchema>>;

