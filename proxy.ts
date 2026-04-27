import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";
import { sessionOptions, type AdminSession } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/giris") || pathname === "/api/auth/login") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/phones") && !pathname.startsWith("/api/upload")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getIronSession<AdminSession>(req, res, sessionOptions);

  if (!session.isAdmin) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/giris";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/phones/:path*", "/api/upload"],
};
