import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Locale,
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import ReactQueryProvider from "./_components/react-query.provider";

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
      {/* Next Intl Provider */}
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        timeZone={timezone}
        now={now}
      >
        <ReactQueryProvider>
          {/* react query dev tools */}
          <ReactQueryDevtools />
          {children}
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
