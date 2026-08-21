import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { email, location, phones, socialLinks } from "@/lib/site";
import { FacebookIcon, LinkedInIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Logo } from "./Logo";



const socialIcons = {
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
} as const;

export function Footer() {
  const t = useTranslations("footer");
  const tHeader = useTranslations("header");
  const tc = useTranslations("contacts");
  const locale = useLocale();
  const address = tc("address");

  // Мова інтерфейсу самої карти йде за локаллю сторінки.
  const mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=${location.zoom}&hl=${locale}&output=embed`;

  return (
    <footer className="bg-ink text-gainsboro">
      {/* Текстура повторюється плиткою 150px. background-attachment: fixed з оригіналу
          лишаємо лише там, де це не ламає рендер — на touch-пристроях (особливо iOS)
          fixed-фон смикається під час скролу. */}
      <div className="bg-[url('/images/footer-texture.png')] bg-[length:150px] bg-repeat bg-scroll md:bg-fixed">
        <div className="container-page grid grid-cols-1 items-start gap-7.5 py-15 md:py-20 lg:grid-cols-2">
          <div>
            <Link
              href="/"
              aria-label={tHeader("homeLink")}
              className="focus-ring -m-1 mb-5 inline-flex rounded-sm p-1 transition-opacity duration-200 hover:opacity-80"
            >
              <Logo className="h-auto w-[158px]" />
            </Link>

            <p className="mb-6 text-sm font-medium text-white sm:text-base">
              {t("legalName")}
              <br />
              {t("registrationNumber")}
            </p>

            <ul className="flex flex-col gap-5 not-italic">
              <ContactRow icon={<PhoneIcon className="w-5.75" />} label={tc("phonesLabel")}>
                <div className="flex flex-col">
                  {phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="focus-ring -mx-1 rounded-sm px-1 text-sm font-medium text-white transition-colors duration-200 hover:text-gold sm:text-base"
                    >
                      {phone.label}
                    </a>
                  ))}
                </div>
              </ContactRow>

              <ContactRow icon={<MailIcon className="w-5.5" />} label={tc("emailLabel")}>
                <a
                  href={email.href}
                  className="focus-ring -mx-1 rounded-sm px-1 text-sm font-medium break-all text-white transition-colors duration-200 hover:text-gold sm:text-base"
                >
                  {email.label}
                </a>
              </ContactRow>

              <ContactRow icon={<PinIcon className="w-4.25" />} label={tc("addressLabel")}>
                <a
                  href={location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring -mx-1 rounded-sm px-1 text-sm font-medium text-white transition-colors duration-200 hover:text-gold sm:text-base"
                >
                  {address}
                </a>
              </ContactRow>
            </ul>

            <ul className="mt-10 flex items-center gap-4 lg:mt-18">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];

                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="focus-ring flex size-11 items-center justify-center rounded-full text-gold transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-5.75 w-auto" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Оригінальний Webflow-віджет карти тягнув Google Maps JS API на кожній
              сторінці. Тут — lazy iframe: без ключа, без блокуючого скрипта,
              з явною висотою (віджет без неї схлопувався в 0 на мобільному). */}
          <iframe
            src={mapSrc}
            title={tc("mapTitle", { address })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-75 w-full rounded-md border-0 lg:h-[520px]"
          />
        </div>
      </div>

      <div className="bg-ink-soft text-sm leading-tight text-white">
        <div className="container-page flex flex-col-reverse items-start gap-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-7.5">
          <Link
            href="/privacy-policy"
            className="focus-ring -mx-1 rounded-sm px-1 py-1 transition-colors duration-200 hover:text-gold"
          >
            {t("privacyPolicy")}
          </Link>

          <p className="py-1">{t("rights")}</p>

          <p className="py-1">
            {t("madeBy")}{" "}
            <a
              href="https://ddd.do/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-sm transition-colors duration-200 hover:text-gold"
            >
              ddd<sup>©</sup>agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-1 flex w-5.75 shrink-0 justify-center text-gold" aria-hidden="true">
        {icon}
      </span>
      <span className="sr-only">{label}:</span>
      {children}
    </li>
  );
}
