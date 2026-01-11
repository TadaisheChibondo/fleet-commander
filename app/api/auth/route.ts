import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.pass === process.env.FLEET_PASSWORD) {
    // FIX: We must 'await' the cookies() call in Next.js 15
    const cookieStore = await cookies();
    cookieStore.set("fleet_auth", "true", { maxAge: 60 * 60 * 24 * 30 });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
