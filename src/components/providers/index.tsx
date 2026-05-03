"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import {
  Locale,
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import ReactQueryProvider from "./_components/react-query.provider";
import { SessionProvider } from "next-auth/react";

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (module) => module.ReactQueryDevtools,
    ),
  { ssr: false },
);

export default function Providers({ children }: { children: React.ReactNode }) {
  // Translation
  const messages = useMessages();
  const locale = useLocale() as Locale;
  const timezone = useTimeZone();
  const now = useNow();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
      {/* Next Intl Provider */}
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        timeZone={timezone}
        now={now}
      >
        <ReactQueryProvider>
          {children}
          {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
        </ReactQueryProvider>
      </NextIntlClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
