"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";
import { ArrowIcon } from "./ui/ArrowLink";
import { contact, company, principles, TODO } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none transition-colors duration-300 placeholder:text-ink-mute/70 focus:border-rust";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? "Trimiterea a eșuat.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Trimiterea a eșuat.");
    }
  }

  const details = [
    { label: "Telefon", value: company.phone, href: company.phoneHref },
    { label: "E-mail", value: company.email, href: `mailto:${company.email}` },
    { label: "Adresă", value: company.address, href: null },
  ].filter((d) => d.value !== TODO);

  return (
    <section id="contact" className="scroll-mt-24 bg-paper-2 py-20 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="section-tag mb-6 text-rust">
              {contact.eyebrow}
            </p>
          </Reveal>
          <SplitReveal as="h2" className="text-h2 font-semibold balance">
            {contact.title}
          </SplitReveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mute md:text-lg">
              {contact.lead}
            </p>
          </Reveal>

          {/* Reia principiile din textul clientului — ține coloana plină și
              înainte ca datele de contact să fie completate. */}
          <Reveal delay={0.16}>
            <ul className="mt-10 space-y-3 border-t border-ink/12 pt-8">
              {principles.map((principle) => (
                <li
                  key={principle.title}
                  className="flex items-baseline gap-3 text-sm text-ink-mute md:text-base"
                >
                  <span className="text-rust">—</span>
                  {principle.title}
                </li>
              ))}
            </ul>
          </Reveal>

          {details.length > 0 && (
            <Reveal delay={0.22}>
              <dl className="mt-10 space-y-5">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-ink-mute">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 text-lg">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="transition-colors duration-300 hover:text-rust"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-7">
              {/* capcană anti-spam: botii completează câmpul, oamenii nu-l văd */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-px w-px opacity-0"
              />

              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.14em] text-ink-mute">
                    Nume
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Numele tău"
                    className={FIELD}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.14em] text-ink-mute">
                    Telefon
                  </span>
                  <input
                    name="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="07xx xxx xxx"
                    className={FIELD}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-ink-mute">
                  E-mail
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nume@exemplu.ro"
                  className={FIELD}
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-ink-mute">
                  Despre ce e vorba
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Casă nouă, renovare, extindere… spune-ne pe scurt."
                  className={`${FIELD} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-rust disabled:opacity-60"
              >
                {status === "sending" ? "Se trimite…" : "Trimite mesajul"}
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <p aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="text-rust">
                    Mesajul a ajuns la noi. Revenim cât putem de repede.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-700">
                    {error} Poți să ne suni direct.
                  </span>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
