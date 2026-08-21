import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Локале-обізнані обгортки над навігацією Next.js. Використовувати ЇХ, а не
 * `next/link` та `next/navigation`: вони самі підставляють префікс локалі,
 * тому в компонентах шляхи пишуться без нього — `/about-us`, а не `/uk/about-us`.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
