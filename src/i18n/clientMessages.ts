import type { AbstractIntlMessages } from "next-intl";

/**
 * Неймспейси, потрібні КЛІЄНТСЬКИМ компонентам.
 *
 * За замовчуванням NextIntlClientProvider серіалізує в HTML геть усі
 * переклади — включно з текстами секцій, які рендеряться на сервері й
 * клієнту не потрібні взагалі (на головній це дублювало кілька десятків
 * кілобайт тексту). Тут перелічено тільки те, що справді читається в
 * компонентах з "use client".
 *
 * Якщо новий клієнтський компонент викличе useTranslations з іншим
 * неймспейсом, next-intl кине зрозумілу помилку MISSING_MESSAGE —
 * тоді неймспейс треба додати сюди.
 */
const CLIENT_NAMESPACES = [
  "header", // Header
  "nav", // Header
  "languageSwitcher", // LanguageSwitcher
  "cookies", // CookieBanner
  "contactForm", // ContactForm (секція на головній + поп-ап «Замовити»)
] as const;

function getPath(source: AbstractIntlMessages, path: string[]): unknown {
  return path.reduce<unknown>(
    (value, key) =>
      value && typeof value === "object"
        ? (value as Record<string, unknown>)[key]
        : undefined,
    source,
  );
}

function setPath(target: Record<string, unknown>, path: string[], value: unknown) {
  const last = path.at(-1)!;
  const parent = path.slice(0, -1).reduce<Record<string, unknown>>((node, key) => {
    node[key] ??= {};
    return node[key] as Record<string, unknown>;
  }, target);

  parent[last] = value;
}

/** Залишає з повного словника лише неймспейси зі списку вище. */
export function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  const picked: Record<string, unknown> = {};

  for (const namespace of CLIENT_NAMESPACES) {
    const path = namespace.split(".");
    const value = getPath(messages, path);
    if (value !== undefined) setPath(picked, path, value);
  }

  return picked as AbstractIntlMessages;
}
