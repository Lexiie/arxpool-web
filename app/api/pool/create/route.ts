import { NextResponse } from "next/server";
import { createPool, serializePool } from "../../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const pool = createPool({ name: body?.name, policy: body?.policy });
  return NextResponse.json({ poolId: pool.id, attestation: pool.attestation, pool: serializePool(pool) });
}
