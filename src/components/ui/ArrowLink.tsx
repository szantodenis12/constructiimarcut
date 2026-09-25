import Link from "next/link";
import type { ReactNode } from "react";

/** Săgeata diagonală folosită peste tot în referință. */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      strokeWidth={1.8}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

/** CTA dreptunghiular, ușor rotunjit — butonul principal din referință. */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonLinkProps) {
  const styles = {
    solid: "bg-rust text-white hover:bg-rust-deep",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
    light: "border border-white/35 text-white hover:bg-white hover:text-ink",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/** Butonul rotund cu săgeată, folosit peste panourile de culoare. */
export function ArrowCircle({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group grid size-12 place-items-center border border-current transition-colors duration-300 hover:bg-current ${className}`}
    >
      <ArrowIcon className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
    </Link>
  );
}
