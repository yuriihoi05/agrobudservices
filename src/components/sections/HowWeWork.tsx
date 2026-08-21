import { useTranslations } from "next-intl";

import { Reveal } from "@/components/ui/Reveal";

const steps = ["consultation", "order", "analysis", "payment", "delivery"] as const;

/**
 * «Як ми працюємо» — п'ять послідовних кроків співпраці.
 *
 * Патерн: простий пронумерований список, увесь текст видимий одразу.
 *
 * Чому не таби й не акордеон: кроки описують ОДИН процес, який читають
 * послідовно від 1 до 5, а не альтернативи, між якими обирають. Будь-яке
 * перемикання тут змушує клікнути п'ять разів, щоб дізнатися, як працює
 * компанія, ховає обсяг тексту (чотири кроки — по абзацу, п'ятий — три)
 * і забирає його з пошукової видачі. Тому — вертикальний таймлайн:
 * нічого не перемикається, нічого не приховано, Ctrl+F знаходить усе.
 *
 * Раніше тут був IntersectionObserver, який підсвічував активний номер за
 * скролом; він не давав користувачу нічого, крім плутанини (номери
 * виглядали клікабельними, хоч нічого й не перемикали). JS прибрано
 * повністю — секція знову рендериться на сервері.
 */
export function HowWeWork() {
  const t = useTranslations("home.howWeWork");

  return (
    <section className="border-t border-ink-line bg-ink-soft py-15 text-white md:py-20">
      <div className="container-page grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
        {/* Заголовок лишається перед очима, поки читають кроки — чистий CSS. */}
        <h2 className="text-h2 lg:sticky lg:top-28">{t("title")}</h2>

        <Reveal as="ol" className="flex flex-col">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <li key={step} className="relative pl-14 sm:pl-16">
                {/* Лінія-конектор між кроками. Декоративна, тож прихована від AT. */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-0 left-5.5 w-px bg-ink-line sm:left-6"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 flex size-11 items-center justify-center rounded-full bg-gold text-xl font-medium sm:size-12"
                >
                  {index + 1}
                </span>

                <div className={isLast ? "" : "pb-10 lg:pb-12"}>
                  <h3 className="text-h4 flex min-h-11 items-center sm:min-h-12">
                    {t(`${step}.title`)}
                  </h3>

                  <div className="mt-4 flex flex-col gap-4 text-gainsboro">
                    {t(`${step}.body`)
                      .split("\n\n")
                      .map((paragraph, paragraphIndex) => (
                        // Абзаци — статичний розбір одного рядка, порядок
                        // ніколи не змінюється, тож індекс тут коректний ключ
                        // (і не тягне текст абзацу в RSC-payload).
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
