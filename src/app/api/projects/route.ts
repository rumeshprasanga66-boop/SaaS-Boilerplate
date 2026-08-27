import { NextResponse } from 'next/server';

const BACKEND = process.env.VIDSTACK_API_URL ?? 'http://127.0.0.1:12001';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/projects`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { total: 0, projects: [], detail: `Backend unavailable: ${e instanceof Error ? e.message : 'unknown'}` },
      { status: 200 },
    );
  }
}
