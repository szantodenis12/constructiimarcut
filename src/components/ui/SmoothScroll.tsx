"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-ul lin (Lenis) care dă senzația de „greutate" din referință,
 * legat de ScrollTrigger ca parallax-ul să fie perfect sincron cu scroll-ul.
 *
 * Fără legătura asta, GSAP citește scrollTop-ul nativ, iar Lenis animă un
 * offset propriu — rezultatul ar fi un parallax care rămâne cu un frame în urmă.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Cine cere mai puțină mișcare primește scroll nativ, fără Lenis.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Ancorele trebuie să treacă tot prin Lenis.
    //
    // Linkurile din meniu sunt absolute („/#despre"), ca să meargă și din
    // paginile secundare. Când ținta e chiar pagina curentă, le oprim aici și
    // facem scroll lin; altfel le lăsăm să navigheze normal.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
