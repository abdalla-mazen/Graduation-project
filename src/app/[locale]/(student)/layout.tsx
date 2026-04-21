import Navbar from "@/components/layout/header/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { redirect } from "@/i18n/navigation";
import Footer from "@/components/layout/footer/footer";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import * as React from "react";
import Notifications from "@/components/layout/notifications/notifications-client";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Pick<Props, "params">) {
  const t = await getTranslations({ locale });

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (locale !== "en") {
    redirect({
      href: "/",
      locale: "en",
    });
  }
 
  
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}
