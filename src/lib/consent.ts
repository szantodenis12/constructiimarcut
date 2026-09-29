/**
 * Consimțământul pentru cookie-uri de analiză.
 *
 * Site-ul folosește doar Google Analytics, deci decizia e una singură:
 * statistici da sau nu. Semnalele de publicitate rămân refuzate permanent,
 * fiindcă nu rulăm reclame — nu are rost să cerem un acord de care nu avem
 * nevoie.
 */
export const CONSENT_KEY = "cm-consent";

/** Evenimentul prin care subsolul redeschide bannerul. */
export const CONSENT_REOPEN = "cm-consent-reopen";

/**
 * Acordul se recere după șase luni. Nu e o cifră impusă de lege, dar e
 * intervalul pe care autoritățile europene de protecția datelor îl
 * consideră rezonabil, iar un „da" din urmă cu trei ani nu mai înseamnă mare
 * lucru.
 */
export const CONSENT_MAX_AGE_DAYS = 180;

export type ConsentChoice = "granted" | "denied";

type StoredConsent = { choice: ConsentChoice; at: number };

/** Returnează alegerea salvată, sau null dacă lipsește ori a expirat. */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    const ageDays = (Date.now() - parsed.at) / 86_400_000;
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return parsed.choice === "granted" ? "granted" : "denied";
  } catch {
    // localStorage poate arunca în modul privat sau cu cookie-urile blocate;
    // în cazul ăsta tratăm ca „nu s-a ales nimic" și întrebăm din nou.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    const value: StoredConsent = { choice, at: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    // dacă nu putem salva, bannerul va reapărea la următoarea vizită
  }
}

/* ------------------------------------------------------------------ *
 * Starea bannerului, ca sursă externă.
 *
 * Vizibilitatea depinde de localStorage, care nu există pe server. Citită
 * într-un `useState` + `useEffect`, ar produce fie o nepotrivire la hidratare,
 * fie un `setState` în efect. `useSyncExternalStore` e construit exact pentru
 * asta: serverul primește `false`, iar clientul citește valoarea reală abia
 * după hidratare.
 * ------------------------------------------------------------------ */

let bannerOpen: boolean | null = null; // null = încă necitit
const listeners = new Set<() => void>();

export function subscribeBanner(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getBannerSnapshot(): boolean {
  if (bannerOpen === null) bannerOpen = readConsent() === null;
  return bannerOpen;
}

/** Pe server nu există localStorage, deci bannerul nu se randează. */
export function getBannerServerSnapshot(): boolean {
  return false;
}

export function setBannerOpen(open: boolean) {
  bannerOpen = open;
  listeners.forEach((listener) => listener());
}

/** Transmite alegerea către Google Consent Mode. */
export function applyConsent(choice: ConsentChoice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: choice,
    // rămân refuzate: site-ul nu rulează reclame
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
