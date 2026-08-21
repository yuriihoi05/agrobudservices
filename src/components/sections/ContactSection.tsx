import Image from "next/image";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

/** Секція «Зв'язок з нами»: зображення + спільна форма (див. ContactForm). */
export function ContactSection() {
  const t = useTranslations("contactForm");

  return (
    <section id="contact" className="scroll-mt-24 py-15 md:py-20">
      <Reveal className="container-page grid grid-cols-1 items-stretch gap-7.5 lg:grid-cols-2">
        <Image
          src="/images/home/connect_us.jpg"
          alt={t("imageAlt")}
          width={1200}
          height={913}
          sizes="(max-width: 1024px) 100vw, 600px"
          className="h-64 w-full rounded-md object-cover sm:h-96 lg:h-full"
        />

        <div>
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <ContactForm className="mt-8" />
        </div>
      </Reveal>
    </section>
  );
}
