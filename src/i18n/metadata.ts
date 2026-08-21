import type { Metadata } from "next";

import { getPathname } from "./navigation";
import { localeHtmlLang, routing, type Locale } from "./routing";
import { siteUrl } from "@/lib/site";

/**
 * hreflang-альтернативи для однієї сторінки.
 *
 * Кожна мовна версія має власний URL, тож пошуковим системам треба явно
 * сказати, що це одна й та сама сторінка різними мовами. `x-default`
 * вказує на дефолтну локаль — саме її показувати, коли мова користувача
 * не збігається з жодною доступною.
 *
 * Використання на сторінці:
 *   export async function generateMetadata({ params }: PageProps<"/[locale]">) {
 *     const { locale } = await params;
 *     return { alternates: buildAlternates("/about-us", locale) };
 *   }
 */
export function buildAlternates(
  href: string,
  locale: Locale,
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((candidate) => [
      localeHtmlLang[candidate],
      getPathname({ href, locale: candidate }),
    ]),
  );

  return {
    canonical: getPathname({ href, locale }),
    languages: {
      ...languages,
      "x-default": getPathname({ href, locale: routing.defaultLocale }),
    },
  };
}

/** Абсолютний URL сторінки в заданій локалі — для OG-тегів і sitemap. */
export function buildUrl(href: string, locale: Locale): string {
  return new URL(getPathname({ href, locale }), siteUrl).toString();
}
