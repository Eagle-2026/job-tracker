import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Import the ExtendedSession type
import type { ExtendedSession } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null;

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 });
  }

  const jobs = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { dateApplied: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null;

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, company, location, interview = false, offer = false } = body;

  try {
    const job = await prisma.jobApplication.create({
      data: {
        title,
        company,
        location,
        interview,
        offer,
        userId: session.user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to add job" }, { status: 500 });
  }
}
