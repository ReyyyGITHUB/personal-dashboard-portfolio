import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET ?? "default-secret";

  if (username === validUser && password === validPass) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", secret, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Username atau password salah." }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
