"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-10 rounded-2xl border border-white/10 bg-gradient-to-br from-[#11112a] to-[#050509] p-10 text-center shadow-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Trusted MPC SDK</p>
        <h1 className="text-5xl font-semibold leading-tight">
          Secure multiparty computation for real-world pools and votes.
        </h1>
        <p className="text-lg text-white/70">
          Build private coordination flows with ArxPool. Explore the SDK, run the stubbed collector, and ship encrypted experiences without leaking plaintext data.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/demo"
            className="flex items-center gap-2 rounded-full bg-primary/90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-primary"
          >
            Launch Demo
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/docs/intro"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:border-primary hover:text-primary"
          >
            Read the Docs
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/5 bg-black/40 p-6 text-left text-sm sm:grid-cols-4">
          {[
            { label: "Encrypted Pools", value: "1.2M+" },
            { label: "Median compute", value: "420ms" },
            { label: "Verified proofs", value: "9.9k" },
            { label: "SDK installs", value: "3.4k" }
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
