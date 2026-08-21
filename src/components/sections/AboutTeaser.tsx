import Image from "next/image";
import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  const t = useTranslations("home.about");
  const paragraphs = t("body").split("\n\n");

  return (
    <section className="py-15 md:py-20">
      <Reveal className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <h2 className="text-h2 text-ink">{t("title")}</h2>

          <div className="mt-5 flex flex-col gap-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ButtonLink href="/about-us" className="mt-10">
            {t("cta")}
          </ButtonLink>
        </div>

        {/* sizes прив'язані до реальної ширини колонки, а не до 100vw як в оригіналі —
            інакше браузер вантажив найбільший варіант навіть у вузькій колонці. */}
        <Image
          src="/images/home/home_page_about_us.jpg"
          alt={t("imageAlt")}
          width={1200}
          height={784}
          sizes="(max-width: 1024px) 100vw, 700px"
          className="h-auto w-full rounded-md object-cover"
        />
      </Reveal>
    </section>
  );
}
