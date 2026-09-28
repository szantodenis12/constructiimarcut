import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";
import { values } from "@/lib/content";

export default function Values() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="section-tag mb-6 text-rust">
              {values.eyebrow}
            </p>
          </Reveal>
          <SplitReveal as="h2" className="optical-left text-h2 font-semibold balance">
            {values.title}
          </SplitReveal>
        </div>

        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {values.items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <dt className="flex items-baseline gap-3 text-h3 font-medium">
                <span className="text-sm tabular-nums text-rust">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-mute md:text-base">
                {item.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
