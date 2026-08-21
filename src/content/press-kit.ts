import type { Locale } from "@/i18n/routing";

/**
 * Press Kit — контент з /legacy-export/press-kit.html.
 *
 * ⚠️ ЛОКАЛЬНИХ ФАЙЛІВ ДЛЯ ЗАВАНТАЖЕННЯ В ЕКСПОРТІ НЕМАЄ. У розмітці немає
 * ані <img>, ані download-атрибутів, ані посилань на .zip/.pdf; у
 * /legacy-export/documents лежить лише звіт про управління за 2024 рік,
 * у /legacy-export/images — жодного логотипа, брендбука чи архіву.
 * Уся підбірка віддається одним посиланням на теку Google Drive.
 *
 * Список нижче — це підписи пунктів із розмітки, а не окремі файли:
 * в оригіналі вони теж не були посиланнями.
 */

type Localized = Record<Locale, string>;

export const pressKit = {
  /**
   * Тека Google Drive з матеріалами.
   *
   * В оригіналі адреса містила сегмент `/u/1/` — це індекс акаунта Google:
   * посилання відкривається лише в того, хто увійшов ДРУГИМ обліковим
   * записом, решта отримує 302 на екран вибору акаунта. Перевірено:
   * `/drive/u/1/folders/…` → 302, `/drive/folders/…` → 200.
   * Тому сегмент прибрано — теку тепер видно всім.
   */
  downloadUrl: "https://drive.google.com/drive/folders/1kbq97bCOJgdpSSz_VB-ZQCX-fNocI4aZ",

  /** Що входить у підбірку. */
  items: [
    { uk: "Логотип", en: "Logo" },
    { uk: "Фото компанії", en: "Company photos" },
    { uk: "Історія та опис компанії", en: "Company history and description" },
  ] satisfies Localized[],
};
