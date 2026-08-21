"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { ContactForm } from "@/components/ui/ContactForm";

type ContactDialogProps = {
  /** Текст кнопки, що відкриває поп-ап. */
  label: string;
  /** Контекст заявки (напр. назва галузі) — їде в лист менеджеру. */
  subject?: string;
  className?: string;
};

/**
 * Кнопка, що відкриває поп-ап із формою: «Замовити» на «Галузях застосування»,
 * «Зв'язатись з нами» на «Кар'єрі». В оригіналі обидві мали href="#", а форму
 * показував Webflow-скрипт із того самого `pop-up-wrapper`.
 *
 * Побудовано на нативному <dialog> + showModal(): браузер сам дає пастку
 * фокусу, закриття по Escape, backdrop і блокування решти сторінки для
 * скрінрідерів (`aria-modal`). Писати це руками означало б відтворювати
 * половину поведінки, яку платформа вже має.
 *
 * Форма всередині — той самий ContactForm, що й у секції на головній:
 * одна валідація, один honeypot, один /api/contact.
 */
export function ContactDialog({ label, subject, className = "" }: ContactDialogProps) {
  const t = useTranslations("contactForm");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Скрол сторінки під відкритим модальним вікном блокуємо самі:
  // ::backdrop перехоплює кліки, але не скрол.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = "";
    };
  }, [isOpen]);

  function open() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`focus-ring inline-flex min-h-13 items-center justify-center rounded-full bg-gold px-10 py-3.5 text-center text-lg font-medium text-white transition-[background-color,box-shadow,translate] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-[0_10px_24px_-10px_var(--color-gold)] active:translate-y-0 active:duration-75 motion-reduce:hover:translate-y-0 sm:text-xl ${className}`}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        // Escape і клік по backdrop дають подію close — синхронізуємо стан.
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          // Клік поза карткою (тобто по ::backdrop) закриває вікно.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100vw-2.5rem)] max-w-lg rounded-2xl bg-white p-0 text-grey backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {/* Вміст монтуємо лише коли відкрито: інакше поля форми потрапляють
            у DOM закритої сторінки і збивають autofill та підрахунок полів. */}
        {isOpen && (
          <div className="max-h-[85vh] overflow-y-auto overscroll-contain p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-h3 text-ink">{t("dialogTitle")}</h2>

              <button
                type="button"
                onClick={close}
                aria-label={t("close")}
                className="focus-ring -mt-1 -mr-1 flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-gainsboro"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {subject && <p className="mt-2 text-sm text-grey">{subject}</p>}

            <ContactForm subject={subject} className="mt-6" />
          </div>
        )}
      </dialog>
    </>
  );
}
