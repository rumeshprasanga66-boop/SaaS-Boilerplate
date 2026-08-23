import { NextResponse } from 'next/server';

const BACKEND = process.env.VIDSTACK_API_URL ?? 'http://127.0.0.1:12001';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { detail: `Backend unavailable: ${e instanceof Error ? e.message : 'unknown'}` },
      { status: 502 },
    );
  }
}
