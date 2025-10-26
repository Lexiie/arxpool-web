import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const poolId = searchParams.get("poolId");

  if (!poolId) {
    return NextResponse.json({ error: "poolId query param required" }, { status: 400 });
  }

  const pool = getPool(poolId);
  if (!pool || !pool.result) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(pool.result);
}
