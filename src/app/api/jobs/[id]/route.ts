import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



// DELETE job
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const job = await prisma.jobApplication.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

  await prisma.jobApplication.delete({ where: { id: job.id } });
  return NextResponse.json({ success: true });
}
// PATCH
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params; // await the promise
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const job = await prisma.jobApplication.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

  const updatedJob = await prisma.jobApplication.update({
    where: { id: job.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.company && { company: body.company }),
      ...(body.location && { location: body.location }),
      ...(body.interview !== undefined && { interview: Boolean(body.interview) }),
      ...(body.offer !== undefined && { offer: Boolean(body.offer) }),
    },
  });

  return NextResponse.json(updatedJob);
}


