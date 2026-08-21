import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";

type MediaTextSectionProps = {
  image: { src: string; width: number; height: number };
  imageAlt: string;
  /** Де стоїть зображення на десктопі. На мобільному воно завжди зверху. */
  imageSide?: "left" | "right";
  tone?: "light" | "dark";
  /** Висота зображення на десктопі. */
  imageHeightClass?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Секція «зображення + текст поруч» — спільна основа для лістингу каталогу
 * (ProductFeature) і сторінки кар'єру.
 *
 * У DOM порядок завжди «зображення → текст», сторони міняє лише `lg:order-*`.
 * Завдяки цьому на мобільному кожен блок читається однаково (фото зверху,
 * текст під ним), а не «по діагоналі», як буває, коли чергування зашите
 * в саму розмітку.
 */
export function MediaTextSection({
  image,
  imageAlt,
  imageSide = "right",
  tone = "light",
  imageHeightClass = "lg:h-[28rem]",
  children,
  className = "",
}: MediaTextSectionProps) {
  const imageLeft = imageSide === "left";

  return (
    <section
      className={`py-15 md:py-20 ${tone === "dark" ? "bg-ink-soft text-white" : ""} ${className}`}
    >
      <Reveal className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Image
          src={image.src}
          alt={imageAlt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 1024px) 100vw, 620px"
          className={`h-64 w-full rounded-2xl object-cover shadow-[0_20px_45px_-25px_rgba(0,0,0,0.55)] sm:h-96 ${imageHeightClass} ${
            imageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        />

        <div className={imageLeft ? "lg:order-2" : "lg:order-1"}>{children}</div>
      </Reveal>
    </section>
  );
}
