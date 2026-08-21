import { useLocale, useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/Button";
import { MediaTextSection } from "@/components/ui/MediaTextSection";
import type { Product } from "@/content/catalog";
import type { Locale } from "@/i18n/routing";
import { isWordmark, productIcons } from "./productIcons";

type ProductFeatureProps = {
  product: Product;
  /** Парні позиції — текст зліва, непарні — зображення зліва (як в оригіналі). */
  index: number;
};

/**
 * Блок товару в лістингу /catalog: зображення + текст поруч, сторони
 * чергуються згори вниз. Це НЕ картка — для міні-прев'ю на головній
 * використовується ProductCard.
 *
 * Розкладку і чергування дає спільний MediaTextSection; тут лише вміст
 * текстової колонки.
 */
export function ProductFeature({ product, index }: ProductFeatureProps) {
  const t = useTranslations("catalog");
  const locale = useLocale() as Locale;

  const Icon = productIcons[product.icon];
  const isDark = index % 2 === 1;

  return (
    <MediaTextSection
      image={product.image}
      imageAlt={product.name[locale]}
      imageSide={isDark ? "left" : "right"}
      tone={isDark ? "dark" : "light"}
    >
      <span
        aria-hidden="true"
        className="flex size-18 items-center justify-center rounded-2xl bg-gold/10"
      >
        <Icon className={isWordmark(product.icon) ? "w-11" : "size-11"} />
      </span>

      <h2 className={`text-h2 mt-6 ${isDark ? "" : "text-ink"}`}>{product.name[locale]}</h2>

      <div className="mt-5 flex flex-col gap-4">
        {product.intro.map((paragraph, paragraphIndex) => (
          <p
            key={paragraphIndex}
            className={`leading-relaxed ${isDark ? "text-gainsboro" : ""}`}
          >
            {paragraph[locale]}
          </p>
        ))}
      </div>

      <ButtonLink href={`/catalog/${product.slug}`} className="mt-9">
        {t("readMore")}
      </ButtonLink>
    </MediaTextSection>
  );
}
