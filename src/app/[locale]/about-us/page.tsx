import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { FacilitiesGrid } from "@/components/about/FacilitiesGrid";
import { ReportsAccordion } from "@/components/ui/ReportsAccordion";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { about } from "@/content/about";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about-us">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/about-us", locale),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about-us">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tb = await getTranslations("breadcrumbs");
  const tr = await getTranslations("reports");
  const activeLocale = (await getLocale()) as Locale;

  // П'ять довгих абзаців поспіль читаються як стіна тексту. Розбиваємо на
  // дві колонки з однієї точки: ліва — історія й група, права — партнерство
  // та результати. Так рядок лишається читабельної довжини, а не на всю
  // ширину контейнера (в оригіналі колонки теж було дві).
  const half = Math.ceil(about.intro.length / 2);
  const introColumns = [about.intro.slice(0, half), about.intro.slice(half)];

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="text-h1 mt-8">{t("title")}</h1>

          <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-2">
            {introColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-5">
                {column.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="leading-relaxed text-gainsboro">
                    {paragraph[activeLocale]}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* В оригіналі ця кнопка вела на href="#". Тепер — до форми в кінці сторінки. */}
          <ButtonLink href="#contact" className="mt-10">
            {t("cta")}
          </ButtonLink>
        </div>
      </section>

      <FacilitiesGrid />
      <section id="reports" className="scroll-mt-24 bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <h2 className="text-h2">{tr("sectionTitle")}</h2>
          <div className="mt-10">
            <ReportsAccordion tone="dark" />
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
