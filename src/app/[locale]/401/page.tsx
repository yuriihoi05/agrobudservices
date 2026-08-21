import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ButtonLink } from "@/components/ui/Button";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/401">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "protected" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/401", locale),
    // Сторінку стану помилки не варто індексувати.
    robots: { index: false, follow: true },
  };
}

/**
 * Сторінка «доступ обмежено» (401).
 *
 * В оригіналі це був стандартний екран Webflow із полем пароля: сторінки
 * захищав сам Webflow. У Next.js такого захисту немає, тож форму пароля
 * не переносив — неробоче поле вводу гірше за його відсутність.
 * Лишився зміст стану: сторінка недоступна, ось шлях назад.
 *
 * Без хлібних крихт: це стан помилки, а не місце в структурі сайту.
 */
export default async function ProtectedPage({ params }: PageProps<"/[locale]/401">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("protected");

  return (
    <section className="flex min-h-[60svh] items-center bg-ink-soft py-15 text-white md:py-20">
      <div className="container-page">
        <p className="text-stat">401</p>
        <h1 className="text-h2 mt-4">{t("title")}</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-gainsboro">{t("body")}</p>

        <ButtonLink href="/" className="mt-9">
          {t("cta")}
        </ButtonLink>
      </div>
    </section>
  );
}
