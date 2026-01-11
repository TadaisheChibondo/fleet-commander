import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check if user has the "auth" cookie
  const authCookie = request.cookies.get("fleet_auth");

  // 2. If they are already on the login page, let them pass
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  // 3. If no cookie, kick them to /login
  if (authCookie?.value !== "true") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Only protect the dashboard page
export const config = {
  matcher: ["/"],
};
