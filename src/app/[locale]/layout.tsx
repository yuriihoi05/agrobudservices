import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { pickClientMessages } from "@/i18n/clientMessages";
import { resolveLocale } from "@/i18n/params";
import { localeHtmlLang, routing } from "@/i18n/routing";

const roboto = localFont({
  src: [
    { path: "../../../legacy-export/fonts/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "../../../legacy-export/fonts/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../legacy-export/fonts/Roboto-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

/** Обидві локалі пре-рендеряться статично. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    // Шаблону з назвою компанії навмисно немає: усі title перенесені з
    // <head> оригіналу і вже містять «Agrobudservice».
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      // Шаблону з назвою компанії навмисно немає: усі title перенесені з
    // <head> оригіналу і вже містять «Agrobudservice».
    title: t("title"),
      description: t("description"),
      locale: localeHtmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      // Шаблону з назвою компанії навмисно немає: усі title перенесені з
    // <head> оригіналу і вже містять «Agrobudservice».
    title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);

  // Дозволяє статичний рендер сторінок під цією локаллю.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider messages={pickClientMessages(messages)}>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
