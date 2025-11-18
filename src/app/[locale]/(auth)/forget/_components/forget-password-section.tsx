import React from "react";
import ForgetPassword from "./forget-password-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ForgetPasswordSection() {
  // Translation
  const t = useTranslations();

  return (
    <section className="w-406 flex justify-center flex-col items-center py-10 mx-10  dark:bg-zinc-800">
      <div className=" flex flex-col">
        {/* Headline */}
        <h1 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-50 capitalize ">
          {t("foget-title")}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-zinc-800 font-normal dark:text-zinc-50 [&::first-letter]:uppercase mb-6  ">
          {t("forget-subtitle")}
        </p>

        {/* Forget component */}
        <ForgetPassword />

        {/* Register link */}
        <span className="mt-5  text-zinc-800 text-sm [&::first-letter]:uppercase text-center  dark:text-zinc-50">
          {t("forget-text-register")}{" "}
          <Link
            href="/register"
            className="text-maroon-700 font-bold dark:text-softPink-300"
          >
            {t("forget-text-register-link")}
          </Link>
        </span>
      </div>
    </section>
  );
}
