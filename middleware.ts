import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "./utils/cookies";

export async function middleware(req: NextRequest) {
  const cookies = parseCookies(req);
  const token = cookies.token;
  const role = cookies.role; // Get role from cookies

  const currentPath = req.nextUrl.pathname;

  // ✅ Redirect users based on role
  if (currentPath.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (currentPath.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ If no token, restrict access to protected pages
  if (
    !token &&
    (currentPath.startsWith("/user") || currentPath.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect specific routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
