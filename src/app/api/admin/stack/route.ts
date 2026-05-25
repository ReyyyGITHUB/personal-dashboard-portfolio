import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/admin-data";
import type { TechItem } from "@/lib/admin-data";

export async function GET() {
  const data = readData();
  return NextResponse.json(data.techItems);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();

    const nameExists = data.techItems.some(
      (t) => t.name.toLowerCase() === String(body.name).toLowerCase()
    );
    if (nameExists) {
      return NextResponse.json({ ok: false, error: "Tech dengan nama ini sudah ada." }, { status: 400 });
    }

    const newItem: TechItem = {
      name: body.name,
      group: body.group ?? "Frontend",
      level: body.level ?? "Comfortable",
      note: body.note ?? "",
    };

    data.techItems.push(newItem);
    writeData(data);

    return NextResponse.json({ ok: true, item: newItem });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal menyimpan tech item." }, { status: 500 });
  }
}
