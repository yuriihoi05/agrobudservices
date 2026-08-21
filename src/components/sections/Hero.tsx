import { useTranslations } from "next-intl";

import { Overline } from "@/components/ui/Overline";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      // 100svh замість 100vh: в оригіналі на мобільних панель браузера
      // обрізала нижню частину екрана (100dvh було підставлено лише ≤479px).
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center py-32 text-white lg:min-h-[min(100svh,995px)]"
    >
      <HeroVideo poster="/images/home/hero-poster.jpg" description={t("videoDescription")} />

      {/* Градієнт із оригіналу — тримає контраст тексту незалежно від кадру відео. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.3)_34%,rgba(0,0,0,0.61))]"
      />

      <div className="container-page">
        <Overline className="text-white">{t("overline")}</Overline>
        <h1 className="text-h1 mt-4 max-w-5xl text-balance">{t("title")}</h1>
      </div>

      <a
        href="#partners"
        className="focus-ring absolute inset-x-0 bottom-6 mx-auto hidden w-24 flex-col items-center gap-2 rounded-md py-2 text-center text-sm font-semibold text-white transition-colors duration-200 hover:text-gold md:flex"
      >
        {t("scroll")}
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-full bg-gold transition-transform duration-300 motion-safe:animate-[bounce_2s_ease-in-out_infinite]"
        >
          <svg viewBox="0 0 187.11 250.32" className="h-3 w-auto rotate-90 fill-white">
            <path d="m0,250.32l187.11-125.58L0,0v250.32Z" />
          </svg>
        </span>
      </a>
    </section>
  );
}
