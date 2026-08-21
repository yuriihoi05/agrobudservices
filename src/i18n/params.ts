import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing, type Locale } from "./routing";

/**
 * Валідує сегмент `[locale]` і звужує його тип із `string` до `Locale`.
 * Невідомий префікс (напр. `/de/blog`) → 404, а не мовчазний фолбек.
 *
 * Використовувати в кожній сторінці/лейауті:
 *   const locale = await resolveLocale(params);
 */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
