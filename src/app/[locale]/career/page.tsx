import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactDialog } from "@/components/ui/ContactDialog";
import { Reveal } from "@/components/ui/Reveal";
import { vacancies } from "@/content/vacancies";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/career">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "career" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/career", locale),
  };
}

export default async function CareerPage({ params }: PageProps<"/[locale]/career">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("career");
  const tb = await getTranslations("breadcrumbs");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <>
      {/* Фонове фото з оригіналу (.main-section.dron-image) плюс градієнт —
          без нього білий текст на світлих ділянках знімка не читався б. */}
      <section className="relative isolate overflow-hidden bg-ink bg-[url('/images/career/hero.jpg')] bg-cover bg-center py-15 text-white md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.45)_68%,rgba(0,0,0,0.75))]"
        />
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="text-h1 mt-8">{t("title")}</h1>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <Reveal className="container-page">
          <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-2">
            {/* Три абзаци в дві колонки: на всю ширину контейнера рядок був би
                задовгим для комфортного читання. */}
            {t("intro")
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>
        </Reveal>
      </section>

      <section className="pb-15 md:pb-20">
        <Reveal className="container-page">
          <h2 className="text-h2 text-ink">{t("openingsTitle")}</h2>

          {vacancies.length > 0 ? (
            <ul className="mt-10 flex flex-col gap-5">
              {vacancies.map((vacancy) => (
                <li
                  key={vacancy.slug}
                  className="rounded-2xl border border-gold/15 bg-surface p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-h4 text-ink">{vacancy.title[activeLocale]}</h3>
                      <p className="text-eyebrow mt-2 text-grey">
                        {vacancy.location[activeLocale]} · {vacancy.employment[activeLocale]}
                      </p>
                    </div>

                    <ContactDialog
                      label={t("applyCta")}
                      subject={vacancy.title[activeLocale]}
                      className="shrink-0"
                    />
                  </div>

                  <ul className="mt-5 flex list-disc flex-col gap-2 pl-5">
                    {vacancy.responsibilities.map((item, index) => (
                      <li key={index} className="leading-relaxed">
                        {item[activeLocale]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            /* Порожній стан — саме те, що показує оригінал: вакансій немає.
               Це не заглушка через брак даних, а справжній стан сторінки. */
            <div className="mt-10 rounded-2xl border border-gold/15 bg-surface p-6 sm:p-10">
              <p className="text-h4 text-ink">{t("emptyTitle")}</p>

              <div className="mt-5 flex max-w-3xl flex-col gap-4">
                {t("emptyBody")
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* В оригіналі кнопка мала href="#" і форму відкривав скрипт
                  Webflow. Тут — той самий поп-ап, що на «Галузях застосування». */}
              <ContactDialog label={t("cta")} subject={t("title")} className="mt-8" />
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}
