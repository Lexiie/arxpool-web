import { NextResponse } from "next/server";
import { createPool, getPool } from "../../../../lib/store";
import { createCollectorPool, initSDK } from "../../../../lib/sdk";

interface CreatePoolPayload {
  id: string;
  title: string;
  options: string[];
}

export async function POST(request: Request) {
  let payload: CreatePoolPayload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { id, title, options } = payload;

  if (!id || !title || !Array.isArray(options) || options.length === 0) {
    return NextResponse.json({ error: "id, title, and options[] are required" }, { status: 400 });
  }

  if (getPool(id)) {
    return NextResponse.json({ error: "Pool already exists" }, { status: 409 });
  }

  const normalized = options.map((opt) => String(opt).trim()).filter(Boolean);
  if (!normalized.length) {
    return NextResponse.json({ error: "options[] must contain at least one value" }, { status: 400 });
  }

  try {
    initSDK();
    await createCollectorPool({ id, title: title.trim(), options: normalized });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }

  createPool({ id, title: title.trim(), options: normalized });

  return NextResponse.json({ ok: true, id });
}
