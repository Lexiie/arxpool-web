import Link from "next/link";
import { Shield, Cpu, BookOpen, Zap } from "lucide-react";
import { Hero } from "../components/hero";
import { Section } from "../components/section";
import { FeatureCard } from "../components/feature-card";
import { DemoPreview } from "../components/demo-preview";
import { Diagram } from "../components/diagram";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <Hero />
      <Section title="What is ArxPool" description="Encrypted coordination toolkit running on top of Arcium's MPC infrastructure.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Encrypted pools"
            description="Collect commitments without plaintext leakage."
            icon={<Shield size={20} />}
          />
          <FeatureCard
            title="SDK-first"
            description="configure() once, then call create → join → compute → verify."
            icon={<Cpu size={20} />}
          />
          <FeatureCard
            title="Docs in MDX"
            description="Intro, install, developer guide, architecture, security."
            icon={<BookOpen size={20} />}
          />
          <FeatureCard
            title="Demo ready"
            description="Interactive flow mirrors the collector API."
            icon={<Zap size={20} />}
          />
        </div>
      </Section>
      <Section
        title="How it works"
        description="Create a pool, append encrypted choices, compute via the SDK, verify signatures in the browser."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {["Create", "Join", "Compute + Verify"].map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{step}</h3>
              <p className="mt-2 text-sm text-white/70">
                {index === 0 && "POST /api/pool/create seeds an in-memory collector with title and options."}
                {index === 1 && "Participants encrypt their choice client-side and call /api/join (ciphertext is redacted)."}
                {index === 2 && "computePool() runs in stub or testnet mode; verifyResult() lights up the VALID badge."}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-sm text-white/80">
          <p className="font-semibold text-white">Ready to build?</p>
          <p className="mt-2">
            The SDK wrapper detects USE_STUB from your environment. Flip it to testnet once your ARXPOOL_NODE and attester key are configured—no code changes required.
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/docs/developer-guide">Explore developer guide →</Link>
          </Button>
        </div>
      </Section>
      <Diagram />
      <Section
        title="Why now"
        description="Arcium's testnet unlocks verifiable multiparty computation for real builders."
      >
        <ul className="grid gap-6 text-sm text-white/80 md:grid-cols-3">
          <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Testnet parity</h3>
            <p className="mt-2">
              Stub mode mimics the collector contract so you can integrate today and swap endpoints later.
            </p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Verified results</h3>
            <p className="mt-2">
              verifyResult() uses deterministic signatures so badge VALID shows up instantly in the demo.
            </p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Open source flow</h3>
            <p className="mt-2">
              Fork the repo, deploy to Vercel, and share a single portal with landing, docs, demo, and API.
            </p>
          </li>
        </ul>
      </Section>
      <Section
        title="Demo & collector"
        description="Interactive playground plus the API endpoints you need to wire the SDK."
      >
        <DemoPreview />
      </Section>
    </div>
  );
}
