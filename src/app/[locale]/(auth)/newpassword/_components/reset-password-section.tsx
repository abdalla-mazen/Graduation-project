import { useLocale, useTranslations } from "next-intl";
import React from "react";
import ResetPassword from "./reset-password";
import { Link } from "@/i18n/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function ResetPasswordSection() {
  // Translation
  const t = useTranslations();

  // Hooks
  const locale = useLocale();

  // Variables
  const isRTL = locale === "ar";
  return (
    <section className="w-406 flex justify-center flex-col items-center py-10 mx-10  dark:bg-zinc-800">
      <div className=" flex flex-col   ">
        {/* Headline */}
        <h1 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-50 capitalize ">
          {t("create-new-password")}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-zinc-800 font-normal dark:text-zinc-50 [&::first-letter]:uppercase mb-6  ">
          {t("new-password-subtitle")}
        </p>

        {/* Reset component */}
        <ResetPassword />

        {/* Register link */}
        <span className="mt-5  text-zinc-800 text-sm [&::first-letter]:uppercase text-center  dark:text-zinc-50">
          {t("needHelp")}{" "}
          <Link
            href="/contact"
            className="text-maroon-700 font-bold dark:text-softPink-300"
          >
            {t("contactUS")}
          </Link>
        </span>
        <Toaster
          position={isRTL ? "bottom-left" : "bottom-right"}
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>
    </section>
  );
}
