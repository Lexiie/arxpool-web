import { NextResponse } from "next/server";
import { maskedCiphertext, joinCollectorPool } from "../../../lib/sdk";
import { appendBlob, getPool } from "../../../lib/store";

interface JoinPayload {
  poolId: string;
  ciphertext: string;
  senderPubkey?: string;
}

export async function POST(request: Request) {
  let payload: JoinPayload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { poolId, ciphertext, senderPubkey } = payload;
  if (!poolId || !ciphertext) {
    return NextResponse.json({ error: "poolId and ciphertext are required" }, { status: 400 });
  }

  const pool = getPool(poolId);
  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  try {
    await joinCollectorPool(poolId, {
      ciphertext: String(ciphertext),
      senderPubkey: senderPubkey?.trim() || "anon"
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

  appendBlob(poolId, {
    ciphertext: maskedCiphertext(),
    senderPubkey: senderPubkey?.trim() || "anon"
  });

  return NextResponse.json({ ok: true, count: pool.blobs.length });
}
