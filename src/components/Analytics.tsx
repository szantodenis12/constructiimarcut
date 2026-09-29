import Script from "next/script";

const GA_ID = "G-0L4WP43DMT";

/**
 * Google Analytics 4 cu Consent Mode v2.
 *
 * Ordinea contează și e motivul pentru care primul bloc e un `<script>` simplu,
 * nu un `next/script`: fiind inline și sincron, se execută în timp ce pagina
 * se parsează, deci semnalele de consimțământ ajung în `dataLayer` înaintea
 * oricărei alte comenzi. gtag.js citește coada în ordine când se încarcă, așa
 * că nu poate scrie cookie-uri înainte să afle că sunt refuzate.
 *
 * Totul pleacă din „refuzat". Analytics se activează doar dacă vizitatorul
 * apasă „Accept" în banner, iar semnalele de publicitate rămân refuzate
 * permanent — site-ul nu rulează reclame.
 *
 * Rulează doar în producție, ca reîncărcările din dezvoltare să nu intre în
 * raport ca vizite reale.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  const bootstrap = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
