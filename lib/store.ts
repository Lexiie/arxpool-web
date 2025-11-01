import type { SignedResult } from "./sdk";

export type CipherBlob = { ciphertext: string; senderPubkey: string };
export type Pool = {
  id: string;
  title: string;
  options: string[];
  blobs: CipherBlob[];
  result?: SignedResult;
};

export const DB = new Map<string, Pool>();

export function createPool(pool: { id: string; title: string; options: string[] }): Pool {
  const initial: Pool = { ...pool, blobs: [] };
  DB.set(initial.id, initial);
  return initial;
}

export function getPool(id: string) {
  return DB.get(id);
}

export function appendBlob(id: string, blob: CipherBlob) {
  const pool = DB.get(id);
  if (!pool) {
    throw new Error("Pool not found");
  }
  pool.blobs.push(blob);
}

export function saveResult(id: string, result: SignedResult) {
  const pool = DB.get(id);
  if (!pool) {
    throw new Error("Pool not found");
  }
  pool.result = result;
}
