import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Який тег відрендерити (div за замовчуванням). */
  as?: ElementType;
  /** `stagger` — каскад для прямих дітей (сітки карток, списки). */
  variant?: "block" | "stagger";
  className?: string;
};

/**
 * Обгортка для scroll-reveal. Уся механіка — у класах `.reveal` /
 * `.reveal-stagger` (globals.css), тут лише семантична обгортка, щоб у
 * секціях не розповзалися рядки класів і патерн лишався один на весь сайт.
 *
 * Це серверний компонент: жодного JS у бандл не додає.
 *
 * НЕ використовувати на sticky-елементах — див. коментар у globals.css.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "block",
  className = "",
}: RevealProps) {
  const revealClass = variant === "stagger" ? "reveal-stagger" : "reveal";

  return <Tag className={`${revealClass} ${className}`.trim()}>{children}</Tag>;
}
