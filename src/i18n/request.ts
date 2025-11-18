import { getRequestConfig } from "next-intl/server";
// import { cookies } from "next/headers";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  // Variables
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const numberingSystem = locale === "ar" ? "arab" : "latn";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,

    //reusable formats

    formats: {
      dateTime: {
        short: {
          day: "2-digit",
          month: "long",
          year: "numeric",
          numberingSystem,
        },
      },
      number: {
        precise: {
          style: "currency",
          currency: "CURRENCY",
          currencyDisplay: "name",
          maximumFractionDigits: 2,
          numberingSystem,
        },
        percentage: {
          style: "percent",
          maximumFractionDigits: 2,
          numberingSystem,
        },
      },
      list: {
        enumeration: {
          style: "long",
          type: "conjunction",
        },
      },
    },
  };
});
