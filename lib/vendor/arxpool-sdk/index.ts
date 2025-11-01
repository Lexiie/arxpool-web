export type Mode = "stub" | "testnet";

export interface Config {
  mode: Mode;
  node?: string;
  attesterSecret?: string;
  attesterKey?: string;
}

export interface PoolInput {
  id: string;
  mode: "tally" | "compute";
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface Pool extends PoolInput {
  createdAt: string;
}

export interface EncryptedBlob {
  ciphertext: string;
  senderPubkey: string;
  nonce?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface ComputeOptions {
  metadata?: Record<string, unknown>;
}

export interface SignedResult {
  payload: {
    pool_id: string;
    mode: string;
    computed_at: string;
    participant_count: number;
    ciphertexts_digest: string;
    metadata?: Record<string, unknown>;
  };
  signature: string;
  signer_pubkey: string;
}

const pools = new Map<string, Pool>();
const blobs = new Map<string, EncryptedBlob[]>();

const defaultConfig: Config = {
  mode: process.env.USE_STUB === "false" ? "testnet" : "stub",
  node: process.env.ARXPOOL_NODE,
  attesterSecret: process.env.ARXPOOL_ATTESTER_SECRET,
  attesterKey: process.env.ARXPOOL_ATTESTER_KEY
};

let activeConfig: Config = { ...defaultConfig };

export function configure(input: Partial<Config> = {}): Config {
  activeConfig = { ...activeConfig, ...input };
  return { ...activeConfig };
}

export function getConfig(requiredKeys: (keyof Config)[] = []): Config {
  for (const key of requiredKeys) {
    if (!activeConfig[key]) {
      throw new Error(`Missing required config value: ${String(key)}`);
    }
  }
  return { ...activeConfig };
}

export async function createPool(input: PoolInput): Promise<Pool> {
  const createdAt = new Date().toISOString();
  const pool: Pool = { ...input, createdAt };
  pools.set(input.id, pool);
  blobs.set(input.id, []);
  return pool;
}

export async function joinPool(poolId: string, blob: EncryptedBlob): Promise<EncryptedBlob> {
  const list = blobs.get(poolId);
  if (!list) {
    throw new Error(`Pool ${poolId} not found`);
  }
  const entry: EncryptedBlob = {
    ...blob,
    timestamp: blob.timestamp ?? new Date().toISOString()
  };
  list.push(entry);
  return entry;
}

export async function computePool(poolId: string, options: ComputeOptions = {}): Promise<SignedResult> {
  const pool = pools.get(poolId);
  if (!pool) {
    throw new Error(`Pool ${poolId} not found`);
  }
  const list = blobs.get(poolId) ?? [];
  const participantCount = list.length;
  const digest = deriveHash(list.map((item) => item.ciphertext).join("|"));
  const metadata = {
    ...(pool.metadata ?? {}),
    ...(options.metadata ?? {})
  };
  const payload = {
    pool_id: pool.id,
    mode: pool.mode,
    computed_at: new Date().toISOString(),
    participant_count: participantCount,
    ciphertexts_digest: digest,
    metadata
  };
  const signerSecret = activeConfig.attesterKey || activeConfig.attesterSecret || "arxpool-stub-attester";
  const signerPubkey = deriveHash(`pubkey:${signerSecret}`);
  const signature = signPayload(payload, signerPubkey);
  return {
    payload,
    signature,
    signer_pubkey: signerPubkey
  };
}

export function verifyResult(result: SignedResult): boolean {
  const expected = signPayload(result.payload, result.signer_pubkey);
  return expected === result.signature;
}

function deriveHash(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 257 + value.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash).toString(16).padStart(32, "0");
}

function signPayload(payload: SignedResult["payload"], signer: string): string {
  return deriveHash(`${JSON.stringify(payload)}:${signer}`);
}
