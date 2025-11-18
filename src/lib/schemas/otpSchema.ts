import { z } from "zod";

export const createOtpSchema = (t: (key: string) => string) =>
  z.object({
    otp: z
      .string()
      .min(6, t("otp.validation.min"))
      .max(6, t("otp.validation.max"))
      .regex(/^[0-9]+$/, t("otp.validation.regex")),
  });

export type OtpSchemaType = z.infer<ReturnType<typeof createOtpSchema>>;
