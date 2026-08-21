import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Сторінки зі старого sitemap, яких у новому сайті немає ──────────
      // Усі три віддавали 200 і стоять у sitemap.xml Webflow, тож можуть
      // бути в індексі. Замість 404 ведемо на найближчий за змістом розділ.
      {
        // Звітність показує секція на «Про нас».
        source: "/en/zvitnist",
        destination: "/en/about-us#reports",
        permanent: true,
      },
      {
        source: "/zvitnist",
        destination: "/about-us#reports",
        permanent: true,
      },
      {
        // На старому сайті /terms-of-use був порожній; чинний документ —
        // «Правила користування вебсайтом».
        source: "/en/terms-of-use",
        destination: "/en/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-of-use",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        // Виробництво сухих сумішей ACTU: сторінка була незаповненим
        // шаблоном, реальний матеріал про це — у картці товару.
        source: "/en/virobnictvo-2",
        destination: "/en/catalog/actu",
        permanent: true,
      },
      {
        source: "/virobnictvo-2",
        destination: "/catalog/actu",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
