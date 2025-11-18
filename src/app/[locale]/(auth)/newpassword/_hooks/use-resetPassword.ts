import { ResetPasswordValues } from "@/lib/schemas/auth.forget.schemes";
import { useMutation } from "@tanstack/react-query";
import { newPassword } from "../_actions/new-password.action";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      const response = await newPassword(values);
      // Handle Error
      if (response?.error) {
        toast?.error(t("error-toast"));
        throw new Error(response.error || t("operationFailed"));
      }

      // Handle Success Response
      if (response?.message === "success") {
        localStorage.removeItem("email");
        toast?.success(t("confirm-toast"));
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }

      return response;
    },
  });

  return { isPending, error, resetPassword: mutate };
}
