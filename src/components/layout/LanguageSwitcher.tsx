"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, localeSwitcherOrder } from "@/i18n/routing";

type LanguageSwitcherProps = {
  className?: string;
};

/**
 * Перемикач мов. Кожна мова — звичайне <Link> на той самий маршрут в іншій
 * локалі, тож він працює без JS, індексується і дає коректний правий клік
 * «відкрити в новій вкладці». Зовнішніх скриптів і localStorage немає:
 * джерело правди щодо мови — сам URL.
 */
export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const activeLocale = useLocale();
  // Шлях без префікса локалі — той самий маршрут, інша мова.
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex h-11 shrink-0 items-stretch lg:h-12.5 ${className}`}
    >
      {localeSwitcherOrder.map((locale, index) => {
        const isActive = locale === activeLocale;
        const { short, name } = localeLabels[locale];

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            lang={locale}
            aria-label={name}
            aria-current={isActive ? "true" : undefined}
            className={`focus-ring flex items-center border-2 border-gold px-3.5 text-sm font-medium transition-colors duration-200 lg:px-5 ${
              index === 0 ? "rounded-l-full" : "-ml-0.5 rounded-r-full"
            } ${
              isActive
                ? "bg-gold text-white"
                : "bg-transparent text-gold hover:bg-gold/15"
            }`}
          >
            {short}
          </Link>
        );
      })}
    </div>
  );
}
