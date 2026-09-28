import { company, services, faq } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Date structurate (JSON-LD) pentru toată pagina principală.
 *
 * Un singur bloc `@graph`, cu noduri legate prin `@id`: motoarele văd o
 * singură entitate „Construcții Mărcuț", nu trei obiecte fără legătură.
 *
 * NU conține `aggregateRating`, deși firma are recenzii reale pe Google.
 * Google interzice marcarea propriilor recenzii pe site-ul propriu
 * („self-serving reviews"), iar încălcarea poate atrage o penalizare
 * manuală. Profilul Google e legat prin `sameAs` — asta e varianta corectă.
 */
export default function StructuredData() {
  const phone = company.phones[0].href.replace("tel:", "");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
        "@id": `${SITE_URL}/#organizatie`,
        name: company.name,
        legalName: company.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-full.svg`,
        image: `${SITE_URL}/images/casa-finalizata-amurg.jpg`,
        description:
          "Firmă de construcții din Oradea, județul Bihor, activă din 2003. Case la roșu și la cheie, structuri pe cadre de lemn, fundații, șarpante, învelitori, renovări și finisaje.",
        foundingDate: company.foundingDate,
        vatID: "RO15546079",
        taxID: "15546079",
        identifier: company.regCom,
        telephone: phone,
        email: company.email,
        currenciesAccepted: "RON",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Str. Henrik Ibsen nr. 3, bl. AN 2, et. 1, ap. 6",
          addressLocality: "Oradea",
          addressRegion: "Bihor",
          postalCode: "410241",
          addressCountry: "RO",
        },
        areaServed: [
          { "@type": "City", name: "Oradea" },
          { "@type": "AdministrativeArea", name: "Județul Bihor" },
        ],
        sameAs: [company.facebook, company.instagram, company.google],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicii de construcții",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.body,
              areaServed: { "@type": "AdministrativeArea", name: "Județul Bihor" },
              provider: { "@id": `${SITE_URL}/#organizatie` },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.legalName,
        inLanguage: "ro-RO",
        publisher: { "@id": `${SITE_URL}/#organizatie` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
