import type { ProductIcon } from "@/content/catalog";

type IconProps = {
  className?: string;
};

/*
 * Піктограми товарів каталогу — інлайнові SVG з legacy-export.
 * Живуть в ui (а не в sections), бо їх використовують і секція на головній,
 * і лістинг каталогу через спільний ProductCard.
 */

export function SandIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g clipPath="url(#clip0_172_3549)">
      <path d="M59 55.1511H1L20.3673 5L35.7592 40.6766L47.2777 19.8822L59 55.1511Z" stroke="currentColor" strokeWidth="2" />
      </g>
      <defs>
      <clipPath id="clip0_172_3549">
      <rect width="60" height="60" fill="currentColor" />
      </clipPath>
      </defs>
    </svg>
  );
}

export function LimestoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g clipPath="url(#clip0_172_3563)">
      <path d="M1 58.0683V1L14.1606 9.38554L23.3614 31.3976L41.0549 40.5534L59 58.0683H1Z" stroke="currentColor" strokeWidth="2" />
      </g>
      <defs>
      <clipPath id="clip0_172_3563">
      <rect width="60" height="60" fill="currentColor" />
      </clipPath>
      </defs>
    </svg>
  );
}

export function MineralPowderIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8.65053 11.8783L20.3825 15.8619V24.4559L8.65053 27.4153L4.93823 19.4882L8.65053 11.8783Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5776 34.7082L4.93823 35.4893L4 43.2694L12.4555 47.7085L17.3004 43.8736L16.5776 34.7082Z" stroke="currentColor" strokeWidth="2" />
      <path d="M40.4644 11.4555L37.9277 6.4879L32.596 7.65053V11.4555L36.8708 15.2605L40.4644 11.4555Z" stroke="currentColor" strokeWidth="2" />
      <path d="M56.9526 11.1384L52.9362 3H47.263L44.5864 11.1384L48.8142 14.7381L56.9526 11.1384Z" stroke="currentColor" strokeWidth="2" />
      <path d="M26.8309 23.7939L24.6113 31.22L28.8391 35.6591L34.2295 33.1225L36.7661 27.5207L32.7498 23.7939H26.8309Z" stroke="currentColor" strokeWidth="2" />
      <path d="M45.0605 23.2847V27.4153L48.709 35.448L56.7418 31.4317V27.0982L52.8311 23.2847H45.0605Z" stroke="currentColor" strokeWidth="2" />
      <path d="M25.139 47.2858L28.944 54.6846L36.8708 51.6192L40.9929 47.2857L36.8708 43.2694L28.944 43.2694L25.139 47.2858Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ActuLogoIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 84 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M11.6338 4.55127L5.25293 24H0.112793L8.83008 0.539062H12.1011L11.6338 4.55127ZM16.9351 24L10.5381 4.55127L10.0225 0.539062H13.3257L22.0913 24H16.9351ZM16.645 15.2666V19.0532H4.25391V15.2666H16.645ZM37.5762 16.2173H42.394C42.2974 17.7964 41.8623 19.1982 41.0889 20.4229C40.3262 21.6475 39.2573 22.6035 37.8823 23.291C36.5181 23.9785 34.8745 24.3223 32.9517 24.3223C31.4478 24.3223 30.0996 24.0645 28.9072 23.5488C27.7148 23.0225 26.6943 22.2705 25.8457 21.293C25.0078 20.3154 24.3687 19.1338 23.9282 17.748C23.4878 16.3623 23.2676 14.8101 23.2676 13.0913V11.4639C23.2676 9.74512 23.4932 8.19287 23.9443 6.80713C24.4062 5.41064 25.0615 4.22363 25.9102 3.24609C26.7695 2.26855 27.7954 1.5166 28.9878 0.990234C30.1802 0.463867 31.5122 0.200684 32.9839 0.200684C34.939 0.200684 36.5879 0.555176 37.9307 1.26416C39.2842 1.97314 40.3315 2.95068 41.0728 4.19678C41.8247 5.44287 42.2759 6.86084 42.4263 8.45068H37.5923C37.5386 7.50537 37.3506 6.70508 37.0283 6.0498C36.7061 5.38379 36.2173 4.88428 35.562 4.55127C34.9175 4.20752 34.0581 4.03564 32.9839 4.03564C32.1782 4.03564 31.4746 4.18604 30.873 4.48682C30.2715 4.7876 29.7666 5.24414 29.3584 5.85645C28.9502 6.46875 28.644 7.24219 28.4399 8.17676C28.2466 9.10059 28.1499 10.1855 28.1499 11.4316V13.0913C28.1499 14.3052 28.2412 15.374 28.4238 16.2979C28.6064 17.2109 28.8857 17.9844 29.2617 18.6182C29.6484 19.2412 30.1426 19.7139 30.7441 20.0361C31.3564 20.3477 32.0923 20.5034 32.9517 20.5034C33.9614 20.5034 34.7939 20.3423 35.4492 20.02C36.1045 19.6978 36.604 19.2197 36.9478 18.5859C37.3022 17.9521 37.5117 17.1626 37.5762 16.2173ZM55.5747 0.539062V24H50.7568V0.539062H55.5747ZM62.7935 0.539062V4.32568H43.6509V0.539062H62.7935ZM78.5039 0.539062H83.3218V16.04C83.3218 17.8447 82.9351 19.3647 82.1616 20.6001C81.3989 21.8354 80.3408 22.7646 78.9873 23.3877C77.6445 24.0107 76.0977 24.3223 74.3467 24.3223C72.5957 24.3223 71.0381 24.0107 69.6738 23.3877C68.3203 22.7646 67.2568 21.8354 66.4834 20.6001C65.7207 19.3647 65.3394 17.8447 65.3394 16.04V0.539062H70.1733V16.04C70.1733 17.0928 70.3398 17.9521 70.6729 18.6182C71.0059 19.2842 71.4839 19.7729 72.1069 20.0845C72.7407 20.396 73.4873 20.5518 74.3467 20.5518C75.2275 20.5518 75.9741 20.396 76.5864 20.0845C77.2095 19.7729 77.6821 19.2842 78.0044 18.6182C78.3374 17.9521 78.5039 17.0928 78.5039 16.04V0.539062Z" fill="currentColor" />
    </svg>
  );
}

/** Мапа `Product.icon` → компонент. Дані каталогу лишаються без JSX. */
export const productIcons: Record<ProductIcon, (props: IconProps) => React.ReactElement> = {
  sand: SandIcon,
  limestone: LimestoneIcon,
  mineralPowder: MineralPowderIcon,
  actu: ActuLogoIcon,
};

/** ACTU прийшов горизонтальним лого 84×25, решта — квадратні 60×60. */
export const isWordmark = (icon: ProductIcon) => icon === "actu";
