import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { useMDXComponents } from "../../../mdx-components";
import { useMDXComponent } from "next-contentlayer/hooks";

interface DocPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: DocPageProps) {
  const doc = allDocs.find((d) => d.slug === params.slug);
  return {
    title: doc ? `${doc.title} — ArxPool Docs` : "Docs"
  };
}

export default function DocPage({ params }: DocPageProps) {
  const doc = allDocs.find((d) => d.slug === params.slug);

  if (!doc) {
    notFound();
  }

  const MDX = useMDXComponent(doc.body.code);

  return (
    <article className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Guide</p>
        <h1 className="mt-4 text-4xl font-semibold">{doc.title}</h1>
        <p className="mt-2 text-white/60">{doc.description}</p>
        <div className="mt-10 prose prose-invert">
          <MDX components={useMDXComponents({})} />
        </div>
      </div>
    </article>
  );
}
