import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ContactList } from "@/components/ui/ContactList";
import { Reveal } from "@/components/ui/Reveal";
import { pressKit } from "@/content/press-kit";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/press-kit">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "pressKit" });

  // Власного description немає навмисно: у <head> оригіналу мета-опису не
  // було, а вигадувати його не можна. Сторінка успадкує загальносайтовий.
  return {
    title: t("metaTitle"),
    alternates: buildAlternates("/press-kit", locale),
  };
}

export default async function PressKitPage({ params }: PageProps<"/[locale]/press-kit">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("pressKit");
  const tb = await getTranslations("breadcrumbs");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <>
      {/* Фонове фото з оригіналу (.main-section.aiming-high-zvit) плюс градієнт —
          без нього білий текст на світлих ділянках знімка не читався б. */}
      <section className="relative isolate overflow-hidden bg-ink bg-[url('/images/press-kit/hero.jpg')] bg-cover bg-center py-15 text-white md:py-20">
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
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gainsboro">{t("lead")}</p>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <Reveal className="container-page grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl border border-gold/15 bg-surface p-6 sm:p-8 lg:p-10">
            <h2 className="text-h3 text-ink">{t("downloadsTitle")}</h2>

            <ul className="mt-6 flex flex-col gap-3">
              {pressKit.items.map((item) => (
                <li key={item.uk} className="flex items-start gap-3 text-lg text-ink">
                  <CheckIcon />
                  {item[activeLocale]}
                </li>
              ))}
            </ul>

            {/* Матеріали лежать у теці Google Drive — локальних файлів у
                джерелі немає (див. content/press-kit.ts). */}
            <ButtonLink href={pressKit.downloadUrl} className="mt-8">
              {t("downloadCta")}
            </ButtonLink>
          </div>

          <div className="lg:pt-2">
            <h2 className="text-h3 text-ink">{t("contactsTitle")}</h2>
            <ContactList className="mt-6" />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1.5 size-5 shrink-0 text-gold"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
