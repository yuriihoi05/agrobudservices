import type { Locale } from "@/i18n/routing";

/**
 * Сторінка «Кар'єр» — увесь контент дослівно з /legacy-export/quarry.html.
 * Нічого не додано: цифри, площі та обсяги взяті рівно такими, як у джерелі.
 */

type Localized = Record<Locale, string>;

export type QuarryStat = {
  /** Показник великим кеглем — «40+ га», «1 млн. тонн». */
  value: Localized;
  title: Localized;
  body: Localized;
};

export const quarry = {
  /** Два абзаци під заголовком сторінки. */
  intro: [
    {
      uk: "Компанія «Агробудсервіс» базує своє виробництво на кар'єрі Південно-Тростянецького родовища, розташованого у Львівській області. Тут організоване добування піску та вапняку для потреб будівництва, промисловості та сільського господарства. Також Агробудсервіс займається помолом вапняку на сучасному виробничому обладнанні Ersel із річною потужністю 50 тис. тонн.",
      en: "Agrobudservice bases its production at the quarry of the Pivdenno-Trostyanets deposit in the Lviv region. Sand and limestone are extracted here for the needs of construction, industry and agriculture. Agrobudservice also grinds limestone on modern Ersel production equipment with an annual capacity of 50 thousand tonnes.",
    },
    {
      uk: "Видобування на кар'єрі велось ще з 1970-х років. У 2016 році Агробудсервіс приєднався до міжнародної групи компаній ONUR GROUP. Цей крок став переломним моментом у розвитку підприємства. Завдяки інвестиціям ONUR GROUP компанія змогла розширити парк техніки, модернізувати обладнання та збільшити обсяги виробництва піску й вапняку до понад 650 тис. тонн на рік.",
      en: "Extraction at the quarry has been carried out since the 1970s. In 2016 Agrobudservice joined the international ONUR GROUP of companies. That step was a turning point in the development of the enterprise. Thanks to ONUR GROUP investment the company was able to expand its equipment fleet, modernise machinery and increase sand and limestone output to more than 650 thousand tonnes per year.",
    },
  ],

  potential: {
    title: { uk: "Значний потенціал", en: "Considerable potential" },
    stats: [
      {
        value: { uk: "40+ га", en: "40+ ha" },
        title: { uk: "Загальна площа кар'єру", en: "Total quarry area" },
        body: {
          uk: "Завдяки сучасним технологіям видобутку, компанія «Агробудсервіс» може ефективно використовувати наявні запаси сировини та застосовувати принципи сталого виробництва.",
          en: "Thanks to modern extraction technologies, Agrobudservice can make efficient use of the available raw material reserves and apply the principles of sustainable production.",
        },
      },
      {
        value: { uk: "1 млн. тонн", en: "1 million tonnes" },
        title: {
          uk: "Щорічний потенціал видобутку піску",
          en: "Annual sand extraction potential",
        },
        body: {
          uk: "Компанія Агробудсервіс пропонує матеріали для використання у будівництві, промисловому виробництві, сільському господарстві.",
          en: "Agrobudservice offers materials for use in construction, industrial manufacturing and agriculture.",
        },
      },
      {
        value: { uk: "600 тис. тонн", en: "600 thousand tonnes" },
        title: {
          uk: "Щорічний потенціал видобутку вапняку",
          en: "Annual limestone extraction potential",
        },
        body: {
          uk: "Наявна вибірка фракцій дозволяє задовільнити потреби різних індустрій: від виробництва будівельних матеріалів до скловиробництва та металургійної промисловості. А високий вміст карбонату кальцію (99%) у складі є цінним при виготовленні гідратного вапна.",
          en: "The available range of fractions meets the needs of various industries: from building materials production to glassmaking and the metallurgical industry. The high calcium carbonate content (99%) is valuable in the production of hydrated lime.",
        },
      },
    ] satisfies QuarryStat[],
  },

  location: {
    title: { uk: "Вдале розташування", en: "A convenient location" },
    body: {
      uk: "Виробничі потужності Агробудсервіс розташовані в зручному місці, за 1,7 км від автодороги M06 Київ-Чоп та залізничної колії. Це забезпечує зручний самовивоз для наших клієнтів, а також можливість відправляти масштабні замовлення в межах всієї України. Ми маємо власний транспорт, і можемо доставляти сировину та продукцію в будь-яку точку Львівської області обсягом до 600 тонн за день. Ми впровадили принцип оперативного відвантаження замовлень, який зберігає темпи виробництва наших клієнтів та підкреслює відповідальність компанії.",
      en: "The Agrobudservice production facilities are conveniently located 1.7 km from the M06 Kyiv–Chop motorway and the railway line. This makes self-pickup convenient for our clients and allows large-scale orders to be shipped throughout Ukraine. We have our own transport and can deliver raw materials and products anywhere in the Lviv region in volumes of up to 600 tonnes per day. We have introduced a principle of prompt order dispatch, which keeps our clients' production on schedule and underlines the company's sense of responsibility.",
    },
    image: { src: "/images/quarry/location.jpg", width: 1200, height: 783 },
  },
} satisfies {
  intro: Localized[];
  potential: { title: Localized; stats: QuarryStat[] };
  location: { title: Localized; body: Localized; image: { src: string; width: number; height: number } };
};
