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
    <div className="space-y-10">
      <Hero />
      <Section title="What is ArxPool">
        <div className="space-y-4 text-lg text-white/80">
          <p>
            ArxPool is an open-source SDK that enables privacy-preserving data pooling on the Arcium network.
            It allows developers to collect encrypted user data, perform secure computations inside Arcium&apos;s
            Multi-party Execution Environment (MXE), and verify results on-chain -- without ever revealing
            individual inputs.
          </p>
          <p className="mt-4">
            ArxPool is designed as a reusable developer toolkit. It can power voting, analytics, AI collaborations,
            and DeFi protocols that require confidential data aggregation.
          </p>
          <Button asChild variant="secondary" className="mt-6 w-fit">
            <Link href="/docs/install">Get Started with SDK →</Link>
          </Button>
        </div>
      </Section>
      <Section
        eyebrow="Platform"
        title="Everything you need to test ArxPool"
        description="Landing, docs, demo, and collector run under one Next.js app router."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Encrypted pools"
            description="Spin up voting and pooling flows with attested ciphertext transport."
            icon={<Shield size={20} />}
          />
          <FeatureCard
            title="SDK-first"
            description="ArxPool SDK drives collector compute and client verification."
            icon={<Cpu size={20} />}
          />
          <FeatureCard
            title="Docs in MDX"
            description="Five MDX guides cover intro, install, API, security, architecture."
            icon={<BookOpen size={20} />}
          />
          <FeatureCard
            title="Framer Motion"
            description="Dark, neon UI with subtle glassmorphism and motion cues."
            icon={<Zap size={20} />}
          />
        </div>
      </Section>
      <Section
        eyebrow="Collector"
        title="Demo-ready backend"
        description="Server routes mirror the production collector contract with stubbed SDK compute for local tries."
      >
        <DemoPreview />
      </Section>
      <Diagram />
    </div>
  );
}
