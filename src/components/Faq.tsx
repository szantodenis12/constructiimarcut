import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";
import { faq } from "@/lib/content";

/**
 * Întrebări frecvente.
 *
 * Marcate ca `<dl>`, nu ca acordeon: răspunsurile sunt scurte, iar un
 * acordeon le-ar ascunde exact de cei care le caută — atât cititori, cât și
 * crawlere. Schema FAQPage corespunzătoare e emisă din StructuredData.
 */
export default function Faq() {
  return (
    <section id="intrebari" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="section-tag mb-6 text-rust">Întrebări frecvente</p>
          </Reveal>
          <SplitReveal as="h2" className="optical-left text-h2 font-semibold balance">
            Ce ne întreabă cel mai des clienții
          </SplitReveal>
        </div>

        <dl className="lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={0.04 * i}>
              <div className="border-t border-ink/12 py-7 md:py-8">
                <dt className="flex items-baseline gap-4 text-h3 font-medium">
                  <span aria-hidden="true" className="text-xs tabular-nums text-rust">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.q}</span>
                </dt>
                <dd className="mt-3 max-w-2xl pl-9 text-sm leading-relaxed text-ink-mute md:text-base">
                  {item.a}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
