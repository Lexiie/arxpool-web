import Link from "next/link";

export function DemoPreview() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Stub mode demo</p>
        <h3 className="mt-4 text-3xl font-semibold">Create pools, join, compute, verify.</h3>
        <p className="mt-3 text-white/70">
          The interactive playground spins up an in-memory collector. Toggle USE_STUB to rely on deterministic outputs for demos or plug your Arcium credentials for live attestation.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-sm text-white/70">
          <li>No secrets leak to the client — attester key stays server-side.</li>
          <li>verifyResult() runs locally so you can inspect signatures.</li>
          <li>API routes mirror the production collector contract.</li>
        </ul>
        <Link
          href="/demo"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          Open the demo
        </Link>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/50 p-6">
        <h4 className="text-lg font-semibold">Collector endpoints</h4>
        <div className="space-y-4 text-sm text-white/70">
          {[
            { method: "POST", path: "/api/pool/create" },
            { method: "POST", path: "/api/join" },
            { method: "POST", path: "/api/pool/compute" },
            { method: "GET", path: "/api/result" }
          ].map((endpoint) => (
            <div key={endpoint.path} className="rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-xs text-primary">{endpoint.method}</p>
              <p className="font-mono text-sm">{endpoint.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
