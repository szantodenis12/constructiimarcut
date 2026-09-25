import Reveal from "./ui/Reveal";
import RevealImage from "./ui/RevealImage";
import SplitReveal from "./ui/SplitReveal";
import { process } from "@/lib/content";

/**
 * Etapele lucrării, ilustrate cu pozele reale de pe șantierele lor.
 * Titlurile rămân lipite pe desktop cât timp se derulează imaginea etapei.
 */
export default function Process() {
  return (
    <section id="proces" data-nav-theme="light" className="scroll-mt-24 bg-ink py-20 text-white md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-tag mb-6 text-rust-bright">
              Proces
            </p>
          </Reveal>
          <SplitReveal as="h2" className="text-h2 font-semibold balance">
            Cum arată o lucrare, etapă cu etapă
          </SplitReveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Pozele de mai jos sunt de pe șantierele noastre. Fiecare etapă se
              verifică înainte de a începe următoarea.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 md:mt-24">
          {process.map((stage, i) => (
            <li
              key={stage.step}
              className="grid gap-8 border-t border-white/12 py-12 md:grid-cols-12 md:gap-12 md:py-16"
            >
              <div className="md:col-span-5 lg:col-span-4">
                <div className="md:sticky md:top-36">
                  <Reveal>
                    <span className="text-sm font-medium tabular-nums text-rust-bright">
                      {stage.step}
                    </span>
                    <h3 className="mt-4 text-h3 font-medium">{stage.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
                      {stage.body}
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="md:col-span-7 lg:col-span-8">
                <RevealImage
                  src={stage.image.src}
                  alt={stage.image.alt}
                  strength={10}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
