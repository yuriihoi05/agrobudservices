import { useTranslations } from "next-intl";

import { MailIcon, PhoneIcon, PinIcon } from "@/components/layout/icons";
import { email, location, phones } from "@/lib/site";

type ContactListProps = {
  className?: string;
};

/**
 * Список контактів: телефони, пошта, адреса.
 *
 * Значення беруться з lib/site.ts — того самого джерела, що й хедер із
 * футером. В оригіналі кожна сторінка дублювала їх розміткою, через що
 * на «Контактах» і в Press Kit був лише один із двох номерів, а посилання
 * на пошту вело на неіснуючий URL «https://agrobudservice@gmail.com»
 * замість mailto:.
 */
export function ContactList({ className = "" }: ContactListProps) {
  const t = useTranslations("contacts");

  return (
    <ul className={`flex flex-col gap-6 ${className}`}>
      <ContactRow icon={<PhoneIcon className="w-5.75" />} label={t("phonesLabel")}>
        <div className="flex flex-col">
          {phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="focus-ring -mx-1 rounded-sm px-1 font-medium text-ink transition-colors duration-200 hover:text-gold"
            >
              {phone.label}
            </a>
          ))}
        </div>
      </ContactRow>

      <ContactRow icon={<MailIcon className="w-5.5" />} label={t("emailLabel")}>
        <a
          href={email.href}
          className="focus-ring -mx-1 rounded-sm px-1 font-medium break-all text-ink transition-colors duration-200 hover:text-gold"
        >
          {email.label}
        </a>
      </ContactRow>

      <ContactRow icon={<PinIcon className="w-4.25" />} label={t("addressLabel")}>
        <a
          href={location.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring -mx-1 rounded-sm px-1 font-medium text-ink transition-colors duration-200 hover:text-gold"
        >
          {t("address")}
        </a>
      </ContactRow>
    </ul>
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
      <div className="flex flex-col gap-1">
        <span className="text-eyebrow text-grey">{label}</span>
        {children}
      </div>
    </li>
  );
}
