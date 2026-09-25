import Link from "next/link";
import SplitReveal from "./ui/SplitReveal";
import Reveal from "./ui/Reveal";
import { ArrowIcon, ButtonLink } from "./ui/ArrowLink";
import { services } from "@/lib/content";

/**
 * Lista de servicii ca rânduri subliniate cu săgeată — structura din al
 * doilea site de referință. Rândul se colorează în rust dinspre stânga la
 * hover, ca să existe o reacție și fără să muți pagina.
 */
export default function Services() {
  return (
    <section id="servicii" className="scroll-mt-24 bg-paper-2 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <p className="section-tag mb-5 text-rust">
                Servicii
              </p>
            </Reveal>
            <SplitReveal as="h2" className="text-h2 font-semibold balance">
              Ce construim, de la fundație până la ultimul detaliu
            </SplitReveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-sm leading-relaxed text-ink-mute md:text-base">
              Executăm lucrarea cap-coadă, cu aceeași echipă de la trasare până
              la predare.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 md:mt-20">
          {services.map((service, i) => (
            <Reveal key={service.title} as="li" delay={0.03 * i}>
              <Link
                href="/#contact"
                className="group relative flex items-start gap-6 overflow-hidden border-t border-ink/12 py-8 md:grid md:grid-cols-12 md:items-baseline md:gap-10 md:py-10"
              >
                <span className="text-xs tabular-nums text-rust md:col-span-1">
                  0{i + 1}
                </span>

                <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-tight tracking-tight transition-[transform,color] duration-500 group-hover:translate-x-2 group-hover:text-rust md:col-span-5">
                  {service.title}
                </h3>

                <p className="hidden max-w-md text-sm leading-relaxed text-ink-mute md:col-span-5 md:block md:text-base">
                  {service.body}
                </p>

                <ArrowIcon className="ml-auto size-6 shrink-0 text-ink-mute transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rust md:col-span-1" />

                {/* linie care se trage de la stânga la hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-rust transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-ink-mute md:text-base">
              Vrei să știi de la început cu ce lucrezi? Am publicat tarifele de
              manoperă, pe fiecare tip de lucrare.
            </p>
            <ButtonLink href="/preturi">Vezi tarifele</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
