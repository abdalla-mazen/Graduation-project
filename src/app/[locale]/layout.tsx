import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Tajawal, Sarabun } from "next/font/google";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";



const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

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

    if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        <div
          lang={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={cn(
            geistSans.variable,
            geistMono.variable,
            sarabun.variable,
            tajawal.variable,
            locale === "ar" ? "font-tajawal" : "font-sarabun",
            "antialiased",
          )}
        >
          {children}
          <Toaster />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
