import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { priceGroups, pricingMeta, notIncluded, technicalNote } from "@/lib/pricing";
import { company } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tarife de execuție în Oradea și jud. Bihor",
  description:
    "Tarife de manoperă pentru acoperiș, izolații, pereți și sistem pluvial, în Oradea și județul Bihor. Prețuri nete, fără TVA; materialele nu sunt incluse.",
  alternates: { canonical: "/preturi" },
};

/**
 * Tarifele sunt cel mai concret conținut de pe site: cifre cu unitate de
 * măsură. Marcate ca oferte cu `UnitPriceSpecification`, pot fi citate exact,
 * cu tot cu mențiunea că sunt fără TVA.
 */
function PricingStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/preturi#tarife`,
        name: "Tarife de execuție — Construcții Mărcuț SRL",
        provider: { "@id": `${SITE_URL}/#organizatie` },
        itemListElement: priceGroups.flatMap((group) =>
          group.rows.map((row) => ({
            "@type": "Offer",
            name: row.item,
            category: group.title,
            areaServed: { "@type": "AdministrativeArea", name: "Județul Bihor" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: row.price,
              priceCurrency: pricingMeta.currency,
              unitText: row.unit,
              valueAddedTaxIncluded: pricingMeta.vatIncluded,
            },
          })),
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tarife de execuție",
            item: `${SITE_URL}/preturi`,
          },
        ],
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

export default function PreturiPage() {
  return (
    <>
      <PricingStructuredData />
      <Header />
      <main id="main">
        {/* Antet închis la culoare: headerul are nevoie de un fundal pe care
            logo-ul alb să se vadă, iar pagina pornește direct cu conținut. */}
        <section data-nav-theme="light" className="bg-ink pt-32 pb-16 text-white md:pt-44 md:pb-24">
          <div className="container-page">
            <Reveal>
              <p className="section-tag mb-8 text-rust-bright">Tarife</p>
            </Reveal>

            <SplitReveal
              as="h1"
              className="optical-left max-w-4xl text-display font-semibold"
            >
              Cât costă manopera, pe fiecare tip de lucrare
            </SplitReveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                Tarifele de mai jos sunt pentru execuție. Le publicăm ca să știi
                de la început cu ce lucrezi — fără să fie nevoie să ceri o ofertă
                doar ca să afli ordinul de mărime.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Condițiile trebuie citite înaintea cifrelor, nu sub ele. */}
        <section className="border-b border-ink/12 bg-rust py-10 text-white md:py-12">
          <div className="container-page grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Doar manoperă",
                body: "Prețurile acoperă execuția. Materialele se cumpără separat și nu sunt incluse.",
              },
              {
                title: "Fără TVA",
                body: `Toate cifrele sunt nete, în ${pricingMeta.currency}, pe unitatea de măsură indicată.`,
              },
              {
                title: "Orientative",
                body: "Prețul final depinde de acces, înălțime, complexitate și de starea lucrării existente.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.05 * i}>
                {/* Cifra stă în afara <h2>, nu doar ascunsă cu aria-hidden:
                    aria-hidden curăță arborele de accesibilitate, dar textul
                    rămâne în textContent, deci titlul se citea "01Doar manoperă". */}
                <div className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="text-xs tabular-nums opacity-60">
                    0{i + 1}
                  </span>
                  <h2 className="text-h3 font-semibold">{item.title}</h2>
                </div>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tabelele de preț */}
        <section className="py-20 md:py-28">
          <div className="container-page">
            {priceGroups.map((group) => (
              <div key={group.index} className="mb-16 last:mb-0 md:mb-24">
                <div className="grid gap-6 border-t-2 border-ink pt-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="md:sticky md:top-36">
                      <span className="text-xs font-semibold tabular-nums text-rust">
                        {group.index}
                      </span>
                      <h2 className="optical-left mt-3 text-h2 font-semibold">{group.title}</h2>
                      {group.note && (
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-mute">
                          {group.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <table className="w-full border-collapse text-left">
                      <caption className="sr-only">
                        Tarife de execuție — {group.title}
                      </caption>
                      <thead>
                        <tr className="border-b border-ink/15 text-xs uppercase tracking-[0.14em] text-ink-mute">
                          <th scope="col" className="py-3 pr-4 font-medium">
                            Lucrare
                          </th>
                          <th scope="col" className="py-3 pr-4 font-medium">
                            U.M.
                          </th>
                          <th scope="col" className="py-3 text-right font-medium">
                            Preț
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr
                            key={row.item}
                            className="group border-b border-ink/10 align-baseline transition-colors duration-300 hover:bg-rust-tint"
                          >
                            <th
                              scope="row"
                              className="py-4 pr-4 text-left text-base font-normal md:text-lg"
                            >
                              {row.item}
                            </th>
                            <td className="py-4 pr-4 text-sm text-ink-mute">
                              {row.unit}
                            </td>
                            <td className="py-4 text-right whitespace-nowrap tabular-nums">
                              <span className="text-lg font-semibold md:text-xl">
                                {row.price}
                              </span>
                              <span className="ml-1.5 text-xs text-ink-mute">
                                {pricingMeta.currency}/{row.unit}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            <Reveal>
              <p className="mt-4 border-l-2 border-rust bg-rust-tint px-5 py-4 text-sm leading-relaxed md:text-base">
                <strong className="font-semibold">Recomandare tehnică.</strong>{" "}
                {technicalNote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Ce nu intră în preț */}
        <section data-nav-theme="light" className="bg-ink py-20 text-white md:py-28">
          <div className="container-page grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-36">
                <Reveal>
                  <p className="section-tag mb-6 text-rust-bright">Excluderi</p>
                </Reveal>
                <SplitReveal as="h2" className="optical-left text-h2 font-semibold balance">
                  Ce nu intră în tarifele de mai sus
                </SplitReveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-white/60">
                    Le scriem ca să nu existe surprize la final. Dacă ai nevoie
                    de oricare dintre ele, le putem include — le ofertăm separat.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="md:col-span-7">
              <ol className="border-t border-white/15">
                {notIncluded.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-5 border-b border-white/15 py-4 text-sm leading-relaxed text-white/75 md:text-base"
                  >
                    <span className="shrink-0 tabular-nums text-rust-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper-2 py-20 md:py-28">
          <div className="container-page max-w-3xl">
            <SplitReveal as="h2" className="optical-left text-h2 font-semibold balance">
              Vrei un preț pentru lucrarea ta?
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-ink-mute md:text-lg">
                Spune-ne ce ai de făcut și cu ce suprafețe lucrăm. Îți întocmim
                o ofertă pe cantități reale, cu tot ce intră și ce nu intră în
                preț, scris negru pe alb.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/#contact">Cere o ofertă</ButtonLink>
                <ButtonLink href="/#servicii" variant="outline">
                  Vezi toate serviciile
                </ButtonLink>
              </div>
            </Reveal>
            <p className="mt-10 text-xs text-ink-mute">
              Tarife actualizate în {pricingMeta.updated}. {company.legalName}{" "}
              își rezervă dreptul de a le modifica.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
