/**
 * Єдине джерело правди для НЕперекладних даних сайту: маршрути, телефони,
 * пошта, координати, соцмережі. Значення перенесені з /legacy-export
 * (розмітка хедера/футера + JSON-LD в <head>).
 *
 * Усі видимі рядки живуть у /messages/{locale}.json і підтягуються через
 * ключі `messageKey` — так контакти не розʼїжджаються між секціями, а
 * переклад не дублює структуру навігації.
 */

import type messages from "../../messages/uk.json";

/** Ключі неймспейса `nav` — виводяться з uk.json, тож помилка в ключі впаде на `tsc`. */
export type NavMessageKey = keyof typeof messages.nav;

export type NavLink = {
  /** Ключ у неймспейсі `nav` файлів перекладу. */
  messageKey: NavMessageKey;
  /** Шлях БЕЗ префікса локалі — його підставляє `@/i18n/navigation`. */
  href: string;
  /** Вкладені пункти — дропдаун на десктопі, група на мобільному. */
  children?: NavLink[];
};

export const navLinks: NavLink[] = [
  {
    messageKey: "about",
    href: "/about-us",
    children: [
      { messageKey: "aboutUs", href: "/about-us" },
      // Окремої сторінки звітності немає: звіти живуть секцією на «Про нас».
      { messageKey: "reports", href: "/about-us#reports" },
    ],
  },
  { messageKey: "products", href: "/katalog-produkciyi" },
  { messageKey: "applications", href: "/galuzi-zastosuvannya" },
  { messageKey: "career", href: "/career" },
  { messageKey: "contacts", href: "/contact-us" },
  { messageKey: "actu", href: "/catalog/actu" },
  { messageKey: "blog", href: "/blog" },
  { messageKey: "pressKit", href: "/press-kit" },
];

export const phones = [
  { label: "+38 067 311 80 44", href: "tel:+380673118044" },
  { label: "+38 032 242 04 58", href: "tel:+380322420458" },
] as const;

export const email = {
  label: "sales@agrobudservice.com",
  href: "mailto:sales@agrobudservice.com",
} as const;

/** Координати з віджета карти в футері оригіналу. Текст адреси — у messages. */
export const location = {
  href: "https://maps.app.goo.gl/f5TruLpfdTV7aK369",
  lat: 49.5504348,
  lng: 23.9988796,
  zoom: 12,
} as const;

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61556674703456",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/agrobudservice/about/?viewAsMember=true",
  },
] as const;

/** Канонічний домен — потрібен для metadataBase та alternates/hreflang. */
export const siteUrl = "https://www.agrobudservice.com";
