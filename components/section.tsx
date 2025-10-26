import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
}

export function Section({ title, eyebrow, description, children }: SectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{eyebrow}</p>}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold">{title}</h2>
            {description && <p className="mt-2 max-w-2xl text-white/60">{description}</p>}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
