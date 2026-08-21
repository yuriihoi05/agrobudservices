import type { routing } from "@/i18n/routing";
import type messages from "../messages/uk.json";

/**
 * Типізація next-intl: ключі перекладів і список локалей перевіряються
 * компілятором. uk.json — еталон, тож відсутній ключ в en.json або
 * друкарська помилка в `t("...")` впадуть на `tsc`, а не в рантаймі.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
