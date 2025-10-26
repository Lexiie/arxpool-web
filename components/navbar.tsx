'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/demo", label: "Demo" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-3 w-3 rounded-full bg-primary shadow-glow" aria-hidden />
          ArxPool Portal
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition-colors hover:text-primary",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/arxpool"
            className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-widest text-white/70 transition hover:border-primary hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
