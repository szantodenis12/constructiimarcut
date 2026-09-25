"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Întârziere în secunde, pentru stagger manual. */
  delay?: number;
  /** Distanța de pe care urcă elementul. */
  distance?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Reveal simplu la intrarea în viewport: urcă și se estompează.
 *
 * Folosește IntersectionObserver, nu ScrollTrigger — se declanșează o singură
 * dată și nu are nevoie de scrub, deci nu merită costul unui trigger GSAP
 * pentru fiecare bloc de text din pagină.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 28,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translate3d(0, 0, 0)";
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: 0,
        transform: `translate3d(0, ${distance}px, 0)`,
        transition: `opacity 0.9s var(--ease-out-expo) ${delay}s, transform 1.1s var(--ease-out-expo) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
