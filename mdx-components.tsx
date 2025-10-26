import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-semibold text-foreground mb-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl text-primary font-semibold mt-10 mb-4" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl text-accent font-semibold mt-8 mb-3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-foreground/80 leading-7 mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 text-foreground/80 space-y-2 mb-4" {...props}>
        {children}
      </ul>
    ),
    code: ({ children, ...props }) => (
      <code className="bg-muted/40 rounded px-2 py-1 text-sm" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-black/60 rounded-2xl border border-white/5 p-4 overflow-auto mb-6"
        {...props}
      >
        {children}
      </pre>
    ),
    ...components
  };
}
