import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CapacityIcon, FleetIcon, PartnershipIcon } from "./icons";

/**
 * `valueKey` — окремий ключ із цифрою, винесеною із заголовка в messages
 * («1+ млн», «100+»). Так число можна подати великим золотим кеглем, а не
 * ховати всередині рядка тексту. У картки про парк техніки цифри немає,
 * тому null — вигадувати ще одну «статистику» заради симетрії не варто.
 */
const advantages = [
  { key: "capacity", Icon: CapacityIcon, valueKey: "capacity.value" },
  { key: "fleet", Icon: FleetIcon, valueKey: null },
  { key: "partnership", Icon: PartnershipIcon, valueKey: "partnership.value" },
] as const;

/**
 * Це блок для читання: картки нічого не відкривають і нікуди не ведуть,
 * тож hover-станів тут навмисно немає. Наведення на неклікабельний елемент
 * обіцяє дію, якої не існує. Єдиний інтерактивний елемент секції — кнопка
 * під картками, вона свій стан має.
 */
export function Advantages() {
  const t = useTranslations("home.features");
  const tHome = useTranslations("home");

  return (
    // Без верхнього відступу навмисно: у макеті це продовження блоку «Про нас»
    // (в оригіналі — одна <section>), тож між ними лишається один інтервал
    // ритму, а не подвійний, як між самостійними секціями.
    <section className="pb-15 md:pb-20">
      <div className="container-page">
        <Reveal
          as="ul"
          variant="stagger"
          // Три колонки лише від lg: на 768px картка давала б ~170px під текст
          // (близько 20 символів у рядку) — абзаци тут задовгі для такої ширини.
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {advantages.map(({ key, Icon, valueKey }) => (
            <li
              key={key}
              className="flex flex-col items-start rounded-2xl border border-gold/15 bg-surface p-6 lg:p-8"
            >
              {/* Іконка в теплому кружку, а не «у повітрі» — так вона читається
                  як елемент картки й тримає однакову висоту в усіх трьох. */}
              <span
                aria-hidden="true"
                className="flex size-18 shrink-0 items-center justify-center rounded-full bg-gold/10"
              >
                <Icon className="size-11" />
              </span>

              {valueKey && <p className="text-stat mt-6">{t(valueKey)}</p>}

              <h3 className={`text-h4 text-ink ${valueKey ? "mt-2" : "mt-6"}`}>
                {t(`${key}.title`)}
              </h3>

              {/* leading-relaxed замість базових 1.6: абзаци довгі, і зайві
                  2px між рядками помітно розріджують «стіну тексту». */}
              <p className="mt-4 leading-relaxed">{t(`${key}.body`)}</p>
            </li>
          ))}
        </Reveal>

        {/* В оригіналі ця кнопка вела на href="#" — тобто нікуди.
            Тепер вона скролить до форми внизу сторінки. */}
        <div className="mt-12 flex justify-center md:justify-start">
          <ButtonLink href="#contact">{tHome("featuresCta")}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
