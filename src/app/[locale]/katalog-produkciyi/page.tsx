import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductFeature } from "@/components/ui/ProductFeature";
import { products } from "@/content/catalog";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/katalog-produkciyi">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const tc = await getTranslations({ locale, namespace: "catalog" });

  return {
    title: tc("metaTitle"),
    description: tc("metaDescription"),
    alternates: buildAlternates("/katalog-produkciyi", locale),
  };
}

export default async function CatalogPage({ params }: PageProps<"/[locale]/katalog-produkciyi">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const tc = await getTranslations("catalog");
  const tb = await getTranslations("breadcrumbs");

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: tc("title") }]}
          />
          <h1 className="text-h1 mt-8 text-balance">{tc("title")}</h1>
        </div>
      </section>

      {/* Вертикальний список: зображення + текст поруч, сторони чергуються.
          Порядок і фон повторюють оригінальний katalog-produkciyi.html:
          Пісок — текст зліва (світла), Вапняк — зображення зліва (темна), і далі. */}
      {products.map((product, index) => (
        <ProductFeature key={product.slug} product={product} index={index} />
      ))}

    </>
  );
}
