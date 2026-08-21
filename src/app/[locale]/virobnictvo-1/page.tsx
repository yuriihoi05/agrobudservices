import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactDialog } from "@/components/ui/ContactDialog";
import { MediaTextSection } from "@/components/ui/MediaTextSection";
import { Reveal } from "@/components/ui/Reveal";
import { mineralPowderProduction as production } from "@/content/production";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/virobnictvo-1">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "production" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/virobnictvo-1", locale),
  };
}

export default async function ProductionPage({
  params,
}: PageProps<"/[locale]/virobnictvo-1">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("production");
  const tb = await getTranslations("breadcrumbs");
  const ta = await getTranslations("about");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <>
      {/* Фонове фото з оригіналу (.main-section.minpoeoshok-image) плюс градієнт —
          без нього білий текст на світлих ділянках знімка не читався б. */}
      <section className="relative isolate overflow-hidden bg-ink bg-[url('/images/production/hero.jpg')] bg-cover bg-center py-15 text-white md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.45)_68%,rgba(0,0,0,0.75))]"
        />
        <div className="container-page">
          {/* Три рівні, як в оригіналі: сторінка досяжна саме з «Про нас». */}
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[
              { label: tb("home"), href: "/" },
              { label: ta("title"), href: "/about-us" },
              { label: t("title") },
            ]}
          />
          <h1 className="text-h1 mt-8 text-balance">{t("title")}</h1>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <Reveal className="container-page">
          {/* Два абзаци в дві колонки: на всю ширину контейнера рядок був би
              задовгим для комфортного читання. */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-2">
            {production.intro.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph[activeLocale]}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="pb-15 md:pb-20">
        <div className="container-page">
          <h2 className="text-h2 text-ink">{production.automation.title[activeLocale]}</h2>

          <Reveal
            as="ul"
            variant="stagger"
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {production.automation.stats.map((stat) => (
              <li
                key={stat.title.uk}
                className="flex flex-col items-start rounded-2xl border border-gold/15 bg-surface p-6 lg:p-8"
              >
                <p className="text-stat">{stat.value[activeLocale]}</p>
                <h3 className="text-h4 mt-3 text-ink">{stat.title[activeLocale]}</h3>
                <p className="mt-4 leading-relaxed">{stat.body[activeLocale]}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-15 md:pb-20">
        <Reveal className="container-page">
          <AutoplayVideo
            src={production.video.src}
            description={production.video.description[activeLocale]}
            className="aspect-video w-full"
          />
        </Reveal>
      </section>

      {/* Той самий блок «зображення + текст», що в лістингу каталогу й на «Кар'єрі». */}
      <MediaTextSection
        image={production.lab.image}
        imageAlt={production.lab.title[activeLocale]}
        imageSide="left"
        tone="dark"
      >
        <h2 className="text-h2">{production.lab.title[activeLocale]}</h2>
        <p className="mt-5 leading-relaxed text-gainsboro">{production.lab.body[activeLocale]}</p>

        {/* В оригіналі кнопка мала href="#" і форму відкривав скрипт Webflow. */}
        <ContactDialog label={t("cta")} subject={t("title")} className="mt-9" />
      </MediaTextSection>
    </>
  );
}
