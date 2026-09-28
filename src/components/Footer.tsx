import Link from "next/link";
import Logo from "./Logo";
import { ArrowIcon } from "./ui/ArrowLink";
import { company, nav, anpc } from "@/lib/content";

/**
 * Subsolul are trei etaje: un îndemn la acțiune pe toată lățimea, patru
 * coloane de informație și o bară de final.
 *
 * Îndemnul stă sus fiindcă jumătatea dreaptă rămânea altfel goală — coloana
 * de contact are puține rânduri până primim telefonul și e-mailul. Linkurile
 * ANPC au coborât în bara de final, ca trimiteri scurte: sunt obligatorii,
 * nu au nevoie de explicații.
 */

const heading = "text-xs uppercase tracking-[0.18em] text-white/40";
const link =
  "text-sm text-white/75 transition-colors duration-300 hover:text-rust-bright";

const SOCIAL_PATHS: Record<string, string> = {
  Facebook:
    "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.56-.14-2.86-.14C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z",
  Instagram:
    "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.22.6 1.77 1.15.56.55.9 1.11 1.16 1.77.24.64.41 1.36.46 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.46 2.43a4.9 4.9 0 0 1-1.16 1.77c-.55.56-1.11.9-1.77 1.16-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.05.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  Google:
    "M21.35 11.1H12v3.2h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95S8.78 6.5 12 6.5c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.96 14.53 3 12 3a9 9 0 1 0 0 18c5.2 0 8.64-3.65 8.64-8.8 0-.59-.06-1.04-.14-1.49l-1.15.39Z",
};

/** Recenziile reale trăiesc pe profilul Google — linkul e drumul spre ele. */
const SOCIAL_LABELS: Record<string, string> = {
  Facebook: "Facebook",
  Instagram: "Instagram",
  Google: "Recenzii pe Google",
};

export default function Footer() {
  const year = new Date().getFullYear();

  const contact = [
    ...company.phones.map((phone) => ({
      label: phone.number,
      href: phone.href,
      // doar numărul secundar poartă etichetă; principalul e cel implicit
      note: phone.role === "Secundar" ? phone.role.toLowerCase() : null,
    })),
    { label: company.email, href: `mailto:${company.email}`, note: null },
  ];

  const socials = [
    { label: "Facebook", href: company.facebook },
    { label: "Instagram", href: company.instagram },
    { label: "Google", href: company.google },
  ];

  return (
    <footer data-nav-theme="light" className="bg-ink text-white">
      <div className="container-page">
        {/* Îndemn la acțiune */}
        <div className="flex flex-col gap-8 border-b border-white/12 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <p className="max-w-xl text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight optical-left">
            Ai un proiect în minte? Hai să vorbim despre el.
          </p>
          <Link
            href="/#contact"
            className="group inline-flex shrink-0 items-center gap-3 self-start bg-rust px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-rust-bright hover:text-ink md:self-auto"
          >
            Cere o ofertă
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Informație */}
        <div className="grid gap-10 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-4">
            <Logo
              variant="full"
              accent="var(--color-rust-bright)"
              className="h-24 w-auto text-white md:h-28"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Lucrări de construcții executate cap-coadă, de la fundație și
              structură până la finisaje.
            </p>

          </div>

          <nav
            aria-label="Navigare subsol"
            className="border-t border-white/12 pt-8 md:col-span-2 md:border-0 md:pt-0"
          >
            <h2 className={heading}>Navigare</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/12 pt-8 md:col-span-3 md:border-0 md:pt-0">
            <h2 className={heading}>Contact</h2>
            <ul className="mt-5 space-y-3">
              {contact.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                  {item.note && (
                    <span className="text-xs text-white/35">{item.note}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Rețelele stau aici, nu sub logo: coloana de contact rămâne
                altfel cu un singur rând până primim telefonul și e-mailul. */}
            <ul className="mt-7 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={SOCIAL_LABELS[social.label]}
                    className="grid size-11 place-items-center border border-white/20 text-white/70 transition-colors duration-300 hover:border-rust-bright hover:text-rust-bright"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-[18px]"
                      aria-hidden="true"
                    >
                      <path d={SOCIAL_PATHS[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/12 pt-8 md:col-span-3 md:border-0 md:pt-0">
            <h2 className={heading}>Date firmă</h2>
            <dl className="mt-5 space-y-3 text-sm text-white/75">
              <div>
                <dt className="sr-only">Denumire</dt>
                <dd>{company.legalName}</dd>
              </div>
              <div>
                <dt className="sr-only">CUI</dt>
                <dd>
                  <span className="text-white/40">CUI</span> {company.cui}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Registrul Comerțului</dt>
                <dd>
                  <span className="text-white/40">Reg. Com.</span>{" "}
                  {company.regCom}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-white/40">Sediu social</dt>
                <dd className="leading-relaxed">{company.address}</dd>
              </div>
              <div>
                <dt className="mb-1 text-white/40">Zonă de lucru</dt>
                <dd className="leading-relaxed">
                  {company.city} și împrejurimi
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bară de final */}
        <div className="flex flex-col gap-5 border-t border-white/12 py-7 text-xs text-white/40 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {company.legalName} Toate drepturile rezervate.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {anpc.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-rust-bright"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-white/30">{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
