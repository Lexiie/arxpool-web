"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ModeBadge } from "./mode-badge";

const links = [
  { href: "/", label: "ArxPool" },
  { href: "/docs", label: "Docs" },
  { href: "/demo", label: "Demo" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-3 w-3 rounded-full bg-primary shadow-glow" aria-hidden />
          ArxPool
        </Link>
        <div className="hidden items-center gap-6 md:flex">
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
            href="https://github.com/Lexiie/arxpool-web"
            className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-widest text-white/70 transition hover:border-primary hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <ModeBadge />
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-primary hover:text-primary md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="relative h-4 w-5" aria-hidden="true">
            <span
              className={clsx(
                "absolute left-0 h-0.5 w-full bg-current transition-transform duration-200",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 h-0.5 w-full bg-current transition-opacity duration-200",
                open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2 opacity-100"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 h-0.5 w-full bg-current transition-transform duration-200",
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              )}
            />
          </span>
        </button>
      </nav>
      <div className={clsx("md:hidden overflow-hidden border-t border-white/5 transition-[max-height] duration-200", open ? "max-h-64" : "max-h-0")}
      >
        <div className="flex flex-col gap-3 px-6 pb-4 pt-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "py-1 transition-colors hover:text-primary",
                pathname === link.href && "text-primary"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Lexiie/arxpool-web"
            className="rounded-full border border-white/10 px-4 py-2 text-center text-xs uppercase tracking-widest text-white/70 transition hover:border-primary hover:text-primary"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
          <ModeBadge className="self-start" />
        </div>
      </div>
    </header>
  );
}
