import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Inject pathname ke header agar root layout bisa detect admin route
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Proteksi /admin/* kecuali /admin (login page) itu sendiri
  if (pathname !== "/admin" && pathname !== "/admin/" && pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");
    const secret = process.env.ADMIN_SECRET ?? "default-secret";

    if (!session || session.value !== secret) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Match semua routes kecuali static files dan _next
    "/((?!_next/static|_next/image|favicon.ico|icons|images|projects|public).*)",
  ],
};
