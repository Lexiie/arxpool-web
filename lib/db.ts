import type { SignedResult } from "./sdk";

export interface Pool {
  id: string;
  name?: string;
  policy?: Record<string, unknown>;
  ciphertexts: string[];
  createdAt: number;
  attestation: {
    issuer: string;
    timestamp: number;
  };
  result?: SignedResult;
}

const pools = new Map<string, Pool>();

export function createPool(input: { name?: string; policy?: Record<string, unknown> }): Pool {
  const id = `pool_${Math.random().toString(36).slice(2, 8)}`;
  const pool: Pool = {
    id,
    name: input.name,
    policy: input.policy,
    ciphertexts: [],
    createdAt: Date.now(),
    attestation: {
      issuer: "arxpool-local",
      timestamp: Date.now()
    }
  };

  pools.set(id, pool);
  return pool;
}

export function getPool(poolId: string): Pool | undefined {
  return pools.get(poolId);
}

export function appendCiphertext(poolId: string, ciphertext: string) {
  const pool = pools.get(poolId);
  if (!pool) {
    throw new Error("Pool not found");
  }

  pool.ciphertexts.push(ciphertext);
}

export function saveResult(poolId: string, result: SignedResult) {
  const pool = pools.get(poolId);
  if (!pool) {
    throw new Error("Pool not found");
  }

  pool.result = result;
}

export function serializePool(pool: Pool) {
  return {
    id: pool.id,
    name: pool.name,
    ciphertextCount: pool.ciphertexts.length,
    attestation: pool.attestation,
    result: pool.result
  };
}
