"use client";

import { CONSENT_REOPEN } from "@/lib/consent";

/**
 * Redeschide bannerul de consimțământ.
 *
 * Fără el, alegerea rămâne blocată în localStorage pentru șase luni, iar
 * GDPR cere ca retragerea acordului să fie la fel de simplă ca acordarea lui.
 */
export default function ConsentSettingsLink({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN))}
      className={className}
    >
      Setări cookie-uri
    </button>
  );
}
