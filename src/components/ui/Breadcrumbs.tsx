import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export type Crumb = {
  label: string;
  /** Останній елемент — без href: це поточна сторінка. */
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/**
 * Хлібні крихти. В оригіналі це був набір <div> із роздільниками « / »
 * усередині — без списку, без `aria-current` і без розмітки для пошуковиків.
 * Тут — <nav> зі списком; роздільник декоративний, тож прихований від AT.
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const t = useTranslations("breadcrumbs");

  return (
    <nav aria-label={t("label")} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="focus-ring rounded-sm py-1 text-ink transition-colors duration-200 hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="py-1 text-grey">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span aria-hidden="true" className="text-grey/60">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
