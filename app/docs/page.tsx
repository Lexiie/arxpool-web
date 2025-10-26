import Link from "next/link";
import { allDocs } from "contentlayer/generated";

export const metadata = {
  title: "ArxPool Docs"
};

export default function DocsIndex() {
  const sorted = allDocs.sort((a, b) => a.order - b.order);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">Documentation</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Learn how the ArxPool SDK, collector backend, and security guarantees fit together.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sorted.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="glass-panel flex flex-col gap-2 rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Guide {doc.order}</p>
              <h2 className="text-2xl font-semibold">{doc.title}</h2>
              <p className="text-sm text-white/70">{doc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
