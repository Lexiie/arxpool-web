import { NextResponse } from "next/server";
import { appendCiphertext, getPool } from "../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.poolId || !body?.ciphertext) {
    return NextResponse.json({ error: "poolId and ciphertext required" }, { status: 400 });
  }

  const pool = getPool(body.poolId);
  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  try {
    appendCiphertext(pool.id, String(body.ciphertext));
    return NextResponse.json({ ok: true, ciphertextCount: pool.ciphertexts.length });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
