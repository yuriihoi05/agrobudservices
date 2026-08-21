import Image from "next/image";
import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/ui/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getPost, publishedPosts, readingTimeMinutes } from "@/content/blog";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";
import { routing } from "@/i18n/routing";

/**
 * Дозволені лише слаги з generateStaticParams. Будь-який інший шлях
 * Next.js віддає як звичайну нерозпізнану адресу — а її обробляє
 * кореневий app/not-found.tsx. Через notFound() всередині роуту
 * сторінка виходила порожньою: вкладені not-found у Next 16 не
 * отримують ані документа, ані layout (перевірено).
 */
export const dynamicParams = false;

/** SSG: усі пости × обидві локалі на build-time. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    publishedPosts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/post/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: buildAlternates(`/post/${slug}`, locale),
    openGraph: {
      type: "article",
      title: post.title[locale],
      description: post.excerpt[locale],
      publishedTime: post.date,
      images: [{ url: post.image.src }],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/[locale]/post/[slug]">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tb = await getTranslations("breadcrumbs");
  const format = await getFormatter();

  const others = publishedPosts.filter((item) => item.slug !== post.slug);

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        {/*
          Стаття живе в ОДНІЙ колонці по центру.
          Раніше на сторінці було чотири різні ширини — крихти й зображення на
          всі 1240px, заголовок 896px, текст ~600px — і все притиснуте вліво.
          Через це права половина екрана лишалась порожньою, а краї блоків
          не збігалися. Тепер у всього однакова міра `max-w-article`.
        */}
        <div className="container-page">
          <div className="mx-auto max-w-article">
            <Breadcrumbs
              className="[&_a]:text-white [&_span]:text-grey-light"
              items={[
                { label: tb("home"), href: "/" },
                { label: t("title"), href: "/blog" },
                { label: post.title[locale] },
              ]}
            />

            <div className="mt-8">
              <p className="text-eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-gold">
                <time dateTime={post.date}>
                  {format.dateTime(new Date(post.date), {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{t("readingTime", { minutes: readingTimeMinutes(post, locale) })}</span>
              </p>

            {/* text-h2, а не text-h1: заголовки решти сторінок — одне-два слова
                («Контакти», «Каталог продукції»), а заголовок статті це ціле
                речення, і 72px робили б із нього стіну на пів екрана. */}
              <h1 className="text-h2 mt-4 text-balance">{post.title[locale]}</h1>
              <p className="mt-6 text-lg leading-relaxed text-gainsboro">
                {post.excerpt[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="py-15 md:py-20">
        <div className="container-page">
          {/* Зображення в тій самій колонці, що й текст: краї збігаються,
              стаття читається як єдиний блок. */}
          <div className="mx-auto max-w-article">
            <Image
              src={post.image.src}
              alt=""
              width={post.image.width}
              height={post.image.height}
              sizes="(max-width: 48rem) 100vw, 48rem"
              priority
              className="h-56 w-full rounded-2xl object-cover sm:h-80"
            />

            {/* Ширина колонки — трохи більше за 70 символів у рядку: діапазон,
                у якому око найлегше знаходить початок наступного рядка.
                leading і відступ між абзацами задані явно, бо це найдовший
                суцільний текст на сайті. */}
            <div className="mt-12">
              {post.content.map((block, index) =>
                block.type === "heading" ? (
                  <h2 key={index} className="text-h3 mt-12 text-ink first:mt-0">
                    {block.text[locale]}
                  </h2>
                ) : (
                  <p key={index} className="mt-6 leading-[1.75] first:mt-0">
                    {block.text[locale]}
                  </p>
                ),
              )}
            </div>

            <div className="mt-12">
              <ButtonLink href="/blog" variant="outline">
                {t("backToList")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-ink-soft py-15 text-white md:py-20">
          <div className="container-page">
            <h2 className="text-h2">{t("title")}</h2>

            <Reveal
              as="ul"
              variant="stagger"
              className="mt-10 grid grid-cols-1 gap-x-7.5 gap-y-12 md:grid-cols-2"
            >
              {others.map((item) => (
                <li key={item.slug}>
                  <BlogCard post={item} />
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
