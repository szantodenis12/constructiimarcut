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

## Ce mai trebuie de la client

Toate câmpurile marcate `TODO_CLIENT` în `src/lib/content.ts`:

- [ ] telefon (+ varianta `tel:` pentru `phoneHref`)
- [ ] adresă de e-mail pentru cererile din formular
- [ ] adresă / zona în care lucrează
- [ ] CUI și nr. Reg. Com. (obligatorii legal în footer)
- [ ] linkuri Facebook / Instagram
- [ ] domeniul real — de înlocuit `SITE_URL` în `src/app/layout.tsx`

De confirmat cu clientul:

- [ ] **Lista de servicii** din `src/lib/content.ts` e dedusă din pozele primite.
- [ ] **Etapele procesului** — la fel.
- [ ] **Tarifele din `/preturi`** — vezi secțiunea de mai jos.
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
