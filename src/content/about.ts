import type { Locale } from "@/i18n/routing";

/**
 * Дані сторінки «Про нас» — з /legacy-export/about-us.html.
 * Тексти інтерфейсу (заголовки секцій, підписи) — у messages.
 *
 */

type Localized = Record<Locale, string>;

export type Facility = {
  title: Localized;
  body: Localized;
  href: string;
  image: { src: string; width: number; height: number };
};

export const about = {
  intro: [
    { uk: "Агробудсервіс входить до ONUR GROUP у секторі Mining & Quarrying. ONUR GROUP — міжнародна група, заснована у 1981 році. Вона складається з більше ніж 40 компаній, що працюють у 13 секторах економіки. Головна сфера діяльності – проєктування та будівництво доріг, мостів, тунелів, дамб, аеропортів, трамвайних ліній та інших інфраструктурних об’єктів.", en: "Agrobudservice is part of ONUR GROUP in the Mining & Quarrying sector. ONUR GROUP is an international group founded in 1981. It consists of more than 40 companies operating in 13 sectors of the economy. Its main field of activity is the design and construction of roads, bridges, tunnels, dams, airports, tram lines and other infrastructure facilities." },
    { uk: "Основою виробництва компанії є кар’єр Південно-Тростянецького родовища, розташований у Львівській області в 1,7 км від траси Київ-Чоп, із загальною площею 141 га. Кар’єр існує майже 50 років, однак поворотним моментом у розвитку  Агробудсервіс став 2016 рік, коли підприємство приєдналось до міжнародної групи компаній ONUR GROUP, до її сектору Mining & Quarrying.", en: "The basis of the company's production is the quarry of the Pivdenno-Trostyanets deposit, located in the Lviv region 1.7 km from the Kyiv–Chop highway, with a total area of 141 hectares. The quarry has existed for almost 50 years, but the turning point in the development of Agrobudservice came in 2016, when the company joined the international ONUR GROUP and its Mining & Quarrying sector." },
    { uk: "Закордонний досвід та інвестиції дали змогу розширити парк техніки, оновити обладнання та збільшити обсяги виробництва піску й вапняку до понад 650 тис. тонн щорічно. Агробудсервіс також оперує двома лініями для помолу вапняку в мінеральний порошок на валковому млині Ersel з річною потужністю 50 тис. тонн.", en: "International experience and investment made it possible to expand the equipment fleet, upgrade machinery and increase sand and limestone output to more than 650 thousand tonnes per year. Agrobudservice also operates two lines that grind limestone into mineral powder on an Ersel roller mill, with an annual capacity of 50 thousand tonnes." },
    { uk: "Зокрема, поряд із виробничим майданчиком Агробудсервіс розташована лінія з виготовлення сухих будівельних сумішей від партнерської компанії ACTU, а саме клеїв, цементних штукатурок, шпаклівок та сумішей для влаштування підлог. Агробудсервіс забезпечує основну частку сировини, яка потрібна для виробництва продукції ACTU.", en: "In particular, next to the Agrobudservice production site there is a line producing dry construction mixes from our partner company ACTU — adhesives, cement plasters, fillers and floor screed mixes. Agrobudservice supplies the main share of the raw material needed for ACTU products." },
    { uk: "Впровадження інновацій та безперервне вдосконалення дають змогу задовольняти найособливіші потреби на ринку, реалізовувати масштабні замовлення, гарантуючи якість продуктів, їх широкий вибір і відповідність стандартам. Наша команда вирізняється професіоналізмом, відповідальністю та прагненням сприяти досягненням клієнтів. Відтак, ми завоювали довіру понад 100 компаній, серед яких Alba, Ceresit, Інтергал-буд, РІЕЛ, Автострада, Автомагістраль-Південь, МКС Бетон, Миколаївцемент (СRH), МХП та Запорізький металургійний комбінат «Запоріжсталь».", en: "Innovation and continuous improvement let us meet the most specific needs on the market and fulfil large-scale orders, guaranteeing product quality, a wide choice and compliance with standards. Our team stands out for its professionalism, responsibility and drive to contribute to our clients' achievements. As a result we have earned the trust of more than 100 companies, among them Alba, Ceresit, Intergal-bud, RIEL, Avtostrada, Avtomagistral-Pivden, MKS Beton, Mykolaivcement (CRH), MHP and the Zaporizhstal metallurgical plant." },
  ],
  facilities: [
    {
      title: { uk: "Кар’єр Південно-Тростянецького родовища", en: "Quarry of the Pivdenno-Trostyanets deposit" },
      body: { uk: "На цьому кар’єрі здійснюється видобування піску, придатного в якості сировини у виробництві будівельних матеріалів та для використання у будівельних, інженерних і реставраційних роботах, а також вапняку різних фракцій, необхідного для застосування у галузях будівництва, металургії, агросектору, скловиробництва тощо.", en: "This quarry extracts sand suitable as a raw material for building materials production and for construction, engineering and restoration work, as well as limestone in various fractions needed in construction, metallurgy, the agricultural sector, glassmaking and more." },
      href: "/quarry",
      image: { src: "/images/about/quarry.jpg", width: 1200, height: 784 },
    },
    {
      title: { uk: "Виробництво мінерального порошку", en: "Mineral powder production" },
      body: { uk: "Окрім видобутку піску та вапняку, компанія «Агробудсервіс» займається виготовленням мінерального порошку, призначеного для виробництва асфальтобетонних та сухих будівельних сумішей. На території родовища функціонують дві передові лінії для помолу вапняку, завдяки яким вдається досягти його подрібненню на мінеральний порошок до фракції 0.071 мм.", en: "Besides extracting sand and limestone, Agrobudservice produces mineral powder intended for asphalt concrete and dry construction mixes. Two advanced grinding lines operate on the deposit, allowing limestone to be ground into mineral powder down to a 0.071 mm fraction." },
      href: "/virobnictvo-1",
      image: { src: "/images/about/mineral-powder.jpg", width: 1200, height: 784 },
    },
    {
      title: { uk: "Виробництво сухих будівельних сумішей ACTU", en: "ACTU dry construction mix production" },
      body: { uk: "Поряд із промисловим комплексом Агробудсервіс знаходиться лінія з виготовлення сухих будівельних сумішей від партнерської компанії ACTU. Таке розташування максимально вигідне з точки зору оптимізації, логістики, екології, контролю етапів виробництва та якості сировини. Адже продукція ACTU на 80% складається із матеріалів Агробудсервіс.", en: "Next to the Agrobudservice industrial complex there is a dry construction mix line from our partner company ACTU. This location is maximally advantageous for optimisation, logistics, ecology, and control over production stages and raw material quality — ACTU products consist 80% of Agrobudservice materials." },
      href: "/catalog/actu",
      image: { src: "/images/about/actu.jpg", width: 1200, height: 784 },
    },
  ],
} satisfies {
  intro: Localized[];
  facilities: Facility[];
};
