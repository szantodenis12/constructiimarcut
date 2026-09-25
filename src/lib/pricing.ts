/**
 * Tarife de execuție, extrase din „OFERTA DE PRET FINAL.pdf".
 *
 * ATENȚIE la ce s-a preluat și ce nu:
 *
 * PDF-ul nu este o listă de prețuri publică, ci oferta pentru o lucrare
 * anume (acoperiș A-frame). Pe site au fost preluate DOAR prețurile unitare
 * — singurele care au sens ca tarif public.
 *
 * Au fost lăsate deoparte, intenționat:
 *   - cantitățile măsurate — descriu clădirea clientului;
 *   - subtotalurile și valoarea totală a acelui contract;
 *   - termenul de începere și durata de execuție convenite.
 *
 * Toate sunt date comerciale ale unui client, nu informații de prezentare.
 *
 * DE CONFIRMAT CU CLIENTUL: sunt acestea tarifele lui standard sau au fost
 * negociate pentru lucrarea respectivă? Dacă e a doua variantă, cifrele
 * trebuie înlocuite înainte de lansare.
 */

export const pricingMeta = {
  currency: "RON",
  /** Toate cifrele din ofertă sunt nete. */
  vatIncluded: false,
  /** Oferta acoperă exclusiv manopera; materialele sunt pe lista de excluderi. */
  laborOnly: true,
  updated: "septembrie 2026",
};

export type PriceRow = {
  item: string;
  unit: string;
  price: number;
};

export type PriceGroup = {
  index: string;
  title: string;
  note?: string;
  rows: PriceRow[];
};

export const priceGroups: PriceGroup[] = [
  {
    index: "01",
    title: "Acoperiș",
    note: "De la astereală până la coșul de fum finisat.",
    rows: [
      { item: "Montat astereală din OSB", unit: "mp", price: 30 },
      { item: "Montat folie anticondens (exterior)", unit: "mp", price: 5 },
      { item: "Montat șindrilă bituminoasă", unit: "mp", price: 40 },
      { item: "Montat șorț de tablă — laterale", unit: "m", price: 20 },
      { item: "Montat șorț de tablă — streașină și pante", unit: "m", price: 20 },
      { item: "Montat șorț de tablă — perete etaj", unit: "m", price: 20 },
      { item: "Construit coș de fum, sistem complet termoizolat", unit: "m", price: 210 },
      { item: "Montat șorț de tablă — coș de fum", unit: "m", price: 20 },
      { item: "Plasă și adeziv pe coșul de fum", unit: "mp", price: 45 },
      { item: "Amorsă pe coșul de fum", unit: "mp", price: 10 },
      { item: "Tencuială decorativă pe coșul de fum", unit: "mp", price: 35 },
    ],
  },
  {
    index: "02",
    title: "Pereți",
    rows: [{ item: "Montat placări din OSB", unit: "m", price: 30 }],
  },
  {
    index: "03",
    title: "Izolații și finisaj interior",
    note: "Stratificația dintre căpriori, până la lambriul montat.",
    rows: [
      { item: "Montat polistiren 10 cm între căpriori", unit: "mp", price: 25 },
      { item: "Montat vată minerală între căpriori", unit: "mp", price: 30 },
      { item: "Montat folie barieră de vapori (interior)", unit: "mp", price: 5 },
      { item: "Montat lambriu pe căpriori (finisaj)", unit: "mp", price: 35 },
    ],
  },
  {
    index: "04",
    title: "Sistem pluvial",
    rows: [
      { item: "Montat jgheaburi PVC", unit: "ml", price: 35 },
      { item: "Montat burlane", unit: "ml", price: 40 },
    ],
  },
];

/** Recomandarea tehnică din ofertă — merită păstrată, e utilă clientului. */
export const technicalNote =
  "Folia anticondens, adezivul siliconic de etanșare și șindrila bituminoasă trebuie să facă parte din aceeași gamă de produse.";

/** Lista de excluderi din ofertă: spune clar unde se oprește prețul de mai sus. */
export const notIncluded = [
  "Furnizarea materialelor pentru acoperiș: OSB, șindrilă bituminoasă, folii, polistiren, vată minerală și lambriu",
  "Executarea și montarea structurii de rezistență din lemn, inclusiv căpriori, pane și elemente de rigidizare",
  "Executarea structurii de rezistență a lucarnei, dacă aceasta nu este deja realizată",
  "Furnizarea și montarea ferestrelor sau tâmplăriei aferente lucarnei",
  "Executarea și finisarea paziei și a închiderilor de streașină",
  "Montarea elementelor decorative suplimentare din lemn",
  "Tratarea lemnului împotriva insectelor, ciupercilor și incendiilor",
  "Șlefuirea, băițuirea, lăcuirea sau vopsirea lambriului",
  "Montarea instalațiilor electrice sau a altor instalații în structura acoperișului",
  "Închiderile și finisajele pereților frontali ai construcției A-frame",
  "Furnizarea și montarea parazăpezilor sau a altor accesorii speciale pentru acoperiș",
  "Închirierea schelelor, nacelelor sau a altor echipamente speciale de lucru la înălțime",
  "Transportul materialelor până la amplasament",
  "Evacuarea și transportul deșeurilor rezultate din execuție",
  "Lucrările suplimentare rezultate din modificări ale proiectului sau din situații neprevăzute constatate în timpul execuției",
];
