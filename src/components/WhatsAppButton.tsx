"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/content";

/**
 * Buton fix de WhatsApp, jos-dreapta, legat de numărul principal.
 *
 * Apare abia după ce omul a derulat peste hero: acolo există deja două
 * butoane mari, iar un al treilea peste ele ar fi doar zgomot.
 *
 * Culorile sunt cele ale brandului, nu verdele WhatsApp — pictograma e
 * oricum recunoscută instant, iar verdele saturat ar tăia paleta caldă a
 * site-ului. Se schimbă dintr-o clasă, dacă preferi verdele oficial.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={company.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Scrie-ne pe WhatsApp la ${company.phones[0].number}`}
      // z-30 îl ține sub overlay-ul meniului (z-40), ca să nu plutească peste el
      className={`wa-fab group fixed right-5 bottom-5 z-30 flex items-center gap-3 bg-ink px-4 py-4 text-white shadow-lg transition-[background-color,opacity,transform] duration-500 ease-out hover:bg-rust md:right-8 md:bottom-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-6 shrink-0"
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.91-9.91a9.85 9.85 0 0 0-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Z" />
      </svg>

      {/* Eticheta apare doar pe ecrane largi: pe telefon ar acoperi conținut. */}
      <span className="hidden text-sm font-medium lg:inline">
        Scrie-ne pe WhatsApp
      </span>
    </a>
  );
}
