import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * robots.txt.
 *
 * Індексація дозволена всюди, крім службових шляхів:
 *   /401   — стан «доступ обмежено», пошукової цінності не має;
 *   /api/  — точки прийому форми, не сторінки;
 *   /*utm  — мітки кампаній, щоб не плодили дублі (успадковано зі
 *            старого robots.txt).
 *
 * `/uk/...` НЕ закриваємо навмисно. Ці адреси віддають 307 на канонічні
 * без префікса, і закривати їх було б шкідливо: заборона в robots не дає
 * краулеру побачити редирект, тож сигнал не консолідується. Хай іде за
 * 307 і читає canonical — так вага збирається на правильній адресі.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/401", "/en/401", "/api/", "/*utm"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
