"use client";

import { useEffect, useState } from "react";

/**
 * Чи доречно вантажити автовідтворюване відео.
 *
 * Два фільтри: ширина екрана (на мобільному інтернеті кількадесят мегабайт
 * фонового відео — це просто спалені гроші користувача) і системне
 * «зменшити рух». Поки умови не виконані, <video> не монтується взагалі,
 * тож і байти не качаються.
 *
 * Спільний для фонового відео на головній та вбудованого на сторінках
 * виробництва — щоб правило було одне на весь сайт.
 */
export function useCanPlayVideo(): boolean {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setCanPlay(wideEnough.matches && !reducedMotion.matches);

    sync();
    wideEnough.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      wideEnough.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  return canPlay;
}
