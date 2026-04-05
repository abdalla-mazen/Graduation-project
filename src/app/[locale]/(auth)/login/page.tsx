import { useTranslations } from "next-intl";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  // Translations
  const t = useTranslations();

  return (
    <div className="mt-10 p-4 max-w-[25.5rem]  datk:bg-zinc-700">

      <h1 className="text-5xl font-bold text-black dark:text-white  text-center  mb-10 ">{t("login-now")}</h1>
      <LoginForm />
    </div>
  );
}
