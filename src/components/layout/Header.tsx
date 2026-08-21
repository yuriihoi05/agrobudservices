"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { navLinks, phones, type NavLink } from "@/lib/site";
import { ChevronDownIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

/**
 * Хедер лежить ПОВЕРХ контенту тільки там, де під ним справді є повноекранний
 * hero, розрахований на це, — тобто на головній.
 *
 * Список саме overlay-маршрутів, а не solid: overlay — це виняток, який
 * потребує спеціально підготовленої секції під собою. Раніше було навпаки,
 * і кожна нова сторінка за замовчуванням отримувала прозорий хедер, який
 * накривав верх її першої секції (на /catalog під нього ховались хлібні крихти).
 */
const OVERLAY_HEADER_ROUTES = new Set(["/"]);

type HeaderProps = {
  /**
   * "overlay" — хедер лежить поверх hero-секції (як на більшості сторінок оригіналу),
   * "solid" — хедер у потоці з темним фоном. За замовчуванням визначається по маршруту.
   */
  variant?: "overlay" | "solid";
};

export function Header({ variant }: HeaderProps) {
  const t = useTranslations("header");
  // `usePathname` з @/i18n/navigation повертає шлях БЕЗ префікса локалі,
  // тож порівняння з href у navLinks працює однаково для /uk і /en.
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const resolvedVariant =
    variant ?? (OVERLAY_HEADER_ROUTES.has(pathname) ? "overlay" : "solid");

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Мобільне меню закривається при переході на іншу сторінку. Коригуємо стан
  // під час рендеру, а не в ефекті — так меню не встигає блимнути відкритим.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMenuOpen(false);
  }

  // Блокуємо скрол сторінки під відкритим меню (в оригіналі це робив
  // сторонній скрипт Finsweet scrolldisable) і повертаємо його при закритті.
  useEffect(() => {
    if (!isMenuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    // Компенсуємо ширину скролбара, щоб контент під меню не «стрибав».
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = "";
    };
  }, [isMenuOpen]);

  // Escape закриває меню, фокус повертається на кнопку-гамбургер.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      className={[
        "z-50 w-full border-b border-white/10 text-white",
        "supports-[backdrop-filter]:backdrop-blur-lg",
        resolvedVariant === "overlay"
          ? "absolute inset-x-0 top-0 bg-black/40 lg:bg-transparent"
          : "relative bg-ink",
        // Поки меню відкрите — прозорий хедер мусить стати темним, інакше він
        // накладається на білу панель меню. Для solid це не потрібно.
        isMenuOpen && resolvedVariant === "overlay" ? "bg-ink lg:bg-transparent" : "",
      ].join(" ")}
    >
      <div className="container-page flex items-center justify-between gap-4 py-2.5 lg:h-25 lg:py-0">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            aria-label={t("homeLink")}
            aria-current={pathname === "/" ? "page" : undefined}
            className="focus-ring -m-1 flex items-center rounded-sm p-1 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="h-auto w-25 lg:w-[157px]" />
          </Link>

          {/* На вузьких екранах телефони поруч із логотипом стискали хедер —
              там вони доступні всередині мобільного меню. */}
          <div className="hidden flex-col sm:flex">
            {phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="focus-ring rounded-sm px-1 text-sm font-medium whitespace-nowrap text-white transition-colors duration-200 hover:text-gold lg:text-base"
              >
                {phone.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t("mainNavigation")} className="hidden h-full items-center lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.messageKey} link={link} pathname={pathname} />
            ) : (
              <DesktopLink key={link.href} link={link} pathname={pathname} />
            ),
          )}
          <LanguageSwitcher className="ml-2.5 xl:ml-5" />
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          className="focus-ring -mr-2 flex size-11 shrink-0 items-center justify-center rounded-sm lg:hidden"
        >
          <span className="relative flex h-4.5 w-6.25 flex-col justify-between" aria-hidden="true">
            <span
              className={`h-0.5 w-full origin-center rounded-full bg-gold transition-transform duration-300 ease-out ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded-full bg-gold transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full origin-center rounded-full bg-gold transition-transform duration-300 ease-out ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <MobileMenu id={menuId} isOpen={isMenuOpen} pathname={pathname} />
    </header>
  );
}

function DesktopLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const t = useTranslations("nav");
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      className={`focus-ring flex h-25 items-center border-b-2 px-1.5 text-base whitespace-nowrap transition-colors duration-200 hover:border-gold xl:px-2.5 ${
        isActive ? "border-gold text-white" : "border-transparent text-white/90 hover:text-white"
      }`}
    >
      {t(link.messageKey)}
    </Link>
  );
}

/**
 * Дропдаун «Про компанію». В оригіналі він був у розмітці, але прихований
 * (`.navbar-menu-dropdown { display: none }`), через що сторінка «Звітність»
 * не мала жодного посилання в навігації. Повертаємо його робочим:
 * відкривається наведенням, кліком і з клавіатури.
 */
function DesktopDropdown({ link, pathname }: { link: NavLink; pathname: string }) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const children = link.children ?? [];
  const isActive = children.some((child) => child.href === pathname);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-25"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={listId}
        className={`focus-ring flex h-25 items-center gap-1 border-b-2 px-1.5 text-base whitespace-nowrap transition-colors duration-200 hover:border-gold xl:px-2.5 ${
          isActive ? "border-gold text-white" : "border-transparent text-white/90 hover:text-white"
        }`}
      >
        {t(link.messageKey)}
        <ChevronDownIcon
          className={`size-5 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Меню лишається в DOM, щоб перехід був плавним, а не миготів. */}
      <div
        id={listId}
        className={`absolute top-full left-1/2 z-10 w-57 -translate-x-1/2 rounded-md border border-ink-line bg-ink-soft/98 p-2 shadow-[0_12px_16px_-4px_rgba(0,0,0,0.35)] transition duration-200 supports-[backdrop-filter]:backdrop-blur-lg ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                tabIndex={isOpen ? undefined : -1}
                aria-current={pathname === child.href ? "page" : undefined}
                className={`focus-ring flex min-h-11 items-center rounded-sm px-2.5 font-semibold transition-colors duration-200 hover:bg-ink-line ${
                  pathname === child.href ? "text-gold" : "text-white"
                }`}
              >
                {t(child.messageKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({
  id,
  isOpen,
  pathname,
}: {
  id: string;
  isOpen: boolean;
  pathname: string;
}) {
  const t = useTranslations();

  return (
    <div
      id={id}
      // max-height + overflow: на низьких екранах (альбомна орієнтація)
      // оригінальне меню обрізалося без можливості доскролити.
      className={`absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height-mobile))] overflow-y-auto overscroll-contain bg-white text-ink transition-[opacity,transform] duration-300 ease-out lg:hidden ${
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
      inert={!isOpen}
    >
      <nav aria-label={t("header.mobileNavigation")} className="flex flex-col py-2.5 pb-10">
        {navLinks.map((link) =>
          link.children ? (
            <div key={link.messageKey} className="flex flex-col">
              <span className="px-5 pt-4.5 pb-1 text-center text-sm font-medium tracking-wide text-grey uppercase">
                {t(`nav.${link.messageKey}`)}
              </span>
              {link.children.map((child) => (
                <MobileLink key={child.href} link={child} pathname={pathname} />
              ))}
            </div>
          ) : (
            <MobileLink key={link.href} link={link} pathname={pathname} />
          ),
        )}

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-gainsboro pt-5">
          {phones.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="focus-ring flex min-h-11 items-center rounded-sm px-4 text-lg font-medium text-ink transition-colors duration-200 hover:text-gold"
            >
              {phone.label}
            </a>
          ))}
        </div>

        <LanguageSwitcher className="mt-5 self-center" />
      </nav>
    </div>
  );
}

function MobileLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const t = useTranslations("nav");
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      className={`focus-ring flex min-h-11 items-center justify-center px-5 py-4.5 text-center text-[22px] leading-tight transition-colors duration-200 hover:text-gold ${
        isActive ? "text-gold" : "text-ink"
      }`}
    >
      {t(link.messageKey)}
    </Link>
  );
}
