import type { Locale } from "@/i18n/routing";

/**
 * Сторінка «Виробництво мінерального порошку» — увесь контент дослівно з
 * /legacy-export/virobnictvo-1.html. Цифри (фракція, потужність, кількість
 * ліній) взяті рівно такими, як у джерелі; нічого не додано.
 *
 * ⚠️ Другої сторінки виробництва тут навмисно немає.
 * /legacy-export/virobnictvo-2.html — незавершений шаблон: реальним у ньому
 * є лише заголовок і один абзац (той самий, що вже стоїть у about.ts як опис
 * обʼєкта ACTU). Решта — 5 абзаців Lorem ipsum, 5 заголовків «Тайтл» і
 * вигадані показники «1900 %», «500», «890»; <title> = «Виробництво 1»,
 * meta description відсутній, зображення — той самий плейсхолдер
 * Rectangle-169.png, що й у сертифікатах. Переносити там нічого.
 */

type Localized = Record<Locale, string>;

export type ProductionStat = {
  value: Localized;
  title: Localized;
  body: Localized;
};

export const mineralPowderProduction = {
  intro: [
    {
      uk: "Компанія «Агробудсервіс» спеціалізується на виробництві високоякісного мінерального порошку, який призначений для використання у складі асфальтобетонних та сухих будівельних сумішей. На території родовища функціонують дві передові лінії з помолу вапняку.",
      en: "Agrobudservice specialises in producing high-quality mineral powder intended for use in asphalt concrete and dry construction mixes. Two advanced limestone grinding lines operate on the deposit.",
    },
    {
      uk: "Агробудсервіс здійснює постійний контроль якості продукції, щоб впевнитися, що мінеральний порошок відповідає найвищим стандартам і вимогам індустрії будівельних матеріалів",
      en: "Agrobudservice carries out continuous product quality control to make sure the mineral powder meets the highest standards and the requirements of the building materials industry",
    },
  ],

  automation: {
    title: {
      uk: "Автоматизація виробничих ліній",
      en: "Automation of the production lines",
    },
    stats: [
      {
        value: { uk: "0,071 мм", en: "0.071 mm" },
        title: {
          uk: "Фракція помолу мінерального порошку",
          en: "Grinding fraction of the mineral powder",
        },
        body: {
          uk: "Такий розмір фракції дозволяє отримати будівельні матеріали з оптимальними характеристиками.",
          en: "This fraction size makes it possible to obtain building materials with optimal characteristics.",
        },
      },
      {
        value: { uk: "50 тис. тонн", en: "50 thousand tonnes" },
        title: { uk: "Щорічна виробнича потужність", en: "Annual production capacity" },
        body: {
          uk: "Високий виробничий показник задовольняє задовольняти потреби значної частини будівельної галузі.",
          en: "This high output meets the needs of a significant part of the construction industry.",
        },
      },
      {
        value: { uk: "2 виробничі лінії", en: "2 production lines" },
        title: {
          uk: "Для помолу вапняку на млині Ersel",
          en: "For grinding limestone on an Ersel mill",
        },
        body: {
          uk: "Сучасне автоматизоване обладнання дозволяє компанії досягати необхідної фракції порошку та зберігати високу якість готового матеріалу.",
          en: "Modern automated equipment lets the company achieve the required powder fraction and maintain the high quality of the finished material.",
        },
      },
    ] satisfies ProductionStat[],
  },

  /** Відео виробничої лінії — з розмітки оригіналу (хостилось на S3 Webflow). */
  video: {
    src: "/videos/mineral-powder-line.mp4",
    description: {
      uk: "Відео роботи лінії помолу вапняку",
      en: "Video of the limestone grinding line in operation",
    },
  },

  lab: {
    title: { uk: "Власна лабораторія", en: "Our own laboratory" },
    body: {
      uk: "Помол вапняку здійснюється на інноваційному обладнанні, що дозволяє гарантувати рівномірність фракції та відповідність стандартам. Власна лабораторія проводить контроль якості продукції, включаючи аналіз фракції, вологості та відсутність домішок. Перевіряємо якість на всіх етапах виробництва, починаючи від приймання сировини та закінчуючи відвантаженням готового продукту. Це дозволяє гарантувати, що мінеральний порошок компанії «Агробудсервіс» відповідає найвищим стандартам.",
      en: "Limestone is ground on innovative equipment that guarantees an even fraction and compliance with standards. Our own laboratory carries out product quality control, including analysis of the fraction, moisture content and absence of impurities. We check quality at every stage of production, from accepting the raw material to dispatching the finished product. This lets us guarantee that Agrobudservice mineral powder meets the highest standards.",
    },
    image: { src: "/images/production/lab.jpg", width: 1200, height: 783 },
  },
} satisfies {
  intro: Localized[];
  automation: { title: Localized; stats: ProductionStat[] };
  video: { src: string; description: Localized };
  lab: { title: Localized; body: Localized; image: { src: string; width: number; height: number } };
};
