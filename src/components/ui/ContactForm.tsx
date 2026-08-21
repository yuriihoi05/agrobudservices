"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

import { SubmitButton } from "@/components/ui/Button";
import { SuccessIcon } from "@/components/sections/icons";
import { Link } from "@/i18n/navigation";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "phone" | "comment";

type ContactFormProps = {
  /**
   * Контекст заявки (напр. назва галузі) — додається в лист, щоб менеджер
   * одразу бачив, звідки прийшов запит. Користувачу не показується.
   */
  subject?: string;
  /** Викликається після успішної відправки — поп-ап так дізнається, коли закритись. */
  onSuccess?: () => void;
  className?: string;
};

/**
 * Форма «Зв'язок з нами». Одна на весь сайт: секція на головній і в «Про нас»,
 * поп-ап «Замовити» на «Галузях застосування». Валідація, honeypot і
 * відправка на /api/contact живуть тут, а не дублюються по місцях виклику.
 *
 * Що виправлено проти оригіналу:
 * — `method="get"`: заявка йшла в URL і нікуди не надсилалась → POST на /api/contact;
 * — поля «Ім'я» і «Телефон» лежали кожне у власній сітці `1fr 1fr`, тож
 *   половина кожного рядка була порожньою → тепер це один рядок із двох колонок;
 * — фокус підсвічувався бузковим (#d6bbfb) — залишок шаблону Webflow → золотий;
 * — не було жодного повідомлення про помилку конкретного поля.
 */
export function ContactForm({ subject, onSuccess, className = "" }: ContactFormProps) {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formId = useId();

  const fieldId = (name: FieldName) => `${formId}-${name}`;
  const errorId = (name: FieldName) => `${formId}-${name}-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      comment: String(data.get("comment") ?? "").trim(),
      company: String(data.get("company") ?? ""),
      subject,
    };

    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.name) nextErrors.name = t("nameError");
    // Достатньо м'яка перевірка: цифри, пробіли, дужки, «+» і дефіси.
    if (!/^[+\d][\d\s()-]{5,}$/.test(values.phone)) nextErrors.phone = t("phoneError");
    if (!values.comment) nextErrors.comment = t("commentError");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      form.reset();
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={`flex flex-col items-start rounded-md border border-gainsboro bg-white p-6 ${className}`}
      >
        <SuccessIcon className="size-20" />
        <p className="mt-6 text-xl font-medium text-ink">{t("successTitle")}</p>
        <p className="mt-3">{t("successText")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-6 min-h-11 rounded-sm font-medium text-gold underline underline-offset-4 transition-colors duration-200 hover:text-gold-dark"
        >
          {t("successReset")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-4.5 ${className}`}>
      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <Field
          name="name"
          type="text"
          label={t("nameLabel")}
          autoComplete="name"
          id={fieldId("name")}
          errorId={errorId("name")}
          error={errors.name}
        />
        <Field
          name="phone"
          type="tel"
          label={t("phoneLabel")}
          autoComplete="tel"
          id={fieldId("phone")}
          errorId={errorId("phone")}
          error={errors.phone}
        />
      </div>

      <Field
        name="comment"
        label={t("commentLabel")}
        multiline
        id={fieldId("comment")}
        errorId={errorId("comment")}
        error={errors.comment}
      />

      {/* Honeypot — прихований від людей, але не через display:none,
          інакше частина ботів його теж ігнорує. */}
      <div aria-hidden="true" className="absolute -left-full h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-ink">
        {t.rich("policy", {
          link: (chunks) => (
            <Link
              href="/privacy-policy"
              className="focus-ring rounded-sm underline underline-offset-2 transition-colors duration-200 hover:text-gold"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <SubmitButton disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </SubmitButton>

      {status === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3.5 text-red-800">
          {t("errorText")}
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  id: string;
  name: FieldName;
  label: string;
  errorId: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
};

function Field({
  id,
  name,
  label,
  errorId,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}: FieldProps) {
  const shared = {
    id,
    name,
    autoComplete,
    required: true,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `focus-ring w-full rounded-md border bg-white px-3.5 py-2.5 text-ink transition-colors duration-200 ${
      error ? "border-red-600" : "border-ink/40 hover:border-ink"
    }`,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-eyebrow text-ink">
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={4} maxLength={5000} className={`${shared.className} min-h-28`} />
      ) : (
        <input {...shared} type={type} maxLength={256} className={`${shared.className} min-h-11`} />
      )}

      {error && (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
