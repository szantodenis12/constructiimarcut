import Link from "next/link";
import Logo from "./Logo";
import { company, nav, TODO } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  const legal = [
    company.cui !== TODO ? `CUI ${company.cui}` : null,
    company.regCom !== TODO ? `Reg. Com. ${company.regCom}` : null,
  ].filter(Boolean);

  const socials = [
    { label: "Facebook", href: company.facebook },
    { label: "Instagram", href: company.instagram },
  ].filter((s) => s.href !== TODO);

  const hasContactDetails = [company.phone, company.email, company.address].some(
    (value) => value !== TODO,
  );

  return (
    <footer data-nav-theme="light" className="bg-ink pt-16 pb-10 text-white md:pt-24">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo
              variant="full"
              accent="var(--color-rust-bright)"
              className="h-28 w-auto text-white md:h-32"
            />
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label="Navigație subsol">
            <h2 className="text-xs uppercase tracking-[0.14em] text-white/45">
              Navigare
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors duration-300 hover:text-rust-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            {hasContactDetails && (
              <h2 className="text-xs uppercase tracking-[0.14em] text-white/45">
                Contact
              </h2>
            )}
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {company.phone !== TODO && (
                <li>
                  <a
                    href={company.phoneHref}
                    className="transition-colors duration-300 hover:text-rust-bright"
                  >
                    {company.phone}
                  </a>
                </li>
              )}
              {company.email !== TODO && (
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="transition-colors duration-300 hover:text-rust-bright"
                  >
                    {company.email}
                  </a>
                </li>
              )}
              {company.address !== TODO && <li>{company.address}</li>}
            </ul>

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/80 transition-colors duration-300 hover:text-rust-bright"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}
            {legal.length > 0 && ` · ${legal.join(" · ")}`}
          </p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
