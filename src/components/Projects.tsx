"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./ui/SplitReveal";
import { projects } from "@/lib/content";

/**
 * Galerie orizontală cu pin: secțiunea rămâne fixă, iar scroll-ul vertical
 * împinge cardurile lateral.
 *
 * Grila clasică lăsa goluri pe desktop și nu aducea nicio mișcare. Aici
 * imaginile ocupă toată lățimea ecranului și scroll-ul devine el însuși
 * animația. Sub `lg` renunțăm la pin și lăsăm swipe orizontal nativ — pe
 * telefon un pin lung se simte ca un site blocat.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lucrari"
      className="scroll-mt-24 overflow-hidden bg-paper py-20 lg:h-screen lg:py-0"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="container-page shrink-0 lg:pt-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-tag mb-5 text-rust">
                Lucrări
              </p>
              <SplitReveal as="h2" className="optical-left text-h2 font-semibold balance">
                Lucrări finalizate și proiecte în execuție
              </SplitReveal>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-mute md:text-base">
              O parte din ce am construit și din ce urmează să construim.
            </p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto px-5 pb-4 md:px-12 lg:overflow-visible lg:px-16 lg:pb-0"
          >
            {projects.map((project, i) => (
              <figure
                key={project.title}
                className="w-[78vw] shrink-0 sm:w-[54vw] lg:w-[38vw] xl:w-[32vw]"
              >
                <div className="media-frame relative aspect-[4/3]">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 78vw"
                    className="object-cover"
                  />
                </div>
                {/* Totul aliniat la stânga: cu meta împins la dreapta cardului,
                    părea că eticheta aparține cardului următor. */}
                <figcaption className="mt-4">
                  <h3 className="flex items-baseline gap-3 text-base font-medium md:text-lg">
                    <span className="text-xs tabular-nums text-rust">
                      0{i + 1}
                    </span>
                    {project.title}
                  </h3>
                  <span className="mt-1 block pl-7 text-xs uppercase tracking-[0.14em] text-ink-mute">
                    {project.meta}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
