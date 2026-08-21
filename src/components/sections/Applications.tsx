import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const applications = [
  { key: "buildingMaterials", image: "building_materials.jpg", width: 900, height: 716 },
  { key: "construction", image: "construction.jpg", width: 1200, height: 1398 },
  { key: "agriculture", image: "agriculture.jpg", width: 1200, height: 955 },
  { key: "metallurgy", image: "metallurgy.jpg", width: 1200, height: 955 },
  { key: "glass", image: "glass.jpg", width: 1200, height: 955 },
  { key: "private", image: "sector.jpg", width: 1200, height: 955 },
] as const;

/**
 * «Галузі застосування» зі stacking scroll effect.
 *
 * Сам ефект живе в CSS (`.stack` у globals.css) — тут лише передається
 * порядковий номер картки через --stack-index, з якого рахується її
 * позиція зупинки. JS не бере участі взагалі.
 *
 * Проти оригіналу: там стос збирався з від'ємних margin, `transform:
 * translateY()` до 400px і `padding-bottom: 380px` на секції, підібраних
 * під одну висоту вікна. На планшеті трансформації лишалися активними —
 * остання картка з'їжджала на 340px і накривала наступну секцію.
 * Тут зміщення рахується від індексу, а не задається кожній картці руками.
 */
export function Applications() {
  const t = useTranslations("home.applications");

  return (
    <section className="py-15 md:py-20">
      <div className="container-page">
        <Reveal as="h2" className="text-h2 text-ink">
          {t("title")}
        </Reveal>

        <ol className="stack mt-10 flex flex-col gap-7.5 lg:gap-10">
          {applications.map(({ key, image, width, height }, index) => (
            <li
              key={key}
              className="stack__item"
              style={{ "--stack-index": index } as CSSProperties}
            >
              {/* Тінь спрямована вгору — картка, що наїжджає, кидає її на
                  попередню, і межа стосу читається навіть на темному тлі. */}
              <article className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-ink-line bg-ink-card p-6 text-white shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.85)] sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-10">
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <h3 className="text-h4">{t(`${key}.title`)}</h3>
                  <p className="mt-5 text-gainsboro">{t(`${key}.body`)}</p>
                  <ButtonLink href={`/galuzi-zastosuvannya#area-${index + 1}`} className="mt-8">
                    {t("cta")}
                  </ButtonLink>
                </div>

                <Image
                  src={`/images/home/${image}`}
                  alt={t(`${key}.imageAlt`)}
                  width={width}
                  height={height}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className={`h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
