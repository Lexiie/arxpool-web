import { NextResponse } from "next/server";
import { getPool, saveResult } from "../../../../lib/db";
import { computePool } from "../../../../lib/sdk";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.poolId) {
    return NextResponse.json({ error: "poolId required" }, { status: 400 });
  }

  const pool = getPool(body.poolId);
  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  if (!pool.ciphertexts.length) {
    return NextResponse.json({ error: "No ciphertext available" }, { status: 400 });
  }

  try {
    const result = await computePool({ poolId: pool.id, ciphertexts: pool.ciphertexts });
    saveResult(pool.id, result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
