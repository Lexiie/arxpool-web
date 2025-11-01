import { NextResponse } from "next/server";
import { getPool } from "../../../lib/store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const poolId = url.searchParams.get("poolId");

  if (!poolId) {
    return NextResponse.json({ error: "poolId query parameter is required" }, { status: 400 });
  }

  const pool = getPool(poolId);
  if (!pool?.result) {
    return NextResponse.json({ error: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(pool.result);
}
