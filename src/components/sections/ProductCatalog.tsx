import { useTranslations } from "next-intl";

import { Overline } from "@/components/ui/Overline";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/content/catalog";

/**
 * Секція каталогу на головній. Назви й описи товарів більше не дублюються
 * в messages — і ця секція, і лістинг /catalog читають один масив
 * із /src/content/catalog.ts через спільний ProductCard.
 */
export function ProductCatalog() {
  const t = useTranslations("home.catalog");

  return (
    <section className="bg-ink-soft py-15 text-white md:py-20">
      <Reveal className="container-page">
        <Overline>{t("overline")}</Overline>
        <h2 className="text-h2 mt-5">{t("title")}</h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
