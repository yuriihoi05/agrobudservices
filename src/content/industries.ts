import type { Locale } from "@/i18n/routing";

/**
 * Галузі застосування — з /legacy-export/galuzi-zastosuvannya.html.
 *
 * Кожна галузь перелічує матеріали, які в ній використовують. У оригіналі
 * підпис і піктограма матеріалу дублювалися в розмітці стільки разів,
 * скільки галузей його згадують. Тут матеріал описано один раз у `materials`,
 * а галузь посилається на нього ключем.
 *
 * Якірні id (`area-1`…`area-6`) збережені: на них веде секція «Галузі
 * застосування» з головної сторінки.
 *
 * Тексти на головній коротші й лишаються в messages — це окремі анонси,
 * а не ті самі рядки.
 */

type Localized = Record<Locale, string>;

export type Industry = {
  /** Якір для посилань із головної: /galuzi-zastosuvannya#area-1 */
  id: string;
  title: Localized;
  body: Localized[];
  image: { src: string; width: number; height: number };
  materials: MaterialKey[];
};

export const materials = {
  sandScreened: { uk: "Пісок (сіяний)", en: "Sand (screened)" },
  sandUnscreened: { uk: "Пісок (несіяний)", en: "Sand (unscreened)" },
  sandWaste: { uk: "Піщані відходи", en: "Sand by-products" },
  sandstone: { uk: "Камінь пісковик", en: "Sandstone" },
  limestone0_3: { uk: "Вапняк (0-3, 1-3 мм)", en: "Limestone (0–3, 1–3 mm)" },
  limestone0_20: { uk: "Вапняк (0-20 мм)", en: "Limestone (0–20 mm)" },
  limestone20_40: { uk: "Вапняк (20-40 мм)", en: "Limestone (20–40 mm)" },
  limestone40_80: { uk: "Вапняк (40-80 мм)", en: "Limestone (40–80 mm)" },
  limestone80_120: { uk: "Вапняк (80-120 мм)", en: "Limestone (80–120 mm)" },
  mineralPowder: { uk: "Мінеральний порошок (0,071 мм)", en: "Mineral powder (0.071 mm)" },
} satisfies Record<string, Localized>;

export type MaterialKey = keyof typeof materials;

export const industries: Industry[] = [
  {
    id: "area-1",
    title: { uk: "Виробництво будівельних матеріалів", en: "Building materials production" },
    body: [
      { uk: "Пісок компанії «Агробудсервіс» використовується для виробництва сухих будівельних сумішей і бетону, мінеральний порошок — для сухих будівельних та асфальтобетонних сумішей, вапняк з високим вмістом кальцій карбонату (99%) — для виготовлення цементу та гідратного вапна.", en: "Agrobudservice sand is used to produce dry construction mixes and concrete; mineral powder goes into dry construction and asphalt concrete mixes; and limestone with a high calcium carbonate content (99%) is used to make cement and hydrated lime." },
      { uk: "Висока якість матеріалів сприяє стабільності та надійності продуктів, а асортимент здатний задовольнити потреби проєктів будь-якого напрямку та складності.", en: "The high quality of the materials contributes to the stability and reliability of the end products, while the range is able to meet the needs of projects of any type and complexity." },
    ],
    image: { src: "/images/home/building_materials.jpg", width: 900, height: 716 },
    materials: ["sandScreened", "limestone0_20", "limestone20_40", "mineralPowder"],
  },
  {
    id: "area-2",
    title: { uk: "Будівельні та інженерні роботи", en: "Construction and engineering work" },
    body: [
      { uk: "Нашу продукцію широко використовують компанії та організації, що спеціалізуються на будівництві автомобільних шляхів, зведенні об’єктів нерухомості, проведенні реставраційних робіт, ландшафтному дизайні.", en: "Our products are widely used by companies and organisations specialising in road construction, property development, restoration work and landscape design." },
      { uk: "До прикладу, сіяний та несіяний пісок, піщані відходи чи вапняк можуть пригодитись для засипки траншей, підготовки для укладання бруківки, формування шарів під фундамент і дорожні покриття. При проведенні реставраційних робіт використовують камінь пісковик.", en: "For example, screened and unscreened sand, sand by-products or limestone can be useful for backfilling trenches, preparing surfaces for paving, and forming layers under foundations and road surfaces. Sandstone is used in restoration work." },
    ],
    image: { src: "/images/home/construction.jpg", width: 1200, height: 1398 },
    materials: ["sandScreened", "sandUnscreened", "sandWaste", "sandstone", "limestone20_40", "limestone40_80", "limestone80_120"],
  },
  {
    id: "area-3",
    title: { uk: "Агросектор", en: "Agricultural sector" },
    body: [
      { uk: "Вапняк є цінним ресурсом у сільському господарстві, допомагаючи підвищувати якість і продуктивність агрокультур та підтримувати здорове й стале фермерство.", en: "Limestone is a valuable resource in agriculture, helping to improve the quality and productivity of crops and to support healthy, sustainable farming." },
      { uk: "По-перше, це ефективне мінеральне добриво. Вапняк компанії “Агробудсервіс”, багатий карбонатом кальцію CaCO₃ (99%), допомагає підвищити рівень pH кислих ґрунтів, забезпечуючи більш сприятливе середовище для росту рослин, та запобігти ерозії.", en: "First, it is an effective mineral fertiliser. Agrobudservice limestone, rich in calcium carbonate CaCO₃ (99%), helps raise the pH of acidic soils, providing a more favourable environment for plant growth and preventing erosion." },
      { uk: "По-друге, вапняк, у вигляді харчової добавки забезпечує тварин та птицю необхідними мінералами і поживними речовинами, сприяючи їхньому здоров'ю, продуктивності та розвитку.", en: "Second, limestone used as a feed additive provides animals and poultry with the minerals and nutrients they need, supporting their health, productivity and development." },
      { uk: "По-третє, вапняк є відмінним матеріалом для підсипки ґрунтових доріг. Використовуючи різні фракції вапняку, можна забезпечити оптимальні умови для проїзду техніки.", en: "Third, limestone is an excellent material for surfacing unpaved roads. Using different fractions of limestone makes it possible to provide optimal conditions for machinery to pass." },
    ],
    image: { src: "/images/home/agricultural_sector.jpg", width: 1200, height: 800 },
    materials: ["limestone0_3", "limestone0_20", "limestone20_40", "limestone40_80"],
  },
  {
    id: "area-4",
    title: { uk: "Металургія", en: "Metallurgy" },
    body: [
      { uk: "Вапняк від компанії «Агробудсервіс» використовується у металургійному секторі як флюс. Він допомагає видаляти домішки з руди та активує ряд важливих процесів. Це утворення шлаку, зниження температури плавлення руди та сприяння її окисленню, зменшення витрат енергії, захист обшивки печі та поліпшення якості сталі.", en: "Limestone from Agrobudservice is used in the metallurgical sector as a flux. It helps remove impurities from ore and activates a number of important processes: slag formation, lowering the melting point of the ore and promoting its oxidation, reducing energy consumption, protecting the furnace lining and improving steel quality." },
      { uk: "Вибір фракції визначається конкретними виробничими вимогами. Більш дрібна фракція застосовується для засипки шахт, в яких раніше була руда. Це допомагає запобігти обвалу і забрудненню навколишнього середовища.", en: "The choice of fraction is determined by specific production requirements. Finer fractions are used to backfill mined-out shafts, which helps prevent collapse and environmental contamination." },
    ],
    image: { src: "/images/home/metallurgy.jpg", width: 1200, height: 955 },
    materials: ["limestone0_20", "limestone20_40", "limestone40_80", "limestone80_120"],
  },
  {
    id: "area-5",
    title: { uk: "Виробництво скла", en: "Glass production" },
    body: [
      { uk: "Додавання вапняку в процес виробництва скла не лише забезпечує необхідні хімічні властивості готового продукту, але й надає йому хімічної стійкості. Це особливо важливо для забезпечення тривалого та надійного функціонування скляних виробів у різних умовах експлуатації.", en: "Adding limestone to the glass production process not only provides the required chemical properties of the finished product but also gives it chemical resistance. This is especially important for the long and reliable service life of glass products in various operating conditions." },
      { uk: "Вапняк додають до скляної маси як стабілізатор у вигляді оксиду кальцію (CaO). Його присутність допомагає контролювати хімічні властивості, температуру плавлення та поліпшує характеристики скла: в'язкість, прозорість, довговічність та стійкість до погодних умов. Вапняк також відіграє важливу роль у зниженні температури плавлення, що робить процес більш енергоефективним, та нейтралізації кислотних оксидів.", en: "Limestone is added to the glass melt as a stabiliser in the form of calcium oxide (CaO). Its presence helps control chemical properties and melting temperature and improves the characteristics of the glass: viscosity, transparency, durability and weather resistance. Limestone also plays an important role in lowering the melting point, making the process more energy-efficient, and in neutralising acidic oxides." },
    ],
    image: { src: "/images/home/glass.jpg", width: 1200, height: 955 },
    materials: ["limestone20_40", "limestone40_80"],
  },
  {
    id: "area-6",
    title: { uk: "Для приватних господарств", en: "For private households" },
    body: [
      { uk: "Компанія «Агробудсервіс» добуває та постачає матеріали для потреб приватних господарств. Наш асортимент включає сіяний та несіяний пісок, піщані відходи, камінь пісковик, а також вапняк у різних фракціях. Ми не обмежуємо клієнтів у мінімальній кількості замовлення. Ви можете отримати необхідний обсяг матеріалу для ваших задач, чи то стабілізація ґрунту, укладання бруківки, чи штукатурення стін будинку, заливання стяжок, чи ландшафтне оформлення присадибної ділянки.", en: "Agrobudservice extracts and supplies materials for the needs of private households. Our range includes screened and unscreened sand, sand by-products, sandstone and limestone in various fractions. We do not set a minimum order quantity — you can get exactly the volume of material you need, whether for soil stabilisation, laying paving, plastering house walls, pouring screeds or landscaping a garden plot." },
      { uk: "Матеріали Агробудсервіс характеризуються високою якістю і надійністю, що робить їх ідеальними для будь-яких будівельних та ландшафтних проектів у приватних господарствах.", en: "Agrobudservice materials are notable for their high quality and reliability, which makes them ideal for any construction and landscaping project on a private property." },
    ],
    image: { src: "/images/home/sector.jpg", width: 1200, height: 955 },
    materials: ["sandScreened", "sandUnscreened", "sandWaste", "sandstone", "limestone20_40", "limestone40_80"],
  },
];
