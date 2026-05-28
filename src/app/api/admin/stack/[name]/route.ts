import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/admin-data";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    const body = await request.json();
    const data = readData();

    const idx = data.techItems.findIndex(
      (t) => t.name.toLowerCase() === decodedName.toLowerCase()
    );
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Tech item tidak ditemukan." }, { status: 404 });
    }

    data.techItems[idx] = { ...data.techItems[idx], ...body };
    writeData(data);

    return NextResponse.json({ ok: true, item: data.techItems[idx] });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal update tech item." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);
    const data = readData();

    const idx = data.techItems.findIndex(
      (t) => t.name.toLowerCase() === decodedName.toLowerCase()
    );
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Tech item tidak ditemukan." }, { status: 404 });
    }

    data.techItems.splice(idx, 1);
    writeData(data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal menghapus tech item." }, { status: 500 });
  }
}
