import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlogCard } from "@/components/ui/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { publishedPosts } from "@/content/blog";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/blog", locale),
  };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const tb = await getTranslations("breadcrumbs");

  return (
    <section className="bg-ink-soft py-15 text-white md:py-20">
      <div className="container-page">
        <Breadcrumbs
          className="[&_a]:text-white [&_span]:text-grey-light"
          items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
        />
        <h1 className="text-h1 mt-8">{t("title")}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gainsboro">{t("intro")}</p>

        {publishedPosts.length > 0 ? (
          <Reveal
            as="ul"
            variant="stagger"
            className="mt-12 grid grid-cols-1 gap-x-7.5 gap-y-12 md:grid-cols-2"
          >
            {publishedPosts.map((post, index) => (
              <li key={post.slug}>
                {/* Перші дві картки над згином — вантажимо їх зображення одразу. */}
                <BlogCard post={post} priority={index < 2} />
              </li>
            ))}
          </Reveal>
        ) : (
          <p className="mt-12 rounded-2xl border border-ink-line bg-ink-card p-8 text-gainsboro">
            {t("empty")}
          </p>
        )}
      </div>
    </section>
  );
}
