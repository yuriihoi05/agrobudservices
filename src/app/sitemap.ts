import type { MetadataRoute } from "next";

import { posts } from "@/content/blog";
import { products } from "@/content/catalog";
import { getPathname } from "@/i18n/navigation";
import { localeHtmlLang, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

/**
 * Один запис карти сайту до розкладання по локалях.
 *
 * `path` — маршрут БЕЗ префікса локалі; конкретні адреси для кожної мови
 * будує getPathname із конфігу маршрутизації, тож карта не розʼїдеться,
 * якщо колись зміниться схема префіксів.
 */
type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** Дата контенту, якщо вона відома; інакше — час збірки. */
  lastModified?: Date;
};

const buildDate = new Date();

const entries: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },

  // Комерційне ядро — сторінки, заради яких на сайт приходять із пошуку.
  { path: "/katalog-produkciyi", priority: 0.9, changeFrequency: "monthly" },
  ...products.map(
    (product): Entry => ({
      path: `/catalog/${product.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    }),
  ),
  { path: "/galuzi-zastosuvannya", priority: 0.8, changeFrequency: "monthly" },

  // Про компанію та виробництво.
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/quarry", priority: 0.7, changeFrequency: "monthly" },
  { path: "/virobnictvo-1", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },

  // Блог оновлюється частіше за решту; у постів є справжня дата публікації.
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ...posts.map(
    (post): Entry => ({
      path: `/post/${post.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: new Date(post.date),
    }),
  ),

  { path: "/career", priority: 0.5, changeFrequency: "monthly" },
  { path: "/press-kit", priority: 0.4, changeFrequency: "yearly" },

  // Юридичний документ — найнижчий пріоритет, змінюється вкрай рідко.
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
];

/** Абсолютний URL сторінки в заданій локалі. */
function url(path: string, locale: (typeof routing.locales)[number]) {
  return new URL(getPathname({ href: path, locale }), siteUrl).toString();
}

/**
 * Карта сайту: кожна сторінка × кожна локаль.
 *
 * У кожному записі — блок alternates із посиланнями на всі мовні версії
 * цієї ж сторінки (Next.js віддає їх як xhtml:link). Google рекомендує,
 * щоб набір alternates був однаковий в усіх версіях і містив
 * самопосилання — тут так і є, бо обидві локалі перелічені завжди.
 *
 * Сторінки станів помилки (/401, 404) до карти не входять: вони закриті
 * від індексації через robots-метадані.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (path: string) => ({
    ...Object.fromEntries(
      routing.locales.map((locale) => [localeHtmlLang[locale], url(path, locale)]),
    ),
    "x-default": url(path, routing.defaultLocale),
  });

  return entries.flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: url(entry.path, locale),
      lastModified: entry.lastModified ?? buildDate,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languages(entry.path) },
    })),
  );
}
