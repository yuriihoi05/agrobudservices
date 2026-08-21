import type { Locale } from "@/i18n/routing";

/**
 * ДОПИСИ БЛОГУ — реальні матеріали компанії.
 *
 * Тексти взяті дослівно з живих сторінок agrobudservice.com (посилання надав
 * замовник), бо у Webflow-експорті їх немає: /legacy-export/blog.html містить
 * лише порожній шаблон колекції з фолбеком «No items found.», а
 * /detail_post.html — 6 порожніх біндингів. Уцілів тільки JSON-LD у
 * detail_post.html, звідки взяті slug та дати публікації.
 *
 * Українські тексти НЕ редаговані — перенесені як є. Англійські —
 * машинний переклад (CLAUDE.md: «якість достатньо для розуміння»).
 *
 * Порожні абзаци-роздільники з Webflow (символ U+200D) відкинуті: у
 * розмітці вони були милицею для відступів, тут відступи задає верстка.
 *
 * Допис публікується лише коли має анонс, обкладинку і тіло — див.
 * `publishedPosts` нижче.
 */

type Localized = Record<Locale, string>;

/** Блок тіла статті. `heading` рендериться як <h2> усередині тексту. */
export type PostBlock = {
  type: "paragraph" | "heading";
  text: Localized;
};

export type PostImage = { src: string; width: number; height: number };

export type Post = {
  slug: string;
  /** ISO-дата публікації; формат виводу залежить від локалі. */
  date: string;
  title: Localized;
  /** null — анонсу ще немає. */
  excerpt: Localized | null;
  /** null — обкладинки ще немає. */
  image: PostImage | null;
  /** Порожній масив — тіла статті ще немає, допис не публікується. */
  content: PostBlock[];
};

/** Допис, готовий до показу: є анонс, обкладинка і тіло. */
export type PublishedPost = Post & {
  excerpt: Localized;
  image: PostImage;
};

/** Хелпери для тіла статті — щоб блоки читалися компактно. */
export const p = (uk: string, en: string): PostBlock => ({
  type: "paragraph",
  text: { uk, en },
});
export const h = (uk: string, en: string): PostBlock => ({
  type: "heading",
  text: { uk, en },
});

export const posts: Post[] = [
  {
    // slug і дата — з JSON-LD detail_post.html; на живому сайті сторінка
    // лежить за адресою /post/on-deer-horse-aboard-tritely-yikes-and-much.
    // Це стандартний slug-заглушка з шаблону Webflow, який так і не змінили.
    slug: "on-deer-horse-aboard-tritely-yikes-and-much",
    date: "2023-04-11",
    title: {
      uk: "ONUR GROUP приєдналась до Національної Асоціації Добувної Промисловості України",
      en: "ONUR GROUP has joined the National Association of the Mining Industry of Ukraine",
    },
    excerpt: {
      uk: "Чому партнерство з НАДПУ є цінним для Агробудсервіс та як об’єднання зусиль формують майбутнє добувної промисловості?",
      en: "Why the partnership with NAMIU matters to Agrobudservice, and how joining forces shapes the future of the mining industry.",
    },
    image: { src: "/images/blog/onur-nadpu.png", width: 1200, height: 718 },
    content: [
      p(
        "21 серпня 2023 року група компаній ONUR GROUP, до складу якої входить Агробудсервіс, офіційно приєдналась до Національної Асоціації Добувної Промисловості України (НАДПУ).",
        "On 21 August 2023 the ONUR GROUP of companies, which includes Agrobudservice, officially joined the National Association of the Mining Industry of Ukraine (NAMIU).",
      ),
      p(
        "Наша команда готова розділити цінності асоціації та підтримати її головну мету — створення прозорого, конкурентоспроможного та ефективного бізнес-середовища в галузі використання надр, спрямованого на сталий розвиток України.",
        "Our team is ready to share the association’s values and to support its main goal — creating a transparent, competitive and efficient business environment in the field of subsoil use, aimed at the sustainable development of Ukraine.",
      ),
      p(
        "Основою успіху у добувній промисловості є об’єднання зусиль, спільні ініціативи та взаємна підтримка ключових гравців ринку. Співпраця з НАДПУ дозволить нам об’єднати зусилля та долучитися до важливих проєктів, спрямованих на реформування галузі, підвищення її ефективності та екологічної безпеки.",
        "Success in the mining industry is built on joining forces, shared initiatives and mutual support among the key players on the market. Working with NAMIU will let us combine efforts and take part in important projects aimed at reforming the industry and improving its efficiency and environmental safety.",
      ),
      p(
        "Для Агробудсервіс, як частини ONUR GROUP, приєднання до НАДПУ є виявом нашої відданості розвитку галузі, прагнення зробити свій внесок у підвищення стандартів ведення бізнесу та відкритості до нових можливостей співпраці для досягнення спільної мети.",
        "For Agrobudservice, as part of ONUR GROUP, joining NAMIU is an expression of our commitment to the development of the industry, of our drive to contribute to higher business standards, and of our openness to new opportunities for cooperation towards a shared goal.",
      ),
      p(
        "Ми переконані, що це партнерство буде корисним для обох сторін. Віримо, що разом ми зможемо втілити значущі зміни та реалізувати стратегічні цілі, що визначатимуть майбутнє добувної промисловості України.",
        "We are convinced that this partnership will benefit both sides. We believe that together we can bring about meaningful change and achieve the strategic goals that will define the future of Ukraine’s mining industry.",
      ),
    ],
  },
  {
    // На живому сайті: /post/how-to-improve-web-design-process — так само
    //slug-заглушка з шаблону Webflow.
    slug: "how-to-improve-web-design-process",
    date: "2023-05-01",
    title: {
      uk: "Поряд з промисловим майданчиком Агробудсервіс почала працювати лінія сухих будівельних сумішей ACTU",
      en: "An ACTU dry construction mix line has started operating next to the Agrobudservice production site",
    },
    excerpt: {
      uk: "Широкий спектр продукції на базі якісних компонентів.",
      en: "A wide range of products built on high-quality components.",
    },
    image: { src: "/images/blog/actu-liniya.jpg", width: 1200, height: 874 },
    content: [
      p(
        "Нещодавно поблизу компанії «Агробудсервіс» запустили виробничу лінію з виготовлення сухих будівельних сумішей від партнерської компанії ACTU. Серед її асортименту — клеї, штукатурки, шпаклівки та суміші для влаштування підлог.",
        "A production line for dry construction mixes from our partner company ACTU was recently launched near Agrobudservice. Its range includes adhesives, plasters, fillers and floor screed mixes.",
      ),
      p(
        "80% сировини для виготовлення продукції ACTU надає компанія «Агробудсервіс». Розташування нового виробництва має ряд переваг. Це спрощує процеси, допомагає мінімізувати витрати на логістику, що в результаті позитивно впливає на ринкову вартість будівельних сумішей ACTU. До того ж таке розміщення сприяє ефективному використанню ресурсів, забезпечує стабільність виробництва та сталий доступ до необхідних матеріалів.",
        "Agrobudservice supplies 80% of the raw material for ACTU products. The location of the new production site brings a number of advantages: it simplifies processes and helps minimise logistics costs, which in turn has a positive effect on the market price of ACTU construction mixes. This placement also supports efficient use of resources, ensures stable production and provides sustained access to the necessary materials.",
      ),
      p(
        "Важливим аспектом є встановлення сучасного технологічного обладнання від виробника OSK для запуску нового підприємства. Це гарантує якість продукції та забезпечить очікувану річну виробничу потужність до 20 тис. тонн продукції.",
        "An important aspect is the installation of modern process equipment from the manufacturer OSK for the launch of the new plant. This guarantees product quality and will deliver an expected annual production capacity of up to 20 thousand tonnes.",
      ),
      p(
        "Ми впевнені, що продукція бренду ACTU знайде своїх прихильників серед професіоналів ринку України та задовольнить найособливіші потреби, пропонуючи високоякісну та сертіфіковану продукцію.",
        "We are confident that ACTU-branded products will find their supporters among professionals on the Ukrainian market and will meet the most specific needs, offering high-quality and certified products.",
      ),
    ],
  },
];

/**
 * Тільки готові дописи. Сторінки блогу і секція на головній працюють саме
 * з цим масивом, тож недописаний матеріал не потрапить ані в лістинг, ані
 * в generateStaticParams, ані в sitemap.
 */
export const publishedPosts: PublishedPost[] = posts.filter(
  (post): post is PublishedPost =>
    post.content.length > 0 && post.excerpt !== null && post.image !== null,
);

/** Пошук готового допису за slug — для динамічного роуту. */
export function getPost(slug: string): PublishedPost | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}

/**
 * Час читання у хвилинах. Рахується з тексту потрібної локалі, а не
 * зберігається руками — інакше він розходився б із текстом після редагування.
 * 200 слів/хв — усталене наближення для читання з екрана.
 */
export function readingTimeMinutes(post: PublishedPost, locale: Locale): number {
  const words = post.content
    .map((block) => block.text[locale])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}
