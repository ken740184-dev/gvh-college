import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Stats from "@/models/Stats";

const DEFAULTS = {
  yearsOfExcellence: 25,
  totalStudents: 5000,
  faculty: 150,
  programs: 20,
  studentsBase: 5000,
  yearlyGraduates: [] as any[],
};

// ─── GET: public endpoint – returns current stat values ──────────────────────
export async function GET() {
  try {
    await connectToDatabase();
    let doc = await Stats.findOne().lean();
    if (!doc) {
      // Return defaults if no record exists yet
      return NextResponse.json({ success: true, stats: DEFAULTS });
    }
    return NextResponse.json({ success: true, stats: doc });
  } catch (err: any) {
    console.error("Stats GET error:", err);
    return NextResponse.json({ success: true, stats: DEFAULTS });
  }
}

// ─── PUT: update top-level stat numbers (admin only) ─────────────────────────
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { yearsOfExcellence, faculty, programs, studentsBase } = body;

    await connectToDatabase();
    let doc = await Stats.findOne();

    if (!doc) {
      doc = new Stats(DEFAULTS);
    }

    if (yearsOfExcellence !== undefined) doc.yearsOfExcellence = Number(yearsOfExcellence);
    if (faculty !== undefined) doc.faculty = Number(faculty);
    if (programs !== undefined) doc.programs = Number(programs);
    if (studentsBase !== undefined) {
      doc.studentsBase = Number(studentsBase);
      // Recalculate total from new base + existing yearly graduates
      const yearlySum = (doc.yearlyGraduates as any[]).reduce(
        (s: number, g: any) => s + (g.count || 0), 0
      );
      doc.totalStudents = Number(studentsBase) + yearlySum;
    }

    doc.updatedBy = (session as any).user?.id;
    await doc.save();

    return NextResponse.json({ success: true, stats: doc.toObject() });
  } catch (err: any) {
    console.error("Stats PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST: add a yearly graduate entry (admin only) ──────────────────────────
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { year, count, note, action } = await req.json();

    await connectToDatabase();
    let doc = await Stats.findOne();
    if (!doc) {
      doc = new Stats(DEFAULTS);
    }

    if (action === "delete_graduate") {
      // Remove a yearly entry by index
      const idx = Number(count); // repurpose count field for index when deleting
      if (idx >= 0 && idx < doc.yearlyGraduates.length) {
        doc.yearlyGraduates.splice(idx, 1);
      }
    } else {
      // Add new yearly entry
      if (!year || !count || Number(count) < 0) {
        return NextResponse.json(
          { error: "Year and count are required" },
          { status: 400 }
        );
      }
      doc.yearlyGraduates.push({
        year: String(year).trim(),
        count: Number(count),
        note: note || "",
        addedAt: new Date(),
      });
    }

    // Recalculate total
    const yearlySum = (doc.yearlyGraduates as any[]).reduce(
      (s: number, g: any) => s + (g.count || 0), 0
    );
    doc.totalStudents = (doc.studentsBase || 0) + yearlySum;
    doc.updatedBy = (session as any).user?.id;
    await doc.save();

    return NextResponse.json({ success: true, stats: doc.toObject() });
  } catch (err: any) {
    console.error("Stats POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
