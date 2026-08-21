import type { Metadata } from "next";
import localFont from "next/font/local";

import { NotFoundContent } from "@/components/ui/NotFoundContent";

import "./globals.css";

const roboto = localFont({
  src: [
    { path: "../../legacy-export/fonts/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "../../legacy-export/fonts/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../legacy-export/fonts/Roboto-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Agrobudservice",
  robots: { index: false, follow: true },
};

/**
 * «Не знайдено» для нерозпізнаних адрес.
 *
 * Рендерить власний документ, бо <html> живе в [locale]/layout.tsx, а той
 * для not-found не застосовується. Тримати документ у кореневому layout
 * не можна: локаль там доступна лише через динамічний getLocale(), і це
 * позбавляє пре-рендеру всі сторінки сайту.
 */
export default function NotFound() {
  return (
    <html lang="uk" className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <main className="flex flex-1 flex-col">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
