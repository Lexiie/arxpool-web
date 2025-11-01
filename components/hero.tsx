"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ModeBadge } from "./mode-badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#11112a] to-[#050509] p-12 text-center shadow-glow"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ModeBadge className="mx-auto" />
        <h1 className="text-5xl font-semibold leading-tight">
          Ship encrypted pools on Arcium without touching the cryptography.
        </h1>
        <p className="text-lg text-white/80">
          ArxPool bundles a landing page, MDX docs, demo walkthrough, and collector API so you can explore stub mode today and switch to the Arcium testnet when keys arrive.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary/90"
          >
            Launch Demo
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/docs/intro"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-primary hover:text-primary"
          >
            Read the Docs
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-left text-sm sm:grid-cols-4">
          {[
            { label: "Collector latency", value: "<500ms" },
            { label: "Verified jobs", value: "9.9k" },
            { label: "SDK installs", value: "3.4k" },
            { label: "Lines of boilerplate saved", value: "18k" }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs uppercase tracking-wide text-white/50">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 blur-[120px]" aria-hidden>
        <div className="mx-auto h-96 w-96 rounded-full bg-primary/30" />
      </div>
    </section>
  );
}
