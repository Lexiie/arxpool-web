import { Shield, Cpu, BookOpen, Zap } from "lucide-react";
import { Hero } from "../components/hero";
import { Section } from "../components/section";
import { FeatureCard } from "../components/feature-card";
import { DemoPreview } from "../components/demo-preview";
import { Diagram } from "../components/diagram";

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <Hero />
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
