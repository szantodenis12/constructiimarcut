"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "lines" pentru titluri, "words" pentru paragrafe. */
  type?: "lines" | "words";
  delay?: number;
  /** Pornește imediat, nu la intrarea în viewport (pentru hero). */
  immediate?: boolean;
};

/**
 * Titluri care urcă linie cu linie din spatele unei măști.
 *
 * `mask` lasă SplitText să înfășoare fiecare linie într-un element cu
 * overflow hidden — fără el, linia însăși e containerul și nu se mai vede
 * nimic tăiat. `autoSplit` re-taie liniile la resize și după ce se încarcă
 * fontul, altfel măștile rămân pe pozițiile vechi.
 */
export default function SplitReveal({
  children,
  as: Tag = "div",
  className = "",
  type = "lines",
  delay = 0,
  immediate = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = SplitText.create(el, {
      type,
      mask: type,
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { opacity: 1 });
        return gsap.from(type === "lines" ? self.lines : self.words, {
          yPercent: 110,
          duration: 1.05,
          ease: "expo.out",
          stagger: type === "lines" ? 0.08 : 0.018,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: "top 88%", once: true },
        });
      },
    });

    return () => split.revert();
  }, [type, delay, immediate]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
