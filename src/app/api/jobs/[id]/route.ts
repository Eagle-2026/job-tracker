import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE a job application
export async function DELETE(
  req: NextRequest,
  // Use 'any' to satisfy Next.js typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const id = params.id;
    await prisma.jobApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete job:", error);
    return NextResponse.json(
      { message: "Failed to delete job" },
      { status: 500 }
    );
  }
}

// PATCH (update) a job application
export async function PATCH(
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const id = params.id;
    const body = await req.json();
    const updatedJob = await prisma.jobApplication.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Failed to update job:", error);
    return NextResponse.json(
      { message: "Failed to update job" },
      { status: 500 }
    );
  }
}
