import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { privacyPolicy } from "@/content/privacy-policy";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/privacy-policy", locale),
  };
}

/**
 * Правила користування вебсайтом.
 *
 * Юридичний документ: жодних анімацій, hover-ефектів чи scroll-reveal —
 * лише читабельна типографіка. Текст незмінний, додано тільки зміст із
 * якорями, щоб довгий документ можна було швидко сканувати.
 */
export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("privacy");
  const tb = await getTranslations("breadcrumbs");

  const notice = t("languageNotice");
  const sections = privacyPolicy.filter((section) => section.title !== null);

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="text-h2 mt-8 max-w-article">{t("title")}</h1>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-article">
            {notice && (
              <p
                lang="uk"
                className="mb-10 rounded-xl border border-gold/30 bg-surface p-4 text-sm text-ink"
              >
                {notice}
              </p>
            )}

            {/* Зміст із якорями — навігація по довгому документу,
                а не зміна його змісту. */}
            <nav aria-labelledby="policy-toc" className="rounded-2xl border border-gainsboro p-6">
              <h2 id="policy-toc" className="text-eyebrow text-grey">
                {t("tocTitle")}
              </h2>
              <ol className="mt-4 flex flex-col gap-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="focus-ring rounded-sm text-ink underline underline-offset-4 hover:text-gold"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div lang="uk" className="mt-12">
              {privacyPolicy.map((section) => (
                <section
                  key={section.id}
                  id={section.title ? section.id : undefined}
                  className="scroll-mt-8 first:mt-0 [&+section]:mt-12"
                >
                  {section.title && (
                    <h2 className="text-h3 text-ink">{section.title}</h2>
                  )}

                  {section.blocks.map((block, index) =>
                    block.type === "listItem" ? (
                      <ul key={index} className="mt-4 list-disc pl-5">
                        <li className="leading-[1.75]">{block.text}</li>
                      </ul>
                    ) : (
                      <p key={index} className="mt-4 leading-[1.75] whitespace-pre-line">
                        {block.text}
                      </p>
                    ),
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
