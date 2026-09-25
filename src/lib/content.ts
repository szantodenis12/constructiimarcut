/**
 * Tot copywriting-ul site-ului, într-un singur loc.
 *
 * Textul de brand (misiune, valori, slogan) este preluat din materialul
 * trimis de client. Serviciile și etapele de proces sunt deduse din pozele
 * de șantier primite — de confirmat cu clientul înainte de lansare.
 *
 * Câmpurile marcate TODO sunt date pe care încă nu le avem.
 */

export const TODO = "TODO_CLIENT";

export const company = {
  name: "Construcții Mărcuț",
  legalName: "Construcții Mărcuț SRL",
  tagline: "Construim încredere. Ridicăm viitorul.",
  // datele de mai jos trebuie cerute clientului
  phone: TODO,
  phoneHref: TODO,
  email: TODO,
  address: TODO,
  cui: TODO,
  regCom: TODO,
  facebook: TODO,
  instagram: TODO,
} as const;

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

export const hero = {
  eyebrow: "Construcții civile și rezidențiale",
  title: ["Construim încredere.", "Ridicăm viitorul."],
  lead:
    "Companie dedicată lucrărilor de construcții, în care punem accent pe seriozitate, calitatea execuției și respectarea angajamentelor asumate.",
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

export const contact = {
  eyebrow: "Contact",
  title: "Hai să vorbim despre proiectul tău",
  lead:
    "Spune-ne pe scurt ce ai de construit sau de renovat și revenim cu pașii următori și o estimare.",
};
