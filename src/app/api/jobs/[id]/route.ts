import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



// DELETE job
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);
  console.log("Job ID to delete:", params.id);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find the job
    const job = await prisma.jobApplication.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Delete the job
    const deletedJob = await prisma.jobApplication.delete({
      where: { id: job.id },
    });

    console.log("Deleted job:", deletedJob);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting job:", error.message);
    return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
  }
}

// PATCH (update job)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);
  console.log("Job ID to update:", params.id);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Update data:", body);

    const job = await prisma.jobApplication.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Only update fields provided
    const updatedJob = await prisma.jobApplication.update({
      where: { id: job.id },
      data: {
        title: body.title || job.title,
        company: body.company || job.company,
        location: body.location !== undefined ? body.location : job.location,
        interview: body.interview !== undefined ? Boolean(body.interview) : job.interview,
        offer: body.offer !== undefined ? Boolean(body.offer) : job.offer,
      },
    });

    console.log("Updated job:", updatedJob);

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error("Error updating job:", error.message);
    return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
  }
}


