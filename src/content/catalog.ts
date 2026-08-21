import type { Locale } from "@/i18n/routing";

/**
 * Каталог продукції — 4 товари з /legacy-export/katalog-produkciyi.html
 * та /legacy-export/catalog/*.html.
 *
 * Дані товару (назви, описи, характеристики) живуть тут як { uk, en },
 * а не в messages — так вимагає CLAUDE.md для каталогу й блогу. У messages
 * лишаються тільки статичні написи інтерфейсу (хлібні крихти, CTA тощо).
 *
 * ⚠️ Сторінка ACTU в оригіналі не дописана: усе нижче hero — незаповнений
 * шаблон Webflow із заголовками «Тайтл» і латинським Lorem ipsum. Реального
 * контенту там немає, тож перенесено лише hero. Коли зʼявиться текст,
 * додайте блоки в `blocks` — сторінка підхопить їх сама.
 *
 * ⚠️ В оригіналі назва третього товару розʼїжджалась: на лістингу й головній
 * «Мінеральний порошок», а в h1 детальної сторінки — «Мінеральні суміші».
 * Уніфіковано до «Мінеральний порошок» (сам текст сторінки саме про порошок).
 */

type Localized = Record<Locale, string>;

/** Ключ піктограми товару; мапиться на компонент у ui/productIcons. */
export type ProductIcon = "sand" | "limestone" | "mineralPowder" | "actu";

export type ProductImage = {
  src: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  icon: ProductIcon;
  name: Localized;
  /** Короткий опис для картки на головній та в лістингу. */
  excerpt: Localized;
  meta: { title: Localized; description: Localized };
  image: ProductImage;
  /** Абзаци вступу під заголовком детальної сторінки. */
  intro: Localized[];
  /** Сітка різновидів/фракцій — є не в усіх товарів. */
  variants?: {
    title: Localized;
    items: { title: Localized; body: Localized }[];
  };
  /** Текстові блоки з ілюстрацією; сторони чергуються при рендері. */
  blocks: {
    title: Localized;
    body: Localized[];
    image?: ProductImage;
  }[];
};

export const products: Product[] = [
  {
    slug: "pisok",
    icon: "sand",
    name: { uk: "Пісок", en: "Sand" },
    excerpt: { uk: "Добуваємо та постачаємо якісний пісок для виробництва сухих будівельних сумішей, бетону, будівництва об’єктів нерухомості та доріг, інженерних, реставраційних робіт, ландшафтного дизайну, стабілізації ґрунту, підсипки доріжок та інших задач. В асортименті: пісок сіяний та несіяний, піщані відходи, а також — камінь пісковик..", en: "We extract and supply high-quality sand for the production of dry construction mixes and concrete, for building real estate and roads, for engineering and restoration work, landscape design, soil stabilisation, path bedding and other tasks. The range includes screened and unscreened sand, sand by-products and sandstone." },
    meta: {
      title: { uk: "Пісок ᐈ Замовити пісок від Agrobudservice", en: "Sand ᐈ Order sand from Agrobudservice" },
      description: { uk: "Агробудсервіс займається добуванням та постачанням піску, який використовується в будівництві, промисловості, приватному господарстві, а також — в ландшафтному дизайні.", en: "Agrobudservice extracts and supplies sand used in construction, industry, private households and landscape design." },
    },
    image: { src: "/images/catalog/sand-1.jpg", width: 1200, height: 874 },
    intro: [
      { uk: "Компанія «Агробудсервіс» займається добуванням та постачанням піску, який використовується в будівництві, промисловості, приватному господарстві, а також — в ландшафтному дизайні. Ми забезпечуємо ефективні рішення на всіх етапах: від добування якісного матеріалу до своєчасного постачання.", en: "Agrobudservice extracts and supplies sand used in construction, industry, private households and in landscape design. We provide effective solutions at every stage: from extracting quality material to delivering it on time." },
      { uk: "Асортимент включає різноманітні види піску, які придатні для розв’язання майже будь-якої будівельної задачі. Від піску сіяного та несіяного з модулем крупності 1,4 -1,7 до піщаних відходів та каменю пісковика — ми гарантуємо вам високу якість і надійність матеріалу.", en: "The range includes various types of sand suitable for almost any construction task. From screened and unscreened sand with a fineness modulus of 1.4–1.7 to sand by-products and sandstone, we guarantee high quality and reliability of the material." },
    ],
    variants: {
      title: { uk: "Асортимент матеріалів", en: "Range of materials" },
      items: [
        { title: { uk: "Пісок сіяний", en: "Screened sand" }, body: { uk: "Це матеріал, який пройшов процес просіювання з метою видалення домішок. Він має однорідну структуру, що забезпечує його більшу міцність, і використовується для виробництва бетону, сухих будівельних сумішей, штукатурних робіт та інших будівельних задач.", en: "This material has been sieved to remove impurities. It has a uniform structure that gives it greater strength, and is used for producing concrete and dry construction mixes, for plastering work and other construction tasks." } },
        { title: { uk: "Пісок несіяний", en: "Unscreened sand" }, body: { uk: "Цей матеріал з домішками має неоднорідну структуру і використовується для підсипки доріг, засипки фундаментів, траншей, а також для інших земляних та будівельних робіт, де не потрібна висока чистота складу, однак вимагається вища несуча здатність, стабільність й ущільненість матеріалу, на відміну від піщаних відходів", en: "This material contains impurities and has a non-uniform structure. It is used for road bedding, backfilling foundations and trenches, and for other earthworks and construction jobs where high purity is not required but higher bearing capacity, stability and compaction are — unlike sand by-products." } },
        { title: { uk: "Піщані відходи", en: "Sand by-products" }, body: { uk: "Піщані відходи, які також містять домішки глини чи інших матеріалів, натомість використовуватися в менш вимогливих ситуаціях, де не потрібна велика міцність або стабільність. До прикладу, мощення тротуарів бруківкою, великомасштабних засипок тощо.", en: "Sand by-products also contain clay and other impurities, so they are used in less demanding situations where great strength or stability is not required — for example, laying pavement setts or large-scale backfilling." } },
        { title: { uk: "Пісковик", en: "Sandstone" }, body: { uk: "Камінь пісковик - це тип осадової гірської породи, що утворюється з цементованих разом зерен піску. Він використовується в ландшафтному дизайні, при реставраційних роботах та для облицювання будівель.", en: "Sandstone is a type of sedimentary rock formed from sand grains cemented together. It is used in landscape design, in restoration work and for facing buildings." } },
      ],
    },
    blocks: [
      {
        title: { uk: "Якість має значення", en: "Quality matters" },
        body: [
          { uk: "У виробничому процесі передбачене ретельне кількаразове просіювання піску з використанням циклонної очистки від пилу. Це не лише свідчить про відповідальний підхід компанії «Агробудсервіс» до виробництва, але й надає споживачам впевненість у тому, що продукція відповідає всім вимогам. Переконайтесь у цьому, замовивши пробну партію піску для оцінки.", en: "The production process involves careful repeated sieving of the sand with cyclone dust cleaning. This not only shows the responsible approach Agrobudservice takes to production, but also gives customers confidence that the product meets every requirement. See for yourself by ordering a trial batch of sand for evaluation." },
        ],
        image: { src: "/images/catalog/sand_2.jpg", width: 1200, height: 806 },
      },
    ],
  },
  {
    slug: "vapnyak",
    icon: "limestone",
    name: { uk: "Вапняк", en: "Limestone" },
    excerpt: { uk: "Пропонуємо вапняк широкого спектру фракцій для виробництва цементу, гідратного вапна, будівництва доріг, використання у процесі виробництва сталі, підсипки доріг, розкислення ґрунтів, додавання до корму тваринам й птицям тощо.", en: "We offer limestone in a wide range of fractions for cement and hydrated lime production, road construction, steel production, road bedding, soil deacidification, animal and poultry feed additives and more." },
    meta: {
      title: { uk: "Вапняк ᐈ Замовити вапняк від Agrobudservice", en: "Limestone ᐈ Order limestone from Agrobudservice" },
      description: { uk: "Агробудсервіс спеціалізується на добуванні та постачанні вапняку різних фракцій, які активно застосовуються при будівельних, інженерних роботах ✔", en: "Agrobudservice extracts and supplies limestone in various fractions, widely used in construction and engineering work ✔" },
    },
    image: { src: "/images/catalog/limestone.jpg", width: 1200, height: 874 },
    intro: [
      { uk: "Компанія «Агробудсервіс» спеціалізується на добуванні та постачанні вапняку різних фракції, які активно застосовуються у виробництві будівельних матеріалів, при будівельних, інженерних роботах, у сільському господарстві, скловиробництві, металургійній промисловості та для потреб приватних господарств.", en: "Agrobudservice specialises in extracting and supplying limestone in various fractions, widely used in building materials production, in construction and engineering work, in agriculture, glassmaking, the metallurgical industry and for the needs of private households." },
      { uk: "Нам важливо надавати клієнтам найкращий матеріал, що відповідає стандартам якості. У нашому вапняку міститься 99% карбонату кальцію (CaCO₃). Такий хімічний склад особливо важливий для ефективного виробництва гідратного вапна.", en: "It matters to us to give clients the best material, meeting quality standards. Our limestone contains 99% calcium carbonate (CaCO₃). This chemical composition is especially important for efficient hydrated lime production." },
    ],
    variants: {
      title: { uk: "Асортимент матеріалів", en: "Range of materials" },
      items: [
        { title: { uk: "Фракція 0-20 мм", en: "Fraction 0–20 mm" }, body: { uk: "Найкраще підходить для розкислення ґрунтів, виробництва цементу, гідратного вапна, засипки шахт, в яких раніше була руда, а також — до корму тваринам та птиці, а саме його фракції 0-3 й 1-3 мм.", en: "Best suited for soil deacidification, cement and hydrated lime production, backfilling mined-out shafts, and — in the 0–3 and 1–3 mm fractions — as an animal and poultry feed additive." } },
        { title: { uk: "Фракція 20-40 мм", en: "Fraction 20–40 mm" }, body: { uk: "Також може застосовуватись при різних будівельних і земляних роботах, для виробництва гідратного вапна, скла та у металургійній промисловості.", en: "Can also be used in various construction and earthworks, for producing hydrated lime and glass, and in the metallurgical industry." } },
        { title: { uk: "Фракція 40-80 мм", en: "Fraction 40–80 mm" }, body: { uk: "Використовують при будівництві доріг, їх підсипці, для стабілізації ґрунтів, у процесі виготовлення сталі в якості флюсу та при скловиробництві", en: "Used in road construction and road bedding, for soil stabilisation, as a flux in steelmaking and in glass production." } },
        { title: { uk: "Фракція 80-120 мм", en: "Fraction 80–120 mm" }, body: { uk: "Така фракція є необхідною при масштабних будівельних проектах, зокрема для основ доріг, фундаментів, для стабілізації великих поверхонь, у якості дренажних матеріалів, у металургійній промисловості.", en: "This fraction is essential for large-scale construction projects: road bases, foundations, stabilising large surfaces, drainage materials and the metallurgical industry." } },
      ],
    },
    blocks: [
      {
        title: { uk: "Експертиза та досвід", en: "Expertise and experience" },
        body: [
          { uk: "Маючи великий досвід у добуванні та обробці вапняку, ми розуміємо, наскільки важлива якість сировини та її подальший вплив на кінцевий продукт. Саме тому готові безоплатно надіслати на експертизу пробну партію матеріалу (від 5 - 10 кг). Після всіх узгоджень гарантуємо оперативне постачання вашого замовлення Україною або ж завантаження матеріалу у ваш транспорт.", en: "With extensive experience in extracting and processing limestone, we understand how important the quality of the raw material is and how it affects the final product. That is why we are ready to send a trial batch (5–10 kg) for analysis free of charge. Once everything is agreed, we guarantee prompt delivery of your order across Ukraine, or loading the material into your own transport." },
        ],
        image: { src: "/images/catalog/limestone_2.jpg", width: 1200, height: 730 },
      },
    ],
  },
  {
    slug: "mineralni-sumishi",
    icon: "mineralPowder",
    name: { uk: "Мінеральний порошок", en: "Mineral powder" },
    excerpt: { uk: "Виробляємо мінеральний порошок, який застосовується для виробництва асфальтобетону та сухих будівельних сумішей. Використовуємо дві лінії для помолу вапняку в мінеральний порошок на валковому млині Ersel.", en: "We produce mineral powder used in the manufacture of asphalt concrete and dry construction mixes. We operate two lines that grind limestone into mineral powder on an Ersel roller mill." },
    meta: {
      title: { uk: "Мінеральні суміші ᐈ Замовити в Agrobudservice", en: "Mineral powder ᐈ Order from Agrobudservice" },
      description: { uk: "Мінеральний порошок виробництва компанії Агробудсервіс є невіддільною складовою багатьох інфраструктурних проєктів України ✔", en: "Mineral powder produced by Agrobudservice is an integral part of many infrastructure projects in Ukraine ✔" },
    },
    image: { src: "/images/catalog/minerals-1.jpg", width: 1200, height: 874 },
    intro: [
      { uk: "Компанія «Агробудсервіс» виробляє та постачає дрібнодисперсний продукт, який утворюється шляхом помолу вапняку. Наші клієнти використовують його як добавку для асфальтобетонних та сухих будівельних сумішей. Наш продукт відзначається однорідністю, що робить його відмінним вибором для будівельних проєктів різної складності.", en: "Agrobudservice produces and supplies a fine-grained product obtained by grinding limestone. Our clients use it as an additive for asphalt concrete and dry construction mixes. Our product is notable for its uniformity, which makes it an excellent choice for construction projects of varying complexity." },
      { uk: "Виробничий процес відбувається на високоефективному валковому млині Ersel, що гарантує стабільну якість та оптимальні характеристики нашого мінерального порошку. Виробництво організоване на двох автоматизованих сучасних лініях.", en: "Production runs on a highly efficient Ersel roller mill, which guarantees stable quality and optimal characteristics of our mineral powder. Production is organised on two automated modern lines." },
    ],
    blocks: [
      {
        title: { uk: "Оптимальна фракція", en: "Optimal fraction" },
        body: [
          { uk: "Мінеральний порошок виробництва компанії «Агробудсервіс» має оптимальний розмір частинок — 0,071 мм. Це робить його ідеальним матеріалом для виробництва сухих будівельних сумішей та асфальтобетону.", en: "Mineral powder produced by Agrobudservice has an optimal particle size of 0.071 mm. This makes it an ideal material for producing dry construction mixes and asphalt concrete." },
        ],
        image: { src: "/images/catalog/about_us_dry_mixes.jpg", width: 1200, height: 784 },
      },
      {
        title: { uk: "Якість і надійний сервіс", en: "Quality and dependable service" },
        body: [
          { uk: "Наш мінеральний порошок є невіддільною складовою багатьох інфраструктурних проєктів України. Серед них: будівництво доріг, мостів та інших об’єктів, які потребують високоякісних матеріалів. Використання сучасних виробничих потужностей дозволяє гарантувати відповідність мінерального порошку всім стандартам якості.", en: "Our mineral powder is an integral part of many infrastructure projects in Ukraine, among them the construction of roads, bridges and other facilities that require high-quality materials. Using modern production capacity lets us guarantee that the mineral powder meets every quality standard." },
          { uk: "Ви можете переконатись в якості матеріалу: за вашим запитом ми безоплатно надішлемо пробну партію на експертизу (від 5 до 10 кг). Стабільне виробництво та налагоджена логістика дозволяє нам закривати потреби великих та малих підприємств, пропонуючи своєчасне виробництво та доставку.", en: "You can see the quality of the material for yourself: on request we will send a trial batch (5 to 10 kg) for analysis free of charge. Stable production and well-organised logistics let us cover the needs of both large and small enterprises, offering timely production and delivery." },
        ],
        image: { src: "/images/catalog/minerals_3.jpg", width: 1200, height: 783 },
      },
    ],
  },
  {
    slug: "actu",
    icon: "actu",
    name: { uk: "Сухі будівельні суміші ACTU", en: "ACTU dry construction mixes" },
    excerpt: { uk: "Поруч із виробництвом Агробудсервіс знаходиться сучасна лінія партнерської компанії ACTU з виготовлення сухих будівельних сумішей, серед яких клеї, цементні штукатурки, шпаклівки та суміші для влаштування підлог.", en: "Next to the Agrobudservice production site there is a modern line run by our partner company ACTU, producing dry construction mixes including adhesives, cement plasters, fillers and floor screed mixes." },
    meta: {
      title: { uk: "Поблизу промислового комплексу Агробудсервіс розташована лінія виробництва сухих будівельних сумішей - ACTU", en: "ACTU ᐈ Dry construction mixes next to Agrobudservice" },
      description: { uk: "80% сировини для продукції ACTU постачає компанія Agrobudservice ✔ Потужність виробництва становить 20 тисяч тонн ✔ В асортименті: клеї, цементні штукатурки, шпаклівки та суміші для підлог.", en: "Agrobudservice supplies 80% of the raw material for ACTU products ✔ Production capacity is 20 thousand tonnes ✔ The range includes adhesives, cement plasters, fillers and floor mixes." },
    },
    image: { src: "/images/catalog/actu.jpg", width: 1200, height: 874 },
    intro: [
      { uk: "Поблизу промислового комплексу Агробудсервіс розташована лінія виробництва сухих будівельних сумішей, яка належить партнерській компанії ACTU. Така стратегічна локація є найбільш вигідною з точки зору оптимізації процесів, логістики, збереження екологічної чистоти, контролю за всіма етапами виробництва та якості використовуваних сировинних матеріалів.", en: "Next to the Agrobudservice industrial complex there is a dry construction mix production line belonging to our partner company ACTU. This strategic location is the most advantageous in terms of optimising processes and logistics, preserving environmental cleanliness, and controlling every production stage and the quality of the raw materials used." },
      { uk: "80% сировини для продукції ACTU постачає компанія «Агробудсервіс». Потужність виробництва становить 20 тисяч тонн. В асортименті: клеї, цементні штукатурки, шпаклівки та суміші для підлог.", en: "Agrobudservice supplies 80% of the raw material for ACTU products. Production capacity is 20 thousand tonnes. The range includes adhesives, cement plasters, fillers and floor mixes." },
    ],
    blocks: [
    ],
  },
];

/** Пошук товару за slug — для динамічного роуту. */
export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
