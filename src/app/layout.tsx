import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/site";
import { company } from "@/lib/content";
import "./globals.css";

/**
 * Archivo, familie variabilă cu axă de lățime.
 *
 * Titlurile stau pe varianta lărgită (font-stretch 112%): ocupă lățimea cu
 * autoritate, potrivit unei firme de construcții, și se distanțează clar de
 * grotesk-ul îngust folosit peste tot în site-urile de agenție.
 */
const archivo = Archivo({
  // latin-ext aduce diacriticele românești (ă â î ș ț)
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.legalName} — Construcții case și renovări în Oradea, Bihor`,
    template: `%s — ${company.name}`,
  },
  description:
    "Firmă de construcții din Oradea, județul Bihor, activă din 2003. Case la roșu și la cheie, structuri pe cadre de lemn, fundații, șarpante, învelitori, renovări și finisaje. Tarife de manoperă publicate.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: company.legalName,
    title: `${company.legalName} — Construcții case și renovări în Oradea`,
    description:
      "Firmă de construcții din Oradea, jud. Bihor, activă din 2003. De la fundație și structură până la finisaje.",
    images: [{ url: "/images/casa-finalizata-amurg.jpg", width: 1536, height: 1024 }],
  },
  icons: {
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#17140f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={archivo.variable}>
      <body className="antialiased">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Sari la conținut
        </a>
        {children}
        <WhatsAppButton />
        <StructuredData />
      </body>
    </html>
  );
}
