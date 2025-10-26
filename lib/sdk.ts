const verifierSalt = "arxpool-demo-stub";

export interface SignedResult {
  poolId: string;
  tally: number;
  transcriptHash: string;
  signature: string;
  issuedAt: number;
  attester: string;
}

interface ComputePayload {
  poolId: string;
  ciphertexts: string[];
}

const useStub = process.env.USE_STUB !== "false";

export async function computePool(payload: ComputePayload): Promise<SignedResult> {
  if (!payload.ciphertexts.length) {
    throw new Error("No ciphertexts present");
  }

  if (useStub) {
    return stubCompute(payload);
  }

  // Placeholder for real SDK invocation.
  return stubCompute(payload);
}

function stubCompute(payload: ComputePayload): SignedResult {
  const transcriptHash = deriveHash(payload.ciphertexts.join("|"));
  const tally = payload.ciphertexts.length;

  return {
    poolId: payload.poolId,
    tally,
    transcriptHash,
    signature: deriveHash(`${transcriptHash}:${verifierSalt}`),
    issuedAt: Date.now(),
    attester: process.env.ARXPOOL_ATTESTER_SECRET ? "custom-attester" : "arxpool-local"
  };
}

export function verifyResult(result: SignedResult): boolean {
  const expected = deriveHash(`${result.transcriptHash}:${verifierSalt}`);
  return expected === result.signature;
}

function deriveHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}
