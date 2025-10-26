import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="glass-panel gradient-border flex flex-col gap-4 rounded-2xl p-6 transition hover:-translate-y-1">
      <div className="flex items-center gap-3 text-primary">
        {icon}
        <span className="text-sm uppercase tracking-wide text-white/70">{title}</span>
      </div>
      <p className="text-base text-white/80">{description}</p>
    </div>
  );
}
