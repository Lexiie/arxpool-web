"use client";

import { useState } from "react";
import { encryptChoice, verifyResult, type SignedResult } from "../../lib/sdk";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ModeBadge } from "../../components/mode-badge";

interface ApiError {
  error: string;
}

interface CreateResponse {
  ok: boolean;
  id: string;
}

interface JoinResponse {
  ok: boolean;
  count: number;
}

const DEFAULT_OPTIONS = "Yes,No,Abstain";

export default function DemoPage() {
  const [createPayload, setCreatePayload] = useState({
    id: "demo-pool",
    title: "ArxPool Test Run",
    options: DEFAULT_OPTIONS
  });
  const [joinPayload, setJoinPayload] = useState({
    poolId: "",
    choice: "",
    senderPubkey: "collector-demo"
  });
  const [status, setStatus] = useState<string>("Idle");
  const [result, setResult] = useState<(SignedResult & { valid: boolean }) | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("Creating pool...");
    setResult(null);
    try {
      const options = createPayload.options
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      const res = await fetch("/api/pool/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: createPayload.id.trim(), title: createPayload.title.trim(), options })
      });
      const body: CreateResponse | ApiError = await res.json();
      if (!res.ok || !("ok" in body)) {
        throw new Error((body as ApiError).error || "Failed to create pool");
      }
      setStatus(`Pool ${body.id} created in memory.`);
      setJoinPayload((prev) => ({ ...prev, poolId: body.id }));
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!joinPayload.poolId) {
      setStatus("Provide a pool ID first");
      return;
    }
    setLoading(true);
    setStatus("Encrypting choice and sending to collector...");
    try {
      const ciphertext = encryptChoice(joinPayload.choice || "Yes");
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poolId: joinPayload.poolId.trim(),
          ciphertext,
          senderPubkey: joinPayload.senderPubkey.trim() || undefined
        })
      });
      const body: JoinResponse | ApiError = await res.json();
      if (!res.ok || !("ok" in body)) {
        throw new Error((body as ApiError).error || "Failed to join pool");
      }
      setStatus(`Ciphertext accepted. Total blobs: ${body.count}.`);
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCompute() {
    if (!joinPayload.poolId) {
      setStatus("Provide a pool ID first");
      return;
    }
    setLoading(true);
    setStatus("Computing via SDK...");
    try {
      const res = await fetch("/api/pool/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poolId: joinPayload.poolId.trim() })
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Compute failed");
      }
      const typedBody = body as SignedResult;
      const valid = verifyResult(typedBody);
      const participantCount = extractParticipantCount(typedBody);
      setResult({ ...typedBody, valid });
      setStatus(
        valid
          ? `Signature verified. Participants: ${participantCount ?? "unknown"}.`
          : "Signature mismatch. Result INVALID."
      );
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchResult() {
    if (!joinPayload.poolId) {
      setStatus("Provide a pool ID first");
      return;
    }
    setLoading(true);
    setStatus("Fetching latest signed result...");
    try {
      const res = await fetch(`/api/result?poolId=${joinPayload.poolId.trim()}`);
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Result unavailable");
      }
      const typedBody = body as SignedResult;
      const valid = verifyResult(typedBody);
      setResult({ ...typedBody, valid });
      setStatus(valid ? "Signature verified." : "Signature mismatch.");
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <ModeBadge />
          <h1 className="text-4xl font-semibold">Interactive demo</h1>
          <p className="text-white/70">
            Walk through the create → join → compute → verify loop. State lives on the server in memory only; ciphertext is redacted immediately.
          </p>
        </header>
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-white/80">
          <strong>Tip:</strong> Flip `USE_STUB` in your `.env` to switch between deterministic stub outputs and the Arcium testnet.
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-8">
            <form onSubmit={handleCreate} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">1. Create pool</h2>
                <Button type="submit" disabled={loading}>
                  {loading ? "Working..." : "Create"}
                </Button>
              </div>
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Pool ID</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={createPayload.id}
                onChange={(event) => setCreatePayload((prev) => ({ ...prev, id: event.target.value }))}
                placeholder="demo-pool"
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Title</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={createPayload.title}
                onChange={(event) => setCreatePayload((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="ArxPool Demo"
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Options (comma separated)</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={createPayload.options}
                onChange={(event) => setCreatePayload((prev) => ({ ...prev, options: event.target.value }))}
                placeholder="Yes,No,Abstain"
              />
            </form>
            <form onSubmit={handleJoin} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">2. Join pool</h2>
                <Button type="submit" variant="secondary" disabled={loading}>
                  {loading ? "Working..." : "Submit"}
                </Button>
              </div>
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Pool ID</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={joinPayload.poolId}
                onChange={(event) => setJoinPayload((prev) => ({ ...prev, poolId: event.target.value }))}
                placeholder="demo-pool"
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Your choice</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={joinPayload.choice}
                onChange={(event) => setJoinPayload((prev) => ({ ...prev, choice: event.target.value }))}
                placeholder="Yes"
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-white/50">Sender pubkey (optional)</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm"
                value={joinPayload.senderPubkey}
                onChange={(event) => setJoinPayload((prev) => ({ ...prev, senderPubkey: event.target.value }))}
                placeholder="collector-demo"
              />
            </form>
            <div className="grid gap-4 md:grid-cols-2">
              <Button onClick={handleCompute} disabled={loading}>
                3. Compute
              </Button>
              <Button onClick={handleFetchResult} variant="outline" disabled={loading}>
                4. Fetch result
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-xs text-white/80 min-h-[120px]">
              {status}
            </div>
            {joinPayload.poolId && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Pool ID</p>
                <p className="mt-1 font-mono text-white">{joinPayload.poolId}</p>
              </div>
            )}
            {result && (() => {
              const payload = isRecord(result.payload) ? result.payload : null;
              const participantCount = extractParticipantCount(result);
              const metadata =
                payload && "metadata" in payload && isRecord(payload.metadata)
                  ? JSON.stringify(payload.metadata, null, 2)
                  : undefined;

              return (
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Latest result</p>
                    <Badge variant={result.valid ? "success" : "destructive"}>
                      {result.valid ? "VALID" : "INVALID"}
                    </Badge>
                  </div>
                  <ResultRow label="Pool ID" value={String(payload?.pool_id ?? "-")} />
                  <ResultRow label="Mode" value={String(payload?.mode ?? "-")} />
                  <ResultRow label="Computed at" value={String(payload?.computed_at ?? "-")} />
                  <ResultRow label="Participants" value={String(participantCount ?? "0")} />
                  <ResultRow label="Ciphertexts digest" value={String(payload?.ciphertexts_digest ?? "-")} />
                  <ResultRow label="Signer pubkey" value={result.signer_pubkey} />
                  <ResultRow label="Signature" value={result.signature} />
                  {metadata && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Metadata</p>
                      <pre className="mt-1 max-h-40 overflow-auto rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[10px] text-white/80">
                        {metadata}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function extractParticipantCount(result: SignedResult): number | undefined {
  const payload = result.payload;
  if (payload && typeof payload === "object" && "participant_count" in payload) {
    const value = (payload as Record<string, unknown>).participant_count;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? undefined : parsed;
    }
  }
  return undefined;
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
      <p className="mt-1 font-mono text-xs text-white break-all">{value}</p>
    </div>
  );
}
