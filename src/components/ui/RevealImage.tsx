"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealImageProps = {
  src: string;
  alt: string;
  /** Cursa parallax, ca procent din înălțimea ramei. */
  strength?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Cortina care descoperă imaginea la intrarea în viewport. */
  curtain?: boolean;
};

/**
 * Imagine cu parallax în ramă + „cortină" la intrare.
 *
 * Imaginea e supradimensionată exact cu cursa parallax, ca rama să nu rămână
 * niciodată cu margini goale la capete. Cortina folosește clip-path pe ramă,
 * nu opacity: descoperirea de jos în sus face mișcarea să pară că imaginea e
 * construită, nu doar afișată.
 */
export default function RevealImage({
  src,
  alt,
  strength = 10,
  className = "",
  priority = false,
  sizes = "100vw",
  curtain = true,
}: RevealImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: strength,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      if (curtain) {
        gsap.fromTo(
          frame,
          { clipPath: "inset(14% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            ease: "expo.out",
            scrollTrigger: { trigger: frame, start: "top 86%", once: true },
          },
        );
        gsap.from(inner, {
          scale: 1.14,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: frame, start: "top 86%", once: true },
        });
      }
    }, frame);

    return () => ctx.revert();
  }, [strength, curtain]);

  const overscan = 100 + strength * 2 + 2;

  return (
    <div ref={frameRef} className={`media-frame relative ${className}`}>
      <div
        ref={innerRef}
        className="absolute left-0 w-full will-change-transform"
        style={{
          height: `${overscan}%`,
          top: `${(100 - overscan) / 2}%`,
          transform: `translateY(${-strength}%)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
