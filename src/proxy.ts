import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Визначає локаль запиту: редиректить `/` на `/uk`, поважає `Accept-Language`
 * і cookie NEXT_LOCALE, віддає 404 на невідомий префікс.
 * У Next 16 це конвенція `proxy.ts` (колишній `middleware.ts`).
 */
export default createMiddleware(routing);

export const config = {
  // Пропускаємо все, що не є сторінкою: API, внутрішні файли Next.js
  // і будь-який шлях із крапкою (статика на кшталт /images/footer-texture.png).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
