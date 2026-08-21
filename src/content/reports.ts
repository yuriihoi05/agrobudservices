import type { Locale } from "@/i18n/routing";

/**
 * Фінансова звітність — спільні дані для секції на «Про нас» і для окремої
 * сторінки /zvitnist.
 *
 * Джерело — /legacy-export/about-us.html: саме там лежить заповнений
 * акордеон із роками й посиланнями на документи.
 *
 * Окремої сторінки /zvitnist у проєкті немає: у legacy-export вона була
 * порожньою оболонкою того самого акордеону (три пункти «Lorem ipsum»,
 * жодного посилання), а дублювати ті самі звіти двома адресами немає
 * сенсу. Старий URL редиректить на секцію «Про нас» (next.config.ts).
 *
 * Рік 2020 прибрано на запит замовника: документа за нього немає
 * (в оригіналі посилання вело на `href="#"`).
 *
 * Пункт без `href` і далі рендериться як неактивний — це запобіжник на
 * випадок, коли рік додадуть раніше, ніж завантажать файл.
 */

type Localized = Record<Locale, string>;

export type ReportYear = {
  year: string;
  documents: { title: Localized; href: string | null }[];
};

export const reports: ReportYear[] = [
    {
      year: "2024",
      documents: [
        { title: { uk: "Аудиторська та фінансова звітність", en: "Audit and financial statements" }, href: "https://drive.google.com/file/d/1DoIE2M92Zjm__xqDHn_aJD6HvABZjkd6/view?usp=sharing" },
        { title: { uk: "Звіт про управління за 2024", en: "Management report for 2024" }, href: "/documents/zvit-pro-upravlinnya-2024.pdf" },
      ],
    },
    {
      year: "2023",
      documents: [
        { title: { uk: "Аудиторський висновок Агробудсервіс 2023", en: "Аудиторський висновок Агробудсервіс 2023" }, href: "https://drive.google.com/file/d/1CFfDnv2Q8Tev7p9uxuiKdhSrjcB91loB/view?usp=sharing" },
        { title: { uk: "Звіт про управління за 2023", en: "Management report for 2023" }, href: "https://drive.google.com/file/d/1LvujofidxvG6G8FfL32EOpLknuu7SqR9/view?usp=sharing" },
      ],
    },
    {
      year: "2022",
      documents: [
        { title: { uk: "Аудиторський висновок Агробудсервіс 2022", en: "Аудиторський висновок Агробудсервіс 2022" }, href: "https://drive.google.com/file/d/1eSSFPNeQH59YPxcb1hWa2wHE23-9VS4h/view?usp=sharing" },
      ],
    },
    {
      year: "2021",
      documents: [
        { title: { uk: "Аудиторський висновок Агробудсервіс 2021", en: "Аудиторський висновок Агробудсервіс 2021" }, href: "https://drive.google.com/file/d/1ZKy5NyQHPFEVydp3E9iDUngAMOPVjrKS/view?usp=sharing" },
      ],
    },
];
