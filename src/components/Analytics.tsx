import Script from "next/script";

const GA_ID = "G-0L4WP43DMT";

/**
 * Google Analytics 4.
 *
 * Încărcat prin `next/script` cu `afterInteractive`, nu cu etichetele brute:
 * scriptul pleacă după ce pagina devine interactivă, deci nu întârzie afișarea.
 *
 * Rulează doar în producție. Altfel, fiecare reîncărcare din timpul
 * dezvoltării ar intra în raport ca vizită reală și ar murdări datele din
 * prima zi.
 *
 * Navigările dintre pagini sunt prinse automat: GA4 urmărește implicit
 * schimbările de istoric, iar linkurile Next fac exact asta.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
