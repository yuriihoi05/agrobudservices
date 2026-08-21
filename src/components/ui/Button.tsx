import { Link } from "@/i18n/navigation";

type Variant = "solid" | "outline";

/*
 * Кнопка не просто змінює колір: додається м'який підйом і тінь у тон бренду,
 * а на натисканні — повернення вниз, щоб клік відчувався фізично.
 * Easing навмисно не linear: вихід швидкий, повернення плавніше.
 * `motion-reduce:` знімає рух, лишаючи колірний стан — кнопка й далі
 * реагує на наведення, просто без переміщення.
 */
const base = [
  "focus-ring inline-flex min-h-13 items-center justify-center rounded-full px-10 py-3.5",
  "text-center text-lg font-medium sm:text-xl",
  "transition-[background-color,color,box-shadow,translate] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]",
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-75",
  "motion-reduce:hover:translate-y-0",
].join(" ");

const variants: Record<Variant, string> = {
  solid:
    "bg-gold text-white hover:bg-gold-dark hover:shadow-[0_10px_24px_-10px_var(--color-gold)] active:bg-gold-dark active:shadow-none",
  outline:
    "border-2 border-gold text-gold hover:bg-gold hover:text-white hover:shadow-[0_10px_24px_-10px_var(--color-gold)] active:shadow-none",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Зовнішні посилання та якорі йдуть звичайним <a>, без локале-префікса. */
  external?: boolean;
};

/**
 * Кнопка-посилання (`.button-main` в оригіналі).
 *
 * Оригінал задавав `width: 320px` жорстко для всіх кнопок незалежно від тексту —
 * англійська версія в таку ширину не завжди вміщалася, а на вузьких екранах
 * кнопка ставала `display: block` на всю ширину. Тут ширина визначається текстом,
 * з мінімальною висотою 52px (touch-таргет).
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external || href.startsWith("#") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type SubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function SubmitButton({ children, disabled, className = "" }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} ${variants.solid} w-full disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
}
