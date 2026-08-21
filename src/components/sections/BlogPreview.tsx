import { useTranslations } from "next-intl";

import { BlogCard } from "@/components/ui/BlogCard";
import { ButtonLink } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/ui/Reveal";
import { publishedPosts } from "@/content/blog";

/** Скільки останніх постів показувати на головній (в оригіналі сітка була 2×1). */
const PREVIEW_COUNT = 2;

/**
 * Превʼю блогу — секція перед формою контактів.
 *
 * Проти оригіналу: десктопна сітка й мобільний слайдер були двома копіями
 * тієї самої CMS-колекції, а мобільна кнопка «Більше статей» вела на href="#".
 * Тут одна сітка, одна кнопка і спільна з лістингом картка (BlogCard).
 *
 * Якщо постів немає, секція не рендериться взагалі: порожній заголовок із
 * кнопкою виглядав би як зламана секція.
 */
export function BlogPreview() {
  const t = useTranslations("home.blog");

  const recentPosts = publishedPosts.slice(0, PREVIEW_COUNT);
  if (recentPosts.length === 0) return null;

  return (
    <section className="bg-ink-soft py-15 text-white md:py-20">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Overline>{t("overline")}</Overline>
            <h2 className="text-h2 mt-5">{t("title")}</h2>
          </div>
          <ButtonLink href="/blog" className="self-start sm:self-auto">
            {t("cta")}
          </ButtonLink>
        </Reveal>

        <Reveal
          as="ul"
          variant="stagger"
          className="mt-12 grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-2"
        >
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
