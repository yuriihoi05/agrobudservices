import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, products } from "@/content/catalog";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import { routing } from "@/i18n/routing";
import { isWordmark, productIcons } from "@/components/ui/productIcons";

/**
 * Дозволені лише слаги з generateStaticParams. Будь-який інший шлях
 * Next.js віддає як звичайну нерозпізнану адресу — а її обробляє
 * кореневий app/not-found.tsx. Через notFound() всередині роуту
 * сторінка виходила порожньою: вкладені not-found у Next 16 не
 * отримують ані документа, ані layout (перевірено).
 */
export const dynamicParams = false;

/** SSG: 4 товари × 2 локалі = 8 сторінок на build-time. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/catalog/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.meta.title[locale],
    description: product.meta.description[locale],
    alternates: buildAlternates(`/catalog/${slug}`, locale),
    openGraph: {
      title: product.meta.title[locale],
      description: product.meta.description[locale],
      images: [{ url: product.image.src }],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/[locale]/catalog/[slug]">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const tc = await getTranslations("catalog");
  const tb = await getTranslations("breadcrumbs");

  const Icon = productIcons[product.icon];
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[
              { label: tb("home"), href: "/" },
              { label: tc("title"), href: "/katalog-produkciyi" },
              { label: product.name[locale] },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span
                aria-hidden="true"
                className="flex size-18 items-center justify-center rounded-2xl bg-gold/10"
              >
                <Icon className={isWordmark(product.icon) ? "w-11" : "size-11"} />
              </span>

              <h1 className="text-h1 mt-6 text-balance">{product.name[locale]}</h1>

              <div className="mt-6 flex flex-col gap-4">
                {product.intro.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-gainsboro">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>

              <ButtonLink href="/contact-us" className="mt-9">
                {tc("orderCta")}
              </ButtonLink>
            </div>

            {/* priority: це LCP-зображення сторінки товару. */}
            <Image
              src={product.image.src}
              alt={product.name[locale]}
              width={product.image.width}
              height={product.image.height}
              sizes="(max-width: 1024px) 100vw, 620px"
              priority
              className="h-64 w-full rounded-2xl object-cover sm:h-96 lg:h-[30rem]"
            />
          </div>
        </div>
      </section>

      {/* ── Різновиди / фракції ──────────────────────────────── */}
      {product.variants && (
        <section className="py-15 md:py-20">
          <div className="container-page">
            <h2 className="text-h2 text-ink">{product.variants.title[locale]}</h2>

            <Reveal
              as="ul"
              variant="stagger"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            >
              {product.variants.items.map((item) => (
                <li
                  key={item.title[locale]}
                  className="flex flex-col rounded-2xl border border-gold/15 bg-surface p-6 lg:p-7"
                >
                  <h3 className="text-h4 text-ink">{item.title[locale]}</h3>
                  <p className="mt-3.5 leading-relaxed">{item.body[locale]}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Текстові блоки з ілюстрацією ─────────────────────── */}
      {product.blocks.map((block, index) => (
        <section
          key={block.title[locale]}
          className="py-15 md:py-20"
        >
          <Reveal className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Сторони чергуються, щоб довга сторінка не читалась одноманітно. */}
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <h2 className="text-h2 text-ink">{block.title[locale]}</h2>
              <div className="mt-5 flex flex-col gap-4">
                {block.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="leading-relaxed">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </div>

            {block.image && (
              <Image
                src={block.image.src}
                alt=""
                width={block.image.width}
                height={block.image.height}
                sizes="(max-width: 1024px) 100vw, 620px"
                className={`h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              />
            )}
          </Reveal>
        </section>
      ))}


      {/* ── Інші матеріали ───────────────────────────────────── */}
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-h2">{tc("otherProducts")}</h2>
            <ButtonLink href="/katalog-produkciyi" variant="outline">
              {tc("allProducts")}
            </ButtonLink>
          </div>

          <Reveal
            as="ul"
            variant="stagger"
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {others.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
