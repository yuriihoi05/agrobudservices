"use client";

import { useCanPlayVideo } from "@/lib/useCanPlayVideo";

type AutoplayVideoProps = {
  src: string;
  /** Опис для тих, хто не бачить відео. */
  description: string;
  className?: string;
};

/**
 * Вбудоване беззвучне відео, що зациклюється, — як у розмітці оригіналу
 * (`autoplay muted playsinline loop`).
 *
 * Монтується лише коли це доречно (див. useCanPlayVideo): на вузьких екранах
 * і при «зменшити рух» замість нього лишається темна плашка, а 22 МБ не
 * качаються. Оригінал вантажив їх завжди.
 */
export function AutoplayVideo({ src, description, className = "" }: AutoplayVideoProps) {
  const canPlay = useCanPlayVideo();

  return (
    <div className={`overflow-hidden rounded-2xl bg-ink-card ${className}`}>
      {canPlay && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={description}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
