"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/lib/content";

/**
 * Banda cu sloganul firmei, pe toată lățimea, în portocaliul brandului.
 *
 * Ține locul unei benzi derulante: aceeași funcție de respiro între secțiuni,
 * dar cu sloganul din logo în locul unei liste care trece în buclă. Cele două
 * jumătăți ale sloganului intră din direcții opuse, legate de scroll.
 */
export default function StatementBand() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-statement-a]",
        { xPercent: -8 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        "[data-statement-b]",
        { xPercent: 8 },
        {
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const [first, second] = company.tagline.split(". ");

  return (
    <div
      ref={rootRef}
      data-nav-theme="light"
      className="overflow-hidden bg-rust py-16 text-white md:py-24"
    >
      <p className="sr-only">{company.tagline}</p>
      <div aria-hidden="true" className="space-y-1 md:space-y-2">
        <span
          data-statement-a
          className="block whitespace-nowrap text-center text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[1] tracking-[-0.02em]"
        >
          {first}.
        </span>
        <span
          data-statement-b
          className="block whitespace-nowrap text-center text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[1] tracking-[-0.02em] text-white/45"
        >
          {second}
        </span>
      </div>
    </div>
  );
}
