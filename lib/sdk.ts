import {
  configure,
  getConfig,
  createPool as sdkCreatePool,
  joinPool as sdkJoinPool,
  computePool as sdkComputePool,
  verifyResult as sdkVerifyResult
} from "@arxpool-hq/sdk";
import type {
  ComputeOptions,
  EncryptedBlob,
  Pool,
  SignedResult
} from "@arxpool-hq/sdk";

let configured = false;

function envBool(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value === "true";
}

export function initSDK(): "stub" | "testnet" {
  if (configured) {
    return getConfig().mode;
  }

  const mode = envBool(process.env.USE_STUB, true) ? "stub" : "testnet";
  const node = process.env.ARXPOOL_NODE;
  const attesterSecret = process.env.ARXPOOL_ATTESTER_SECRET;
  const attesterKey = process.env.ARXPOOL_ATTESTER_KEY;

  const configureOptions: Partial<{
    mode: "stub" | "testnet";
    node: string;
    attesterSecret?: string;
    attesterKey?: string;
  }> = { mode };

  if (node) {
    configureOptions.node = node;
  }

  if (attesterSecret) {
    configureOptions.attesterSecret = attesterSecret;
  }

  if (attesterKey) {
    configureOptions.attesterKey = attesterKey;
  }

  const config = configure(configureOptions);
  configured = true;
  return config.mode;
}

function ensureSDK() {
  if (!configured) {
    initSDK();
  }
}

export function getSDKMode(): "stub" | "testnet" {
  ensureSDK();
  return getConfig().mode;
}

export async function createCollectorPool(input: {
  id: string;
  title: string;
  options: string[];
}): Promise<Pool> {
  ensureSDK();
  return sdkCreatePool({
    id: input.id,
    mode: "tally",
    description: input.title,
    metadata: { options: input.options }
  });
}

export async function joinCollectorPool(poolId: string, blob: EncryptedBlob): Promise<EncryptedBlob> {
  ensureSDK();
  return sdkJoinPool(poolId, blob);
}

export async function computeCollectorPool(poolId: string, options: ComputeOptions = {}): Promise<SignedResult> {
  ensureSDK();
  return sdkComputePool(poolId, options);
}

export function verifyResult(result: SignedResult): boolean {
  return sdkVerifyResult(result);
}

export function encryptChoice(choice: string): string {
  const nonce = randomNonce();
  const combined = `${nonce}::${choice}`;
  return encodeBase64(combined);
}

export function maskedCiphertext(): string {
  return "[ENCRYPTED_PAYLOAD]";
}

function randomNonce() {
  return Math.random().toString(36).slice(2, 10);
}

function encodeBase64(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value, "utf8").toString("base64");
  }
  return window.btoa(unescape(encodeURIComponent(value)));
}

export type { SignedResult };
