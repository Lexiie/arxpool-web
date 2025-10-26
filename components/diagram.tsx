const nodes = [
  { label: "Client", color: "from-primary/30" },
  { label: "Collector API", color: "from-[#00B7FF]/30" },
  { label: "ArxPool SDK", color: "from-primary/30" },
  { label: "Arcium Network", color: "from-[#00B7FF]/30" }
];

export function Diagram() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-gradient-to-br from-black/60 to-[#080812] p-10">
        <h2 className="text-3xl font-semibold">Flow diagram</h2>
        <p className="mt-2 text-white/60">Trace how ciphertext moves through the stubbed stack.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {nodes.map((node, index) => (
            <div
              key={node.label}
              className={`rounded-2xl border border-white/5 bg-gradient-to-br ${node.color} to-transparent p-4 text-center text-sm font-semibold text-white`}
            >
              <div className="text-4xl text-white/20">0{index + 1}</div>
              {node.label}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 text-sm text-white/70 md:grid-cols-2">
          <div>
            <p className="font-semibold text-primary">Ciphertext only</p>
            <p>No plaintext request bodies persist in memory and the API never logs them.</p>
          </div>
          <div>
            <p className="font-semibold text-accent">Deterministic compute</p>
            <p>computePool() generates attested results that verify client-side via verifyResult().</p>
          </div>
        </div>
      </div>
    </section>
  );
}
