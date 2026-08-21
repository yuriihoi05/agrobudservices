import Image from "next/image";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/ui/Reveal";

/**
 * Логотипи партнерів. У розмітці оригіналу вони були вкладені в сітку
 * `repeat(6, 1fr)`, де сьомим елементом стояв ще один flex-контейнер із
 * трьома лого — через це останні три логотипи стискалися в одну колонку.
 * Тут це один плоский список.
 */
const featuredPartners = [
  { name: "ONUR GROUP", file: "onur.svg", href: "http://onurgroup.com" },
  { name: "ACTU", file: "actu.svg", href: "http://actu.com.ua" },
  { name: "EFE", file: "efe.svg", href: "https://www.efe.ua" },
] as const;

const clients = [
  "ferozit",
  "integral",
  "ceresit",
  "kreisel",
  "msk",
  "eko-dim",
  "mhp",
  "alba",
  "tonny",
] as const;

const clientNames: Record<(typeof clients)[number], string> = {
  ferozit: "Ферозіт",
  integral: "Інтеграл",
  ceresit: "Ceresit",
  kreisel: "Kreisel",
  msk: "МСК",
  "eko-dim": "Еко-Дім",
  mhp: "МХП",
  alba: "Alba",
  tonny: "Tonny",
};

export function Partners() {
  const t = useTranslations("home.partners");

  return (
    <section id="partners" className="scroll-mt-24 py-15 md:py-20">
      <Reveal className="container-page flex flex-col items-center text-center">
        <h2 className="text-h2 text-ink">{t("title")}</h2>

        <ul className="mt-8 grid grid-cols-1 items-center justify-items-center gap-x-12 gap-y-8 sm:grid-cols-3">
          {featuredPartners.map((partner) => (
            <li key={partner.name} className="w-full max-w-40">
              <a
                href={partner.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={partner.name}
                className="focus-ring block rounded-md p-2 transition-opacity duration-300 hover:opacity-70"
              >
                <Image
                  src={`/images/partners/${partner.file}`}
                  alt={partner.name}
                  width={180}
                  height={180}
                  className="mx-auto h-auto w-full"
                />
              </a>
            </li>
          ))}
        </ul>

        <h2 className="text-h2 mt-16 text-ink">{t("workWithTitle")}</h2>

        <ul className="mt-8 grid w-full grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            // Без hover: ці логотипи не посилання, на відміну від трьох
            // партнерів вище — там <a>, і там hover доречний.
            <li key={client} className="w-full max-w-28">
              <Image
                src={`/images/partners/${client}.svg`}
                alt={clientNames[client]}
                width={115}
                height={115}
                className="mx-auto h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
