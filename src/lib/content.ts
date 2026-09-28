/**
 * Tot copywriting-ul site-ului, într-un singur loc.
 *
 * Textul de brand (misiune, valori, slogan) este preluat din materialul
 * trimis de client. Serviciile și etapele de proces sunt deduse din pozele
 * de șantier primite — de confirmat cu clientul înainte de lansare.
 *
*/

/**
 * Datele de identificare vin din registrul ANAF (interogare după CUI 15546079),
 * nu de pe un agregator — e sursa oficială și se poate reverifica oricând la
 * webservicesp.anaf.ro. Firma e activă, înregistrată din 26.06.2003, plătitoare
 * de TVA.
 *
 * Telefonul și e-mailul lipsesc din registru și trebuie cerute clientului.
 */
export const company = {
  name: "Construcții Mărcuț",
  legalName: "Construcții Mărcuț S.R.L.",
  tagline: "Construim încredere. Ridicăm viitorul.",

  cui: "RO 15546079",
  regCom: "J05/817/2003",
  address:
    "Str. Henrik Ibsen nr. 3, bl. AN 2, et. 1, ap. 6, Oradea, jud. Bihor, 410241",
  /** Forma scurtă, pentru secțiunea de contact. */
  city: "Oradea, jud. Bihor",

  facebook: "https://www.facebook.com/p/Constructii-Marcut-61594344822676/",
  instagram: "https://www.instagram.com/constructiimarcut2003/",
  /** Profilul Google Business — de aici vin recenziile reale. */
  google: "https://share.google/UUIPHtw7nezQ1HQvf",

  /** Confirmat ANAF: înregistrată la Registrul Comerțului în 26.06.2003. */
  foundingDate: "2003-06-26",
  foundingYear: 2003,

  /**
   * Ordinea contează: primul din listă e numărul principal și e cel folosit
   * peste tot unde se afișează un singur telefon (meniu, WhatsApp).
   */
  phones: [
    { number: "+40 773 719 760", href: "tel:+40773719760", role: "Principal" },
    { number: "+40 749 872 554", href: "tel:+40749872554", role: "Secundar" },
  ],

  /** WhatsApp merge pe numărul principal, în format internațional fără plus. */
  whatsapp: "https://wa.me/40773719760",

  /**
   * ⚠ PROVIZORIU — adresa se va schimba.
   *
   * Depinde de un domeniu care încă nu e cumpărat și de o căsuță care nu
   * există: până atunci, orice mesaj trimis aici se pierde. De schimbat în
   * același timp cu `SITE_URL` din `src/app/layout.tsx` și cu `CONTACT_TO`
   * din `.env.local` (destinatarul formularului e setat separat de adresa
   * afișată aici).
   */
  email: "contact@constructiimarcut.ro",
  emailIsProvisional: true,
} as const;

/**
 * Trimiterile către ANPC.
 *
 * Platforma europeană SOL/ODR nu apare aici: a fost închisă pe 20.07.2025
 * prin Regulamentul (UE) 2024/3228, deci linkul ar fi mort.
 */
export const anpc = [
  { label: "ANPC — SAL", href: "https://www.anpc.ro/sal" },
  { label: "ANPC — Reclamații", href: "https://eservicii.anpc.ro/" },
] as const;

/**
 * Linkurile sunt absolute („/#despre", nu „#despre") ca să funcționeze
 * identic din orice pagină. Pe pagina curentă, SmoothScroll le prinde și le
 * transformă în scroll lin în loc de navigare.
 */
export const nav = [
  { label: "Despre noi", href: "/#despre" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Lucrări", href: "/#lucrari" },
  { label: "Proces", href: "/#proces" },
  { label: "Prețuri", href: "/preturi" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * Hero-ul poartă două sarcini diferite, de aceea are două linii.
 *
 * `eyebrow` spune ce facem și unde — e linia cu care rămâne un motor de
 * căutare sau un model AI, fiindcă „Construim încredere" e o frază pe care
 * o poate scrie orice firmă din lume. `title` rămâne sloganul din logo,
 * pentru impact vizual. Amândouă stau în același <h1>.
 *
 * `lead` e scris ca să poată fi citat ca atare: entitate, loc, vechime,
 * servicii, diferențiator — în trei propoziții.
 */
export const hero = {
  eyebrow: "Construcții case și renovări în Oradea și județul Bihor",
  title: ["Construim încredere.", "Ridicăm viitorul."],
  /**
   * Scurt intenționat. Definiția completă, cea care poate fi citată, s-a mutat
   * în deschiderea secțiunii „Despre noi": rămâne la fel de vizibilă pentru
   * motoare și modele, dar nu mai încarcă hero-ul.
   *
   * Varianta „o ascundem, dar o lăsăm pentru SEO" a fost respinsă: textul
   * ascuns pentru motoare e listat explicit în politicile de spam Google.
   */
  lead:
    "Firmă de construcții din Oradea și județul Bihor, activă din 2003. De la fundație și structură până la finisaje.",
  primaryCta: { label: "Cere o ofertă", href: "/#contact" },
  secondaryCta: { label: "Vezi lucrările", href: "/#lucrari" },
  image: {
    src: "/images/casa-finalizata-amurg.jpg",
    alt: "Casă finalizată de Construcții Mărcuț, fotografiată în amurg, cu fațadă albă și tâmplărie din lemn",
  },
};

export const about = {
  eyebrow: "Despre noi",
  title: "Fiecare proiect înseamnă mai mult decât o simplă lucrare",
  /**
   * Răspunsul direct, scris ca să poată fi preluat ca atare: cine, ce, unde,
   * din când. Stă aici, vizibil, imediat sub titlu — nu ascuns undeva.
   */
  lead:
    "Construcții Mărcuț SRL este o firmă de construcții din Oradea, județul Bihor, activă din 2003. Executăm case la roșu și la cheie, structuri pe cadre de lemn, fundații, șarpante, învelitori, renovări și finisaje — de la trasare până la predare, cu aceeași echipă.",
  body: [
    "Pentru noi, fiecare proiect înseamnă responsabilitatea de a construi ceva durabil, bine făcut și adaptat nevoilor clientului.",
    "Ne implicăm în fiecare etapă a lucrării, de la fundație și structură până la finisaje, urmărind cu atenție detaliile și calitatea rezultatului final.",
    "Indiferent dacă este vorba despre construirea unei case, renovarea unei proprietăți sau realizarea unor lucrări specifice, abordăm fiecare proiect cu aceeași seriozitate.",
  ],
  cta: { label: "Discută proiectul tău", href: "/#contact" },
  image: {
    src: "/images/proces-structura-02.jpg",
    alt: "Echipa ridicând pereții structurii din lemn pe placa de beton",
  },
};

/** Cele trei principii din textul clientului — folosite ca panouri sticky. */
export const principles = [
  {
    index: "01",
    icon: "comunicare" as const,
    title: "Comunicare directă",
    body:
      "Vorbim pe înțelesul tău, fără promisiuni pe care nu le putem ține. Știi în orice moment unde se află lucrarea și ce urmează.",
    image: {
      src: "/images/proces-structura-05.jpg",
      alt: "Structura din lemn a unei case în execuție, văzută din interior",
    },
  },
  {
    index: "02",
    icon: "solutii" as const,
    title: "Soluții practice",
    body:
      "Căutăm varianta care rezolvă problema și rezistă în timp, nu pe cea care sună cel mai bine pe hârtie.",
    image: {
      src: "/images/proces-sarpanta-01.jpg",
      alt: "Șarpanta din lemn montată peste structura casei",
    },
  },
  {
    index: "03",
    icon: "incredere" as const,
    title: "Colaborare bazată pe încredere",
    body:
      "Respectăm ce am promis: termenele, bugetul și calitatea execuției. Asta ne ține clienții aproape.",
    image: {
      src: "/images/proces-invelitoare-01.jpg",
      alt: "Montajul învelitorii din țiglă pe acoperișul casei",
    },
  },
];

/**
 * Serviciile reflectă lucrările vizibile în pozele primite.
 * De validat cu clientul — poate execută și lucrări care nu apar în poze.
 */
export const services = [
  {
    title: "Case la roșu și la cheie",
    body: "Construim de la zero, cu execuție continuă de la trasare până la predare.",
  },
  {
    title: "Structuri pe cadre de lemn",
    body: "Pereți portanți din lemn ecarisat, închideri OSB și anvelopare, executate la fața locului.",
  },
  {
    title: "Fundații și infrastructură",
    body: "Săpături, cofraje, armare și turnarea plăcii, cu hidroizolație și cote verificate.",
  },
  {
    title: "Șarpante și învelitori",
    body: "Șarpante din lemn, astereală, folie anticondens și montaj de învelitoare.",
  },
  {
    title: "Renovări și modernizări",
    body: "Reabilitarea proprietăților existente, de la recompartimentări la refacerea finisajelor.",
  },
  {
    title: "Finisaje interioare și exterioare",
    body: "Tencuieli, gletuiri, placări și fațade, duse până la detaliul final.",
  },
];

/** Etapele reale de execuție, ilustrate cu pozele de pe șantierele lor. */
export const process = [
  {
    step: "01",
    title: "Fundație și infrastructură",
    body:
      "Trasăm, săpăm și turnăm placa. Cotele și hidroizolația se verifică înainte de a merge mai departe — aici nu se recuperează nimic ulterior.",
    image: {
      src: "/images/proces-fundatie-01.jpg",
      alt: "Placa de beton turnată și pregătită pentru montajul structurii",
    },
  },
  {
    step: "02",
    title: "Structură",
    body:
      "Ridicăm pereții pe cadre de lemn, prinși mecanic în talpa fixată pe placă. Fiecare panou se verifică la verticalitate și la diagonală.",
    image: {
      src: "/images/proces-structura-01.jpg",
      alt: "Pereți din cadre de lemn ridicați pe placa de beton a casei",
    },
  },
  {
    step: "03",
    title: "Închidere și anvelopare",
    body:
      "Închidem structura cu OSB și membrană, astfel încât casa să fie protejată de intemperii cât mai repede posibil.",
    image: {
      src: "/images/proces-inchidere-01.jpg",
      alt: "Structura casei închisă cu plăci OSB pe exterior",
    },
  },
  {
    step: "04",
    title: "Șarpantă și învelitoare",
    body:
      "Montăm șarpanta, astereala și folia, apoi învelitoarea. Din acest moment lucrarea poate continua în interior indiferent de vreme.",
    image: {
      src: "/images/proces-invelitoare-02.jpg",
      alt: "Montajul țiglei pe acoperișul casei în execuție",
    },
  },
  {
    step: "05",
    title: "Finisaje și predare",
    body:
      "Tencuieli, placări, fațadă și detaliile finale. Predăm lucrarea curată, verificată împreună cu tine, punct cu punct.",
    image: {
      src: "/images/casa-finalizata-seara.jpg",
      alt: "Casă finalizată cu fațadă albă, acoperiș negru și iluminat exterior aprins",
    },
  },
];

/** Lucrări finalizate + randări ale proiectelor. */
export const projects = [
  {
    title: "Casă parter cu acoperiș în două ape",
    meta: "Lucrare finalizată",
    image: {
      src: "/images/casa-finalizata-amurg.jpg",
      alt: "Casă parter finalizată, fațadă albă cu accente din lemn, fotografiată în amurg",
    },
    span: "wide" as const,
  },
  {
    title: "Fațadă și iluminat exterior",
    meta: "Lucrare finalizată",
    image: {
      src: "/images/casa-finalizata-seara.jpg",
      alt: "Fațada unei case finalizate, cu iluminat exterior aprins seara",
    },
    span: "normal" as const,
  },
  {
    title: "Casă parter — proiect",
    meta: "Randare 3D",
    image: {
      src: "/images/randare-casa-parter.jpg",
      alt: "Randare 3D a unei case parter cu terasă acoperită și placare din lemn",
    },
    span: "normal" as const,
  },
  {
    title: "Casă cu mansardă — proiect",
    meta: "Randare 3D",
    image: {
      src: "/images/randare-casa-mansarda.jpg",
      alt: "Randare 3D a unei case cu mansardă și fațadă placată parțial cu lemn",
    },
    span: "normal" as const,
  },
  {
    title: "Structură pe cadre de lemn",
    meta: "Execuție",
    image: {
      src: "/images/proces-structura-03.jpg",
      alt: "Structura din lemn a unei case, văzută din interior către deschiderile de ferestre",
    },
    span: "normal" as const,
  },
];

export const values = {
  eyebrow: "Cum lucrăm",
  title: "Patru lucruri pe care nu le negociem",
  items: [
    { title: "Seriozitate", body: "Ne ținem de cuvânt. Dacă am spus o dată, o facem." },
    { title: "Calitatea execuției", body: "Lucrăm ca și cum am construi pentru noi. Detaliile se văd în timp." },
    { title: "Respectarea angajamentelor", body: "Termene și costuri asumate din start, nu renegociate pe parcurs." },
    { title: "Grija pentru detalii", body: "Urmărim rezultatul final din prima zi de șantier, nu din ultima." },
  ],
};

/**
 * Întrebări frecvente.
 *
 * Perechile întrebare-răspuns sunt cel mai ușor de preluat de modelele AI și
 * generează rezultate îmbogățite în Google prin schema FAQPage. Răspunsurile
 * sunt scurte și verificabile intenționat.
 *
 * Termenele: clientul a spus explicit că nu poate da unul standard, fiindcă
 * fiecare proiect diferă — răspunsul de mai jos spune exact asta, în loc să
 * inventeze o durată.
 */
export const faq = [
  {
    q: "În ce zonă lucrați?",
    a: "Lucrăm în Oradea și în județul Bihor.",
  },
  {
    q: "Cât durează o lucrare?",
    a: "Nu dăm un termen standard, pentru că fiecare proiect e diferit: contează suprafața, tipul structurii, accesul la teren și vremea. Termenul se stabilește în ofertă, pe etape, după ce vedem proiectul concret.",
  },
  {
    q: "Cât costă construcția unei case?",
    a: "Depinde de suprafață, de tipul structurii și de finisajele alese. Ca să nu ceri o ofertă doar ca să afli ordinul de mărime, am publicat tarifele de manoperă pe fiecare tip de lucrare în pagina Prețuri. Oferta finală se face pe cantități măsurate.",
  },
  {
    q: "Materialele sunt incluse în preț?",
    a: "Nu. Tarifele publicate acoperă manopera. Materialele se achiziționează separat, iar lista completă a lucrărilor neincluse este publicată în pagina Prețuri.",
  },
  {
    q: "Ce tipuri de lucrări executați?",
    a: "Case la roșu și la cheie, structuri pe cadre de lemn, fundații și infrastructură, șarpante și învelitori, renovări și modernizări, finisaje interioare și exterioare.",
  },
  {
    q: "Din ce an activați?",
    a: "Din 2003. Construcții Mărcuț SRL este înregistrată la Registrul Comerțului sub J05/817/2003, cu sediul în Oradea, județul Bihor.",
  },
] as const;

export const contact = {
  eyebrow: "Contact",
  title: "Hai să vorbim despre proiectul tău",
  lead:
    "Spune-ne pe scurt ce ai de construit sau de renovat și revenim cu pașii următori și o estimare.",
};
