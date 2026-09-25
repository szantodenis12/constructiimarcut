import { NextResponse } from "next/server";

/**
 * Primește mesajele din formularul de contact.
 *
 * Livrarea se face prin Resend. Până când clientul ne dă adresa de e-mail pe
 * care vrea să primească cererile, ruta răspunde cu o eroare explicită — mai
 * bine decât să înghită lead-uri și să pară că funcționează.
 *
 * De configurat în .env.local:
 *   RESEND_API_KEY=...
 *   CONTACT_TO=adresa@clientului.ro
 *   CONTACT_FROM=site@domeniul-clientului.ro   (domeniu verificat în Resend)
 */

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  // Botul a completat capcana — îi răspundem 200 ca să nu reîncerce.
  if (body.website) return NextResponse.json({ ok: true });

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim();

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Completează numele, telefonul și mesajul." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Formularul nu e conectat: lipsesc RESEND_API_KEY / CONTACT_TO / CONTACT_FROM.",
    );
    return NextResponse.json(
      { error: "Formularul nu e încă activ." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.email?.trim() || undefined,
      subject: `Cerere nouă de pe site — ${name}`,
      text: [
        `Nume: ${name}`,
        `Telefon: ${phone}`,
        `E-mail: ${body.email?.trim() || "—"}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend a respins mesajul:", await response.text());
    return NextResponse.json(
      { error: "Nu am putut trimite mesajul." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
