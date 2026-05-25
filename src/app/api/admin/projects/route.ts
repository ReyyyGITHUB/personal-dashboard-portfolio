import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/admin-data";
import type { Project } from "@/lib/admin-data";

export async function GET() {
  const data = readData();
  return NextResponse.json(data.projects);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();

    // Validasi slug unik
    const slugExists = data.projects.some((p) => p.slug === body.slug);
    if (slugExists) {
      return NextResponse.json({ ok: false, error: "Slug sudah dipakai project lain." }, { status: 400 });
    }

    const newProject: Project = {
      slug: body.slug,
      title: body.title,
      type: body.type,
      summary: body.summary,
      result: body.result,
      stack: body.stack ?? [],
      image: body.image ?? "",
      accent: body.accent ?? "bg-clay-violet",
      role: body.role,
      status: body.status ?? "Draft",
      year: body.year ?? String(new Date().getFullYear()),
      problem: body.problem ?? "",
      process: body.process ?? [],
      solution: body.solution ?? "",
      proof: body.proof ?? [],
      links: body.links ?? [],
    };

    data.projects.push(newProject);
    writeData(data);

    return NextResponse.json({ ok: true, project: newProject });
  } catch {
    return NextResponse.json({ ok: false, error: "Gagal menyimpan project." }, { status: 500 });
  }
}
