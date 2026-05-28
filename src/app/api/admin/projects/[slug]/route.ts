import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/admin-data";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const data = readData();

    const idx = data.projects.findIndex((p) => p.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Project tidak ditemukan." }, { status: 404 });
    }

    data.projects[idx] = { ...data.projects[idx], ...body, slug };
    writeData(data);

    return NextResponse.json({ ok: true, project: data.projects[idx] });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal update project." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = readData();

    const idx = data.projects.findIndex((p) => p.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Project tidak ditemukan." }, { status: 404 });
    }

    data.projects.splice(idx, 1);
    writeData(data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal menghapus project." }, { status: 500 });
  }
}
