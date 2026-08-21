"use client";

import { useCanPlayVideo } from "@/lib/useCanPlayVideo";

type HeroVideoProps = {
  poster: string;
  description: string;
};

/**
 * Фонове відео hero-секції.
 *
 * Оригінал безумовно вантажив ~29 МБ відео на кожному пристрої, включно з
 * мобільним інтернетом, і ігнорував системне «зменшити рух». Умови перевіряє
 * спільний хук useCanPlayVideo; поки вони не виконані, лишається постер,
 * який усе одно є фоном секції.
 */
export function HeroVideo({ poster, description }: HeroVideoProps) {
  if (!useCanPlayVideo()) return null;

  return (
    <video
      className="absolute inset-0 -z-10 size-full object-cover"
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="none"
      aria-label={description}
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
