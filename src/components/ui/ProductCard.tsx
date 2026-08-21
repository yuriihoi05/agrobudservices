import { useLocale } from "next-intl";

import type { Product } from "@/content/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { isWordmark, productIcons } from "./productIcons";

type ProductCardProps = {
  product: Product;
};

/**
 * Картка товару. Один компонент на секцію каталогу з головної та на лістинг
 * /catalog — щоб hover, відступи й розмір значка не розʼїжджалися між ними.
 *
 * Клікабельна вся картка, тому hover тут доречний (див. CLAUDE.md).
 */
export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const Icon = productIcons[product.icon];

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="focus-ring group flex h-full flex-col items-start rounded-2xl border border-ink-line bg-ink-card p-6 text-white transition-[border-color,box-shadow,translate] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <span
        aria-hidden="true"
        className="flex size-18 shrink-0 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20"
      >
        <Icon className={isWordmark(product.icon) ? "w-11" : "size-11"} />
      </span>

      <h3 className="text-h4 mt-6 transition-colors duration-300 group-hover:text-gold">
        {product.name[locale]}
      </h3>

      <p className="mt-4 leading-relaxed text-gainsboro">{product.excerpt[locale]}</p>
    </Link>
  );
}
