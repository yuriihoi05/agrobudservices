import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { ContactDialog } from "@/components/ui/ContactDialog";
import { materials, type Industry } from "@/content/industries";
import type { Locale } from "@/i18n/routing";

type IndustryCardProps = {
  industry: Industry;
  index: number;
};

/**
 * Картка галузі застосування.
 *
 * Stacking той самий, що в секції «Галузі застосування» на головній —
 * спільна утиліта `.stack` (нативний `position: sticky` з наростаючим `top`),
 * тож взаємодія на обох сторінках сприймається як одна. Оригінал і тут
 * збирав стос вручну з `transform: translateY()` до 240px та `bottom: 30vh`.
 *
 * Картка навмисно компактніша за оригінальну: текст і матеріали в лівій
 * колонці, зображення — у правій. Оригінальна розкладка (текст + зображення
 * на всю висоту + рядок матеріалів під ними) давала картку вищу за екран,
 * і застрягши в стосі вона ховала власний низ.
 */
export function IndustryCard({ industry, index }: IndustryCardProps) {
  const t = useTranslations("industries");
  const locale = useLocale() as Locale;

  return (
    <li
      id={industry.id}
      className="stack__item scroll-mt-24"
      style={{ "--stack-index": index } as CSSProperties}
    >
      <article className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-ink-line bg-ink-card p-6 text-white shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.85)] sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <div className="flex flex-col">
          <h2 className="text-h3">{industry.title[locale]}</h2>

          <div className="mt-5 flex flex-col gap-4">
            {industry.body.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="leading-relaxed text-gainsboro">
                {paragraph[locale]}
              </p>
            ))}
          </div>

          {/* Заявка відкривається поп-апом просто тут: сторінка довга, і
              відправляти користувача на форму в іншому місці означало б
              загубити контекст галузі, яку він щойно читав. Назва галузі
              їде в лист, щоб менеджер бачив, про що йдеться. */}
          <ContactDialog
            label={t("cta")}
            subject={industry.title[locale]}
            className="mt-8 self-start"
          />
        </div>

        <div className="flex flex-col gap-6 lg:order-first">
          <Image
            src={industry.image.src}
            alt={industry.title[locale]}
            width={industry.image.width}
            height={industry.image.height}
            sizes="(max-width: 1024px) 100vw, 560px"
            className="h-56 w-full rounded-2xl object-cover sm:h-72"
          />

          <div>
            <h3 className="text-eyebrow text-gold">{t("materialsTitle")}</h3>

            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industry.materials.map((key) => (
                <li
                  key={key}
                  className="flex flex-col items-center gap-2 rounded-xl border border-ink-line/70 bg-black/20 p-3 text-center"
                >
                  {/* Іконки — статичні .svg, а не інлайн. У оригіналі кожна
                      була вставлена в розмітку стільки разів, скільки галузей
                      її згадують; інлайн у React дублював би їх ще й у
                      RSC-payload. Файлом вона вантажиться один раз і кешується. */}
                  <Image
                    src={`/images/materials/${key}.svg`}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0"
                  />
                  <span className="text-sm leading-snug text-gainsboro">
                    {materials[key][locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </li>
  );
}
