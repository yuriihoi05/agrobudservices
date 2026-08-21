import { useLocale, useTranslations } from "next-intl";

import { reports } from "@/content/reports";
import type { Locale } from "@/i18n/routing";

type ReportsAccordionProps = {
  /** Тон підкладки: акордеон стоїть і на темній секції, і на світлій. */
  tone?: "dark" | "light";
};

/**
 * Акордеон фінансової звітності по роках.
 *
 * Побудований на нативних <details>/<summary>: розкриття працює без JS,
 * підтримується з клавіатури «з коробки», рік читається скрінрідером як
 * кнопка з правильним станом. В оригіналі це був Webflow-акордеон на
 * інтеракціях, який без JS не відкривався взагалі.
 *
 * Перший рік (найсвіжіший) відкритий одразу — за ним приходять найчастіше.
 *
 * Дані — у content/reports.ts, спільні для всіх місць показу.
 */
export function ReportsAccordion({ tone = "dark" }: ReportsAccordionProps) {
  const t = useTranslations("reports");
  const isDark = tone === "dark";
  const locale = useLocale() as Locale;

  return (
    <div className="flex flex-col gap-3">
      {reports.map((report, index) => (
        <details
          key={report.year}
          open={index === 0}
          className={`group rounded-2xl border transition-colors duration-300 open:border-gold/40 ${
            isDark ? "border-ink-line bg-ink-card" : "border-gold/15 bg-surface"
          }`}
        >
          <summary className="focus-ring flex cursor-pointer list-none items-center gap-4 rounded-2xl p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gold"
            >
              <span className="absolute h-0.5 w-4 rounded-full bg-white" />
              <span className="absolute h-0.5 w-4 rounded-full bg-white transition-transform duration-300 group-open:rotate-0 rotate-90 motion-reduce:transition-none" />
            </span>

            <span className={`text-h4 ${isDark ? "" : "text-ink"}`}>
              {report.year}
            </span>

            <span
              className={`ml-auto text-sm ${isDark ? "text-grey-light" : "text-grey"}`}
            >
              {t("documentsCount", { count: report.documents.length })}
            </span>
          </summary>

          <ul className="flex flex-col gap-1 px-5 pb-5 sm:px-6 sm:pb-6">
            {report.documents.map((document) => (
              <li key={document.title.uk}>
                {document.href ? (
                  <a
                    href={document.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`focus-ring flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-medium transition-colors duration-200 hover:text-gold ${
                      isDark
                        ? "text-white hover:bg-white/5"
                        : "text-ink hover:bg-black/5"
                    }`}
                  >
                    <DocumentIcon />
                    {document.title[locale]}
                  </a>
                ) : (
                  <span
                    className={`flex min-h-11 items-center gap-3 px-3 py-2 ${isDark ? "text-grey-light" : "text-grey"}`}
                  >
                    <DocumentIcon />
                    {document.title[locale]}
                    <span className="text-sm">— {t("empty")}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="size-5 shrink-0 text-gold"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}
