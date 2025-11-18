// import { useTranslations } from "next-intl";
// import { z } from "zod";

// export const useRegisterSchema = () => {
//   // Translation
//   const t = useTranslations();

//   return z
//     .object({
//       firstName: z.string().nonempty(t("firstname-req")),
//       lastName: z.string().nonempty(t("lastname-req")),
//       email: z.string().nonempty(t("email-req")),
//       password: z
//         .string()
//         .min(6, t("password-mess"))
//         .nonempty(t("password-req")),
//       rePassword: z.string().nonempty(t("confirm-password-req")),
//       phone: z.string().min(10, t("phone-mess")).nonempty(t("phone-req")),
//       registerAs: z.enum(["student", "graduated"]),
//     })
//     .refine((data) => data.password === data.rePassword, {
//       message: t("confirm-password-mess"),
//       path: ["rePassword"],
//     });
// };

// export type RegisterValues = z.infer<ReturnType<typeof useRegisterSchema>>;


import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  const t = useTranslations();

  return z
    .object({
      firstName: z.string().nonempty(t("firstname-req")),
      lastName: z.string().optional(),
      email: z.string().nonempty(t("email-req")).email(t("email-invalid")),
      password: z
        .string()
        .min(6, t("password-mess"))
        .nonempty(t("password-req")),
      rePassword: z.string().nonempty(t("confirm-password-req")),
      phone: z.string().nonempty(t("phone-req")).min(10, t("phone-mess")),
      registerAs: z.enum(["student", "graduated"]),
      // حقول إضافية للفورم (افتراضيًا optional — لكن سيتحقق منها في superRefine)
      track: z.string().optional(),
      faculty: z.string().optional(),
      year: z.string().optional(),
      term: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // تحقق من تطابق الباسوردات
      if (data.password !== data.rePassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("confirm-password-mess"),
          path: ["rePassword"],
        });
      }

      // تحقق شرطي للطلاب
      if (data.registerAs === "student") {
        if (!data.faculty || data.faculty.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("faculty-req") ?? "Faculty is required",
            path: ["faculty"],
          });
        }
        if (!data.year || data.year.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("year-req") ?? "Academic year is required",
            path: ["year"],
          });
        }
        if (!data.term || data.term.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("term-req") ?? "Term is required",
            path: ["term"],
          });
        }
        if (!data.track || data.track.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("track-req") ?? "Track is required",
            path: ["track"],
          });
        }
      }

      // تحقق للخريجين: track مطلوب
      if (data.registerAs === "graduated") {
        if (!data.track || data.track.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("track-req") ?? "Track is required",
            path: ["track"],
          });
        }
      }
    });
};

export type RegisterValues = z.infer<ReturnType<typeof useRegisterSchema>>;
