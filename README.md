# Construcții Mărcuț SRL — site de prezentare

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP ScrollTrigger + SplitText · Lenis

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Pagini

| Rută | Ce conține |
|---|---|
| `/` | Hero, Despre noi, bandă cu slogan, principii, servicii, lucrări, proces, valori, contact |
| `/preturi` | Tarifele de execuție + lista de excluderi |
| `/api/contact` | Primește formularul de contact (Resend) |

## Ce e făcut

- Logo vectorizat din JPEG-ul clientului în SVG cu fundal transparent, recolorat
  din auriu în portocaliul brandului (vezi `brand/`).
- 22 de imagini triate, redimensionate și curățate de EXIF (fără date GPS).
- Scroll lin + parallax pe fiecare imagine, titluri care urcă pe linii
  (SplitText), panouri sticky care se suprapun, galerie orizontală cu pin.
  Totul se dezactivează la `prefers-reduced-motion`.

## Limbaj vizual

Site-ul are identitate proprie, construită pe trei decizii:

1. **Colțuri drepte peste tot.** Construcția e unghi drept, nu pastilă.
2. **Hârtie caldă, nu alb/negru neutru.** Arată a planșă de execuție.
3. **Archivo lărgit** (`font-stretch: 112%`) pe titluri — monumental, nu
   grotesk îngust de agenție.

| Token | Valoare | Unde |
|---|---|---|
| `--color-ink` | `#17140F` | negru cald: text, secțiuni închise |
| `--color-paper` / `--color-paper-2` | `#F7F4EF` / `#EBE5DA` | fundaluri |
| `--color-rust` | `#C1501B` | accent principal |
| `--color-rust-deep` | `#8A3711` | hover, al treilea panou |
| `--color-rust-bright` | `#E97B3C` | accent pe fundal închis |

Definite în `src/app/globals.css`.

### Sistemul de fotografie

Două tratamente, aplicate la build-ul imaginilor:

- **color** — lucrări finalizate și randări 3D: grade discret, rămân color;
- **duotone cald** — poze brute de șantier: ascunde cerul ars, tricourile
  colorate și mizeria, și le face să arate ca o decizie, nu ca un accident.

### De unde vine designul

Structura de secțiuni urmează rnbprojects.co.nz; tipografia mare, parallax-ul
și panourile sticky colorate urmează gerdingbuilders.com. Fontul referinței
(Neue Haas Grotesk Display) e licențiat Adobe.

## Date de identificare

Preluate din registrul ANAF (interogare după CUI 15546079), nu de pe un
agregator — se pot reverifica oricând la `webservicesp.anaf.ro`:

| | |
|---|---|
| Denumire | Construcții Mărcuț S.R.L. |
| CUI | RO 15546079 (plătitor TVA din 30.06.2003) |
| Reg. Com. | J05/817/2003 |
| Sediu social | Str. Henrik Ibsen nr. 3, bl. AN 2, et. 1, ap. 6, Oradea, jud. Bihor, 410241 |
| Înregistrat | 26.06.2003 · firmă activă |
| CAEN principal | 4312 — Lucrări de pregătire a terenului |

**De discutat:** CAEN-ul principal declarat este 4312 (pregătirea terenului),
nu 4120 (construcții rezidențiale). Nu apare pe site, dar merită clarificat cu
clientul dacă are CAEN-uri secundare care acoperă ce prezentăm.

## Protecția consumatorului

În subsol sunt linkurile ANPC: [SAL](https://www.anpc.ro/sal) și
[eServicii / reclamații](https://eservicii.anpc.ro/).

Platforma europeană **SOL/ODR nu este linkată intenționat**: și-a încetat
activitatea la 20.07.2025, prin Regulamentul (UE) 2024/3228. Multe site-uri
românești încă o afișează, dar linkul e mort.

## ⚠ Adresa de e-mail este provizorie

`contact@constructiimarcut.ro` (în `src/lib/content.ts`) este **doar presupusă**.
Depinde de un domeniu care încă nu e cumpărat și de o căsuță care nu există:
până atunci, orice mesaj trimis acolo se pierde.

Trei locuri trebuie schimbate în același timp când se stabilește adresa reală:

1. `company.email` — `src/lib/content.ts` (adresa afișată pe site)
2. `SITE_URL` — `src/app/layout.tsx` (momentan tot `constructiimarcut.ro`)
3. `CONTACT_TO` — `.env.local` (unde ajung mesajele din formular, setat separat)

## Ce mai trebuie de la client

- [ ] confirmarea domeniului și a adresei de e-mail (vezi mai sus)
- [ ] cheile Resend, ca formularul de contact să trimită efectiv

De confirmat cu clientul:

- [ ] **Lista de servicii** din `src/lib/content.ts` e dedusă din pozele primite.
- [ ] **Etapele procesului** — la fel.
- [ ] **Tarifele din `/preturi`** — vezi secțiunea dedicată mai jos.
- [ ] Nu există testimoniale reale, deci nu am pus secțiune de testimoniale.
- [ ] Nu am inventat cifre (ani de experiență, număr de lucrări).

## Prețuri — ce s-a publicat și ce nu

Sursa e `D:\constructii reni\OFERTA DE PRET FINAL.pdf`. **Nu este o listă de
prețuri publică**, ci oferta pentru o lucrare anume (acoperiș A-frame).

Pe site au ajuns **doar prețurile unitare**, singurele care au sens ca tarif
public. Au fost lăsate deoparte, intenționat:

- cantitățile măsurate — descriu clădirea clientului;
- subtotalurile și valoarea totală a acelui contract;
- termenul de începere și durata de execuție convenite.

Sunt date comerciale ale unui client, nu informații de prezentare.

**De întrebat clientul:** sunt acestea tarifele lui standard sau au fost
negociate pentru lucrarea respectivă? Dacă e a doua variantă, cifrele din
`src/lib/pricing.ts` trebuie înlocuite înainte de lansare.

Tarifele acoperă doar **manopera**, sunt **fără TVA**, iar materialele apar pe
lista de excluderi — toate trei sunt scrise vizibil pe pagină, deasupra
tabelelor.

## Formular de contact

`src/app/api/contact/route.ts` trimite prin Resend. Până când variabilele nu
sunt setate, ruta răspunde `503` cu mesaj explicit — intenționat, ca să nu
înghită lead-uri în tăcere.

```bash
# .env.local
RESEND_API_KEY=...
CONTACT_TO=adresa@clientului.ro
CONTACT_FROM=site@domeniul-clientului.ro   # domeniu verificat în Resend
```

## Poze

Sursele sunt în `D:\constructii reni`. Din cele 61 am exclus: două poze
personale de familie, un desen tehnic de gard și un screenshot de telefon.
Restul sunt în `public/images/`, redenumite după conținut.

Ce lipsește: poze cu **case finalizate**. Avem doar două (`casa-finalizata-*`)
plus două randări 3D. Secțiunea Lucrări se va simți subțire până când clientul
mai trimite.
