import React from "react";
import RegisterForm from "./_components/register-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  // Translations
  const t = useTranslations();

  return (
    <main className="text-center">
      {/* Register title */}
      <h1 className="text-5xl font-bold text-black dark:text-white text-center mb-10 ">
        {t("register")}
      </h1>

      {/* Register form (client component) */}
      <RegisterForm />

      {/* Register meassage , login link */}
      <Link href={"/login"} className="text-white mt-2 block">
        {t("register-mess")}
        <span className="text-blue-600 font-bold ">{t("login")}</span>{" "}
      </Link>
    </main>
  );
}
