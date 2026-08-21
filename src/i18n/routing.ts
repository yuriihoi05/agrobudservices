import { defineRouting } from "next-intl/routing";

/**
 * Маршрутизація локалей.
 *
 * `as-needed`: українська — БЕЗ префікса (`/about-us`), англійська — з
 * префіксом (`/en/about-us`).
 *
 * Це не косметика, а вимога SEO. На старому сайті мовних префіксів не було
 * взагалі: усі 19 URL із його sitemap.xml лежать за голими адресами, а
 * `/uk/...` віддає 404. Англійська там працювала через Weglot на клієнті —
 * окремих англійських URL в індексі не існує (перевірено: hreflang на
 * сторінках немає, лише canonical на українську адресу).
 *
 * Тож українські адреси лишаються точно такими, як були, і жоден
 * індексований URL не змінюється. Англійські — чистий приріст.
 */
export const routing = defineRouting({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** BCP 47 теги для атрибута `lang` і для hreflang. */
export const localeHtmlLang: Record<Locale, string> = {
  uk: "uk-UA",
  en: "en",
};

/** Підписи в перемикачі мов — навмисно НЕ перекладаються (ендонім мови). */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  uk: { short: "UA", name: "Українська" },
  en: { short: "EN", name: "English" },
};

/**
 * Порядок кнопок у перемикачі — EN | UA, як у макеті оригіналу
 * (`.en-btn` зліва, `.ua-btn` справа). Навмисно окремо від `routing.locales`,
 * де перша локаль — дефолтна.
 */
export const localeSwitcherOrder: Locale[] = ["en", "uk"];
