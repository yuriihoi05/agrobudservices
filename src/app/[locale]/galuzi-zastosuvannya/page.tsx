import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { IndustryCard } from "@/components/ui/IndustryCard";
import { industries } from "@/content/industries";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/galuzi-zastosuvannya">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "industries" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/galuzi-zastosuvannya", locale),
  };
}

export default async function IndustriesPage({
  params,
}: PageProps<"/[locale]/galuzi-zastosuvannya">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("industries");
  const tb = await getTranslations("breadcrumbs");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="text-h1 mt-8 text-balance">{t("title")}</h1>
          <p className="mt-6 max-w-4xl leading-relaxed text-gainsboro">{t("intro")}</p>

          {/* Швидкий перехід до галузі: сторінка довга, а посилання з головної
              й так ведуть на конкретні якорі — тут той самий набір під рукою. */}
          <nav aria-label={t("navLabel")} className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <a
                    href={`#${industry.id}`}
                    className="focus-ring inline-flex min-h-11 items-center rounded-full border border-ink-line bg-ink-card px-5 text-sm font-medium transition-colors duration-300 hover:border-gold/60 hover:text-gold"
                  >
                    {industry.title[activeLocale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <div className="container-page">
          {/* `.stack` — та сама механіка stacking, що на головній. */}
          <ol className="stack flex flex-col gap-7.5 lg:gap-10">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
