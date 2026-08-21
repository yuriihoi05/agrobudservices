import { useTranslations } from "next-intl";

/** Посилання «пропустити навігацію» — видиме лише при фокусі з клавіатури. */
export function SkipLink() {
  const t = useTranslations("header");

  return (
    <a
      href="#main"
      className="focus-ring sr-only z-100 rounded-sm bg-white px-4 py-2 font-medium text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
    >
      {t("skipToContent")}
    </a>
  );
}
