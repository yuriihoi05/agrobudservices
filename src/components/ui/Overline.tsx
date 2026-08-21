type OverlineProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Надзаголовок із золотою рискою (`.greed-for-slogan` + `.line-element`).
 * Риска — суто декоративна, тож не потрапляє в дерево доступності.
 */
export function Overline({ children, className = "" }: OverlineProps) {
  return (
    <p
      className={`flex items-center gap-4 text-lg font-medium sm:text-xl lg:text-2xl ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-0.5 w-9 shrink-0 bg-gold sm:w-15"
      />
      {children}
    </p>
  );
}
