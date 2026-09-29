"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  CONSENT_REOPEN,
  applyConsent,
  getBannerServerSnapshot,
  getBannerSnapshot,
  readConsent,
  setBannerOpen,
  subscribeBanner,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Bannerul de consimțământ.
 *
 * Apare doar dacă nu există o alegere validă salvată. Cele două butoane au
 * aceeași greutate vizuală, intenționat: un „Accept" colorat lângă un „Refuz"
 * șters e considerat tipar întunecat și anulează valabilitatea acordului.
 *
 * Cât e deschis, marchează `<html>` cu `data-consent-open`, ca butonul de
 * WhatsApp să se dea la o parte — altfel se suprapun pe telefon.
 */
export default function CookieConsent() {
  const open = useSyncExternalStore(
    subscribeBanner,
    getBannerSnapshot,
    getBannerServerSnapshot,
  );

  // Alegerea salvată se aplică o singură dată, la încărcare.
  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
  }, []);

  useEffect(() => {
    const reopen = () => setBannerOpen(true);
    window.addEventListener(CONSENT_REOPEN, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN, reopen);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-consent-open", open);
    return () => document.documentElement.removeAttribute("data-consent-open");
  }, [open]);

  const decide = (choice: ConsentChoice) => {
    writeConsent(choice);
    applyConsent(choice);
    setBannerOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-4 bottom-4 z-[45] max-w-lg border border-white/15 bg-ink p-6 text-white shadow-2xl md:inset-x-auto md:left-8 md:bottom-8 md:p-7"
    >
      <h2 id="consent-title" className="text-h3 font-semibold">
        Cookie-uri
      </h2>
      <p
        id="consent-text"
        className="mt-3 text-sm leading-relaxed text-white/70"
      >
        Folosim Google Analytics ca să vedem câți oameni ne vizitează site-ul și
        ce pagini citesc. Nu rulăm reclame și nu vindem datele nimănui. Fără
        acordul tău, nu se salvează niciun cookie de analiză.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="bg-rust px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-rust-bright hover:text-ink"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
        >
          Refuz
        </button>
      </div>
    </div>
  );
}
