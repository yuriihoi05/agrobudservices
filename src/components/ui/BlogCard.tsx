import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import { readingTimeMinutes, type PublishedPost } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type BlogCardProps = {
  post: PublishedPost;
  /** Пріоритет завантаження зображення — для перших карток у видимій області. */
  priority?: boolean;
};

/**
 * Картка допису. Одна на секцію «Блог» з головної та на лістинг /blog —
 * щоб hover, типографіка й метадані не розʼїжджалися між ними.
 *
 * Клікабельна вся картка, тож hover тут доречний (див. CLAUDE.md).
 */
export function BlogCard({ post, priority = false }: BlogCardProps) {
  const t = useTranslations("blog");
  const format = useFormatter();
  const locale = useLocale() as Locale;

  return (
    <Link href={`/post/${post.slug}`} className="focus-ring group flex h-full flex-col rounded-md">
      {/* overflow-hidden на обгортці, а не на <Image> — інакше зум на hover
          обрізався б по прямокутнику самого зображення. */}
      <div className="overflow-hidden rounded-md">
        <Image
          src={post.image.src}
          alt=""
          width={post.image.width}
          height={post.image.height}
          sizes="(max-width: 768px) 100vw, 620px"
          priority={priority}
          className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-72 lg:h-88"
        />
      </div>

      <p className="text-eyebrow mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-gold">
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

      <h3 className="text-h4 mt-2.5 transition-colors duration-300 group-hover:text-gold">
        {post.title[locale]}
      </h3>

      <p className="mt-4 leading-relaxed text-gainsboro">{post.excerpt[locale]}</p>

      {/* mt-auto притискає посилання до низу, тож у сусідніх карток воно
          на одній лінії попри різну довжину анонсу. */}
      <span className="mt-auto inline-flex min-h-11 items-center pt-6 text-lg font-medium text-gold transition-colors duration-300 group-hover:text-white">
        {t("readMore")}
      </span>
    </Link>
  );
}
