"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { hero } from "@/lib/content";

/**
 * Hero pe tot ecranul: imaginea ocupă fereastra întreagă, titlul stă peste ea.
 *
 * Varianta anterioară (titlu pe alb, imagine dedesubt) lăsa jumătatea dreaptă
 * goală pe desktop. Aici nu mai există margine liberă, iar mișcarea începe
 * din prima secundă: imaginea pleacă mărită și se așază, titlul urcă pe linii,
 * iar la scroll imaginea rămâne în urmă și conținutul se ridică.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero-title], [data-hero-fade]", { opacity: 1 });
        return;
      }

      const intro = gsap.timeline();

      intro
        .from("[data-hero-media]", {
          scale: 1.18,
          duration: 1.9,
          ease: "expo.out",
        })
        .from(
          "[data-hero-scrim]",
          { opacity: 0, duration: 1.4, ease: "power2.out" },
          0,
        );

      SplitText.create("[data-hero-title]", {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set("[data-hero-title]", { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 112,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.1,
            delay: 0.35,
          });
        },
      });

      intro.from(
        "[data-hero-fade]",
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
        },
        0.75,
      );

      // La scroll, imaginea rămâne în urmă și conținutul pleacă mai repede.
      gsap.to("[data-hero-media]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-content]", {
        yPercent: -22,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      data-nav-theme="light"
      className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-ink"
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Scrim-ul ține titlul lizibil indiferent cât de luminoasă e fotografia. */}
      <div
        data-hero-scrim
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15"
      />

      <div
        data-hero-content
        className="container-page relative flex h-full flex-col justify-end pb-16 md:pb-20"
      >
        <p
          data-hero-fade
          className="section-tag mb-6 text-rust-bright"
        >
          {hero.eyebrow}
        </p>

        <h1
          data-hero-title
          className="max-w-5xl text-display font-semibold text-white"
          style={{ opacity: 0 }}
        >
          {hero.title.join(" ")}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-fade
            className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {hero.lead}
          </p>

          <div data-hero-fade className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="bg-rust px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-rust-bright hover:text-ink"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="border border-white/35 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
