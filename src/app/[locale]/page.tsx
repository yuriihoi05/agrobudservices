import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Advantages } from "@/components/sections/Advantages";
import { Applications } from "@/components/sections/Applications";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Partners } from "@/components/sections/Partners";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { buildAlternates } from "@/i18n/metadata";
import { resolveLocale } from "@/i18n/params";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);

  // title/description успадковуються з layout (namespace `metadata`),
  // тут лишається hreflang: /uk та /en як альтернативи, x-default → /uk.
  return { alternates: buildAlternates("/", locale) };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Partners />
      <AboutTeaser />
      <Advantages />
      <ProductCatalog />
      <HowWeWork />
      <Applications />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
