import { NextResponse } from "next/server";

/**
 * Приймання заявок із форми «Зв'язок з нами».
 *
 * Оригінальна форма Webflow мала `method="get"` — дані заявки йшли в рядок
 * адреси і нікуди не відправлялися. Тут — POST + відправка листа через
 * REST API Resend (без додаткової залежності).
 *
 * Потрібні змінні середовища (.env.local та Vercel → Environment Variables):
 *   RESEND_API_KEY     — ключ з resend.com
 *   CONTACT_EMAIL_FROM — верифікований у Resend відправник
 *   CONTACT_EMAIL_TO   — необовʼязково; за замовчуванням sales@agrobudservice.com
 */

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  comment?: unknown;
  /** Контекст заявки (напр. галузь застосування) — необовʼязковий. */
  subject?: unknown;
  /** Honeypot: приховане поле, яке заповнюють лише боти. */
  company?: unknown;
};

const isFilledString = (value: unknown, max: number): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= max;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Бот заповнив honeypot — вдаємо успіх, щоб не підказувати йому про перевірку.
  if (typeof payload.company === "string" && payload.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isFilledString(payload.name, 256) ||
    !isFilledString(payload.phone, 64) ||
    !isFilledString(payload.comment, 5000)
  ) {
    return NextResponse.json({ error: "validation_failed" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Адреса отримувача заявок, підтверджена замовником.
  const to = process.env.CONTACT_EMAIL_TO ?? "sales@agrobudservice.com";
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY, CONTACT_EMAIL_TO and CONTACT_EMAIL_FROM",
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { name, phone, comment } = payload;
  const subject =
    typeof payload.subject === "string" && payload.subject.trim().length > 0
      ? payload.subject.trim().slice(0, 200)
      : null;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: subject
        ? `Нова заявка з сайту (${subject}) — ${name}`
        : `Нова заявка з сайту — ${name}`,
      text: [
        `Ім'я: ${name}`,
        `Телефон: ${phone}`,
        ...(subject ? [`Розділ: ${subject}`] : []),
        "",
        comment,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the request", response.status, await response.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
