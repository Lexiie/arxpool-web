'use client';

import { useState } from "react";
import { encryptMessage } from "../../lib/crypto";
import { verifyResult, type SignedResult } from "../../lib/sdk";
import { Badge } from "../../components/ui/badge";

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

interface CreatePoolResponse {
  poolId: string;
  attestation: {
    issuer: string;
    timestamp: number;
  };
}

export default function DemoPage() {
  const [poolId, setPoolId] = useState<string>("");
  const [participantNote, setParticipantNote] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<(SignedResult & { valid?: boolean }) | null>(null);
  const [loading, setLoading] = useState(false);

  async function createPool() {
    setLoading(true);
    setStatus("Creating pool...");
    try {
      const res = await fetch("/api/pool/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Demo Pool" })
      });
      const body: CreatePoolResponse = await res.json();
      setPoolId(body.poolId);
      setStatus(`Pool ${body.poolId} created. Attester ${body.attestation.issuer}.`);
    } catch (err) {
      setStatus("Failed to create pool");
    } finally {
      setLoading(false);
    }
  }

  async function joinPool() {
    if (!poolId) {
      setStatus("Create a pool first");
      return;
    }
    setLoading(true);
    setStatus("Submitting ciphertext...");
    try {
      const encrypted = encryptMessage(participantNote || "Ready to compute");
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poolId, ciphertext: encrypted.ciphertext })
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Join failed");
      }
      setStatus("Ciphertext stored server-side only.");
    } catch (err) {
      setStatus((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function computePool() {
    if (!poolId) {
      setStatus("Create a pool first");
      return;
    }
    setLoading(true);
    setStatus("Computing via SDK stub...");
    try {
      const res = await fetch("/api/pool/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poolId })
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Compute failed");
      }
      const valid = verifyResult(body);
      setResult({ ...body, valid });
      setStatus(valid ? "Computation complete. Signature verified." : "Computation done but signature mismatch.");
    } catch (err) {
      setStatus((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchResult() {
    if (!poolId) {
      setStatus("Create a pool first");
      return;
    }
    setLoading(true);
    setStatus("Fetching signed result...");
    try {
      const res = await fetch(`/api/result?poolId=${poolId}`);
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Result unavailable");
      }
      const valid = verifyResult(body);
      setResult({ ...body, valid });
      setStatus(valid ? "Signature verified" : "Signature failed verification");
    } catch (err) {
      setStatus((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Interactive demo</p>
          <h1 className="mt-4 text-4xl font-semibold">Try the collector stub</h1>
          <p className="mt-2 text-white/70">
            Walk through the entire SDK flow locally. State lives on the client except for ciphertext, which only the API sees.
          </p>
        </header>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-white/80">
          <strong className="font-semibold text-white">Mode: Stub 🧪</strong> -- No live Arcium connection
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <button
              className="w-full rounded-2xl border border-white/10 bg-primary/20 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-primary"
              onClick={createPool}
              disabled={loading}
            >
              1. Create Pool
              <p className="text-xs font-normal text-white/70">Generate an ID and attestation metadata.</p>
            </button>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Participant note</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm"
                placeholder="Encrypted preference"
                value={participantNote}
                onChange={(e) => setParticipantNote(e.target.value)}
              />
              <button
                className="mt-3 w-full rounded-xl bg-accent/60 px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                onClick={joinPool}
                disabled={loading}
              >
                2. Join Pool
              </button>
            </div>
            <button
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-accent"
              onClick={computePool}
              disabled={loading}
            >
              3. Compute
              <p className="text-xs font-normal text-white/70">Runs computePool() via the stubbed SDK wrapper.</p>
            </button>
            <button
              className="w-full rounded-2xl border border-primary/40 bg-black/40 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-primary"
              onClick={fetchResult}
              disabled={loading}
            >
              4. Verify Result
              <p className="text-xs font-normal text-white/70">Pulls the signed blob and validates via verifyResult().</p>
            </button>
          </div>
          <div className="glass-panel flex flex-col gap-4 rounded-3xl p-6 text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Console</p>
            <div className="min-h-[120px] rounded-2xl border border-white/5 bg-black/60 p-4 font-mono text-xs text-white/80">
              {status || "Idle"}
            </div>
            {poolId && (
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs text-white/60">Pool ID</p>
                <p className="font-mono text-sm">{poolId}</p>
              </div>
            )}
            {result && (
              <div className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Latest result</p>
                  {typeof result.valid === "boolean" && (
                    <Badge variant={result.valid ? "success" : "destructive"}>
                      {result.valid ? "VALID ✅" : "INVALID ❌"}
                    </Badge>
                  )}
                </div>
                <ResultRow label="Tally" value={result.tally} />
                <ResultRow label="Transcript" value={result.transcriptHash} />
                <ResultRow label="Signature" value={result.signature} />
                <ResultRow label="Verified" value={result.valid ? "true" : "false"} />
              </div>
            )}
            <p className="text-xs text-white/50">
              All results are generated in stub mode for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-white/50">{label}</p>
      <p className="font-mono text-sm text-white">{value}</p>
    </div>
  );
}
