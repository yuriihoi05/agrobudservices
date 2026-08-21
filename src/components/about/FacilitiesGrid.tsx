import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/about";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Виробничі об'єкти — три картки-посилання.
 *
 * Обрано картки, а не зигзаг із каталогу: вище на сторінці вже йде довгий
 * вступ у дві колонки, тож три зигзаги поспіль розтягнули б сторінку ще на
 * три екрани й зробили б ритм монотонним. Три рівнозначні об'єкти в ряд
 * читаються швидше.
 *
 * Фон світлий, щоб чергування темне/світле не збивалося: секція лежить між
 * темним hero і темною «Звітністю».
 */
export function FacilitiesGrid() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;

  return (
    <section className="py-15 md:py-20">
      <div className="container-page">
        <Overline className="text-ink">{t("facilitiesOverline")}</Overline>
        <h2 className="text-h2 mt-5 text-ink">{t("facilitiesTitle")}</h2>

        <Reveal
          as="ul"
          variant="stagger"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-7.5"
        >
          {about.facilities.map((facility) => (
            <li key={facility.href}>
              <Link
                href={facility.href}
                className="focus-ring group flex h-full flex-col rounded-2xl"
              >
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={facility.image.src}
                    alt=""
                    width={facility.image.width}
                    height={facility.image.height}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <h3 className="text-h4 mt-6 text-ink transition-colors duration-300 group-hover:text-gold">
                  {facility.title[locale]}
                </h3>
                <p className="mt-4 leading-relaxed">{facility.body[locale]}</p>

                <span className="mt-auto inline-flex min-h-11 items-center pt-6 text-lg font-medium text-gold transition-colors duration-300 group-hover:text-gold-dark">
                  {t("facilitiesLink")}
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
