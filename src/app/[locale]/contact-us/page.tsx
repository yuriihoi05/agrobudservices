import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactList } from "@/components/ui/ContactList";
import { Reveal } from "@/components/ui/Reveal";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact-us">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "contacts" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/contact-us", locale),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact-us">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("contacts");
  const tb = await getTranslations("breadcrumbs");
  const tf = await getTranslations("contactForm");

  return (
    <>
      <section className="bg-ink-soft py-15 text-white md:py-20">
        <div className="container-page">
          <Breadcrumbs
            className="[&_a]:text-white [&_span]:text-grey-light"
            items={[{ label: tb("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="text-h1 mt-8">{t("title")}</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-gainsboro">{t("intro")}</p>
        </div>
      </section>

      <section className="py-15 md:py-20">
        <Reveal className="container-page grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h3 text-ink">{t("detailsTitle")}</h2>

            <ContactList className="mt-8" />

            <Image
              src="/images/home/connect_us.jpg"
              alt={t("imageAlt")}
              width={1200}
              height={913}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="mt-10 h-64 w-full rounded-2xl object-cover sm:h-80"
            />
          </div>

          {/* Та сама форма, що на головній і в «Про нас»: одна валідація,
              один honeypot, один /api/contact. Успіх і помилка показуються
              інлайн, без перезавантаження сторінки. */}
          <div className="rounded-2xl border border-gold/15 bg-surface p-6 sm:p-8 lg:p-10">
            <h2 className="text-h3 text-ink">{tf("title")}</h2>
            <ContactForm subject={t("title")} className="mt-8" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
