import { NextResponse } from "next/server";
import { computeCollectorPool } from "../../../../lib/sdk";
import { getPool, saveResult } from "../../../../lib/store";

interface ComputePayload {
  poolId: string;
}

export async function POST(request: Request) {
  let payload: ComputePayload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { poolId } = payload;
  if (!poolId) {
    return NextResponse.json({ error: "poolId is required" }, { status: 400 });
  }

  const pool = getPool(poolId);
  if (!pool) {
    return NextResponse.json({ error: "Pool not found" }, { status: 404 });
  }

  try {
    const result = await computeCollectorPool(poolId, {
      metadata: { requestedBy: "demo-ui" }
    });
    saveResult(poolId, result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
