"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import { nav, company } from "@/lib/content";

/**
 * Header minimal, fără bară: doar logo-ul și butonul de meniu.
 *
 * Fiindcă pagina alternează secțiuni albe cu secțiuni negre și rust, culoarea
 * headerului se schimbă singură: secțiunile pe fundal închis sunt marcate cu
 * `data-nav-theme="light"`, iar la scroll verificăm ce secțiune se află sub
 * linia headerului. Fără asta, logo-ul negru dispărea peste secțiunea Proces.
 */
const NAV_LINE = 44;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(true); // hero-ul e închis la culoare
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const hit = sections.find((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top <= NAV_LINE && bottom > NAV_LINE;
      });
      setLight(hit?.dataset.navTheme === "light");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Un singur timeline, construit o dată și rulat înainte la deschidere,
   * înapoi la închidere.
   *
   * Varianta anterioară îl reconstruia la fiecare schimbare de stare și rula
   * doar pe deschidere — de aici lipsa oricărei animații la închidere. În plus,
   * React scria `clipPath` inline pe același element pe care îl anima GSAP;
   * cele două se călcau pe picioare la fiecare frame, de unde sacadarea.
   * Acum stilul inițial e static în JSX, iar mai departe GSAP e singurul
   * care atinge `clipPath` și `visibility`.
   */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const links = overlay.querySelectorAll("[data-menu-item]");
    const aside = overlay.querySelectorAll("[data-menu-aside]");

    const tl = gsap.timeline({
      paused: true,
      onStart: () => gsap.set(overlay, { visibility: "visible", willChange: "clip-path" }),
      onReverseComplete: () =>
        gsap.set(overlay, { visibility: "hidden", willChange: "auto" }),
    });

    tl.fromTo(
      overlay,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.inOut" },
    )
      .fromTo(
        links,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.055 },
        "-=0.34",
      )
      .fromTo(
        aside,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.42",
      );

    timelineRef.current = tl;
    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const tl = timelineRef.current;

    // fără timeline = prefers-reduced-motion: doar apare și dispare
    if (!tl) {
      gsap.set(overlay, {
        visibility: open ? "visible" : "hidden",
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    // La închidere timeline-ul se derulează invers, deci cortina pleacă ultima.
    // Rulat în viteză normală ar dura aproape o secundă; dublând ritmul,
    // ieșirea se încheie în ~0,7s și nu mai pare că stă degeaba.
    if (open) tl.timeScale(1).play();
    else tl.timeScale(2).reverse();
  }, [open]);

  const onLight = light || open;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="container-page flex items-start justify-between py-5 md:py-7">
          <Link
            href="/#top"
            aria-label={company.legalName}
            onClick={() => setOpen(false)}
            className={`pointer-events-auto transition-colors duration-500 ${
              onLight ? "text-white" : "text-ink"
            }`}
          >
            <Logo
              variant="mark"
              accent={
                onLight ? "var(--color-rust-bright)" : "var(--color-rust)"
              }
              className="h-9 w-auto md:h-11"
            />
          </Link>

          {/* Buton pătrat, cu cuvântul scris pe el: utilitar, ca marcajele de
              pe șantier, nu pastila plutitoare pe care o are orice agenție. */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className={`pointer-events-auto flex shrink-0 items-center gap-3 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 md:px-6 ${
              onLight
                ? "bg-white text-ink hover:bg-rust hover:text-white"
                : "bg-ink text-white hover:bg-rust"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-400 ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-400 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
            {open ? "Închide" : "Meniu"}
          </button>
        </div>
      </header>

      {/* Starea inițială e statică: de aici încolo doar GSAP scrie clipPath și
          visibility, altfel React i-ar suprascrie fiecare frame. */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-ink text-white ${open ? "" : "pointer-events-none"}`}
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          visibility: "hidden",
        }}
      >
        <div className="container-page grid h-full grid-cols-1 items-center gap-12 pt-24 lg:grid-cols-12">
          <nav className="lg:col-span-7" aria-label="Meniu principal">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    data-menu-item
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-2 text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.08] tracking-tight transition-colors duration-300 hover:text-rust-bright"
                  >
                    <span className="text-xs font-medium tabular-nums text-white/35">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-menu-aside className="lg:col-span-4 lg:col-start-9">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              {company.legalName}
            </p>
            <p className="mt-4 max-w-xs text-lg leading-snug text-white/70">
              {company.tagline}
            </p>

            {/* În meniu apare doar numărul principal; al doilea ar dilua
                acțiunea exact în momentul în care omul vrea să sune. */}
            <a
              href={company.phones[0].href}
              className="mt-8 block text-2xl transition-colors duration-300 hover:text-rust-bright"
            >
              {company.phones[0].number}
            </a>

            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-block bg-rust px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-rust-bright hover:text-ink"
            >
              Cere o ofertă
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
