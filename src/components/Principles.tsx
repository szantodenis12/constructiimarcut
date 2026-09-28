import Image from "next/image";
import { principles } from "@/lib/content";

/**
 * Panouri care se suprapun la scroll (sticky stacking) — efectul din primul
 * site de referință. Pe mobil devin carduri normale, una sub alta.
 *
 * Textul stă în treimea de sus, nu jos: panourile se acoperă de jos în sus,
 * iar un titlu lipit de marginea de jos era mâncat de panoul următor înainte
 * să apuci să-l citești. Cifra uriașă ocupă restul, ca în referință.
 */

const SURFACES = [
  "bg-rust text-white",
  "bg-ink text-white",
  "bg-rust-deep text-white",
];

export default function Principles() {
  return (
    <section
      aria-label="Principiile noastre"
      data-nav-theme="light"
      className="relative"
    >
      {principles.map((item, i) => (
        <article
          key={item.index}
          className="lg:sticky lg:top-0 lg:h-screen"
          style={{ zIndex: i + 1 }}
        >
          <div className="grid lg:h-full lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div
              className={`relative flex flex-col overflow-hidden p-8 md:p-14 lg:p-16 ${SURFACES[i % SURFACES.length]}`}
            >
              <span className="text-sm font-medium tabular-nums opacity-60">
                {item.index}
              </span>

              <div className="relative z-10 mt-10 lg:mt-16">
                <h3 className="optical-left text-h2 font-semibold balance">{item.title}</h3>
                <p className="mt-5 max-w-md text-base leading-relaxed opacity-80 md:text-lg">
                  {item.body}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 right-6 select-none text-[14rem] font-semibold leading-none tracking-tighter opacity-12 lg:text-[20rem]"
              >
                {item.index}
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
