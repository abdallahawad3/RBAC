import { NextRequest } from "next/server";

export function parseCookies(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return {};

  return Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")));
}
