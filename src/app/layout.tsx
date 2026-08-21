import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * Кореневий layout навмисно мінімальний і БЕЗ динамічних API.
 *
 * <html>/<body> живуть у [locale]/layout.tsx, бо там доступний параметр
 * локалі й сторінки лишаються статичними (SSG). Спроба перенести документ
 * сюди й брати локаль через getLocale() зробила динамічним увесь сайт —
 * усі 40 сторінок втратили пре-рендер.
 *
 * Через це кореневий not-found рендерить власний документ сам (див.
 * app/not-found.tsx) — інакше він лишився б без <html> і стилів.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
