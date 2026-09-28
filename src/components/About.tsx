import SplitReveal from "./ui/SplitReveal";
import Reveal from "./ui/Reveal";
import RevealImage from "./ui/RevealImage";
import { ButtonLink } from "./ui/ArrowLink";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="despre" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="section-tag mb-8 text-rust">
            {about.eyebrow}
          </p>
        </Reveal>

        {/* Titlul ocupă toată lățimea — varianta pe o treime lăsa dreapta goală. */}
        <SplitReveal
          as="h2"
          className="optical-left text-[clamp(2.25rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        >
          {about.title}
        </SplitReveal>

        {/* Definiția firmei, ca prim paragraf vizibil după titlu: cine, ce,
            unde, din când — formulată ca să poată fi citată ca atare. */}
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink md:mt-10 md:text-xl">
            {about.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {about.body.map((paragraph, i) => (
            <Reveal key={paragraph} delay={0.06 * i} as="p" className="text-base leading-relaxed text-ink-mute md:text-lg">
              {paragraph}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10">
            <ButtonLink href={about.cta.href}>{about.cta.label}</ButtonLink>
          </div>
        </Reveal>
      </div>

      <div className="container-page mt-16 md:mt-24">
        <RevealImage
          src={about.image.src}
          alt={about.image.alt}
          strength={11}
          sizes="100vw"
          className="aspect-[4/3] md:aspect-[16/7]"
        />
      </div>
    </section>
  );
}
