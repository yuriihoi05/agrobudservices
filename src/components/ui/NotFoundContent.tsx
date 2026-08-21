import Link from "next/link";

/**
 * Вміст сторінки «не знайдено» — спільний для двох файлів:
 *   app/not-found.tsx          — повністю нерозпізнані адреси (/nope);
 *   app/[locale]/not-found.tsx — неіснуючі ресурси в роуті (/catalog/nope).
 * Два файли потрібні, бо <html> у нас в [locale]/layout.tsx: кореневий
 * not-found мусить рендерити документ сам, вкладений — ні.
 *
 * Текст захардкоджено обома мовами навмисно. Next.js рендерить not-found
 * поза звичайним проходом сторінки, і next-intl там не отримує локаль —
 * перевірено: з useTranslations сторінка виходила порожньою. Оскільки
 * локаль недоступна, показуємо обидві мови, як і має двомовний сайт.
 * Англійські рядки — дослівно з legacy-export/404.html.
 */
export function NotFoundContent() {
  return (
    <section className="flex min-h-[60svh] items-center bg-ink-soft py-15 text-white md:py-20">
      <div className="container-page">
        <p className="text-stat">404</p>

        <h1 className="text-h2 mt-4">Сторінку не знайдено</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-gainsboro">
          Сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>

        <p lang="en" className="text-h3 mt-10 text-grey-light">
          Page Not Found
        </p>
        <p lang="en" className="mt-3 max-w-xl leading-relaxed text-grey-light">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-13 items-center justify-center rounded-full bg-gold px-10 py-3.5 text-lg font-medium text-white transition-colors duration-300 hover:bg-gold-dark sm:text-xl"
          >
            На головну сторінку
          </Link>
          <Link
            lang="en"
            href="/en"
            className="focus-ring inline-flex min-h-13 items-center justify-center rounded-full border-2 border-gold px-10 py-3.5 text-lg font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-white sm:text-xl"
          >
            Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}
