export type PrincipleIconName = "comunicare" | "solutii" | "incredere";

/**
 * Iconițe pentru cele trei principii.
 *
 * Desenate ca linii, nu ca forme pline, ca să stea bine lângă text la 18–20px
 * și să moștenească culoarea din context. Capetele rotunjite sunt aceleași ca
 * la săgeata folosită în restul site-ului — un set de iconițe care nu seamănă
 * între ele arată ca și cum ar veni din trei locuri diferite.
 */
const PATHS: Record<PrincipleIconName, string[]> = {
  // bulă de dialog, cu colțuri drepte ca restul interfeței
  comunicare: ["M4 5h16v10H9l-5 4V5Z"],
  // echer de trasat, cu gradațiile pe catetă
  solutii: ["M5 4v16h16L5 4Z", "M9 20v-2.5M13 20v-2.5M17 20v-2.5"],
  // scut cu bifă: angajament respectat
  incredere: [
    "M12 3.5 5 6.2v4.6c0 4.2 2.8 7 7 9.7 4.2-2.7 7-5.5 7-9.7V6.2L12 3.5Z",
    "m9.2 11.9 2 2 3.6-3.7",
  ],
};

export default function PrincipleIcon({
  name,
  className = "",
}: {
  name: PrincipleIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
