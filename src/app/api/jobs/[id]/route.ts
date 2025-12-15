// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function DELETE(req: NextRequest, { params }: any) {
//   try {
//     const id = params.id as string;

//     // Check if the job exists
//     const job = await prisma.jobApplication.findUnique({ where: { id } });
//     if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

//     await prisma.jobApplication.delete({ where: { id } });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE ERROR:", error);
//     return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
//   }
// }

// // PATCH (update) a job application
// export async function PATCH(req: NextRequest, { params }: any) {
//   try {
//     const id = params.id as string;
//     const body = await req.json();

//     // Check if the job exists
//     const job = await prisma.jobApplication.findUnique({ where: { id } });
//     if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

//     const updatedJob = await prisma.jobApplication.update({
//       where: { id },
//       data: body,
//     });
//     return NextResponse.json(updatedJob);
//   } catch (error) {
//     console.error("PATCH ERROR:", error);
//     return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
//   }
// }
// app/api/jobs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE job
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const job = await prisma.jobApplication.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

    await prisma.jobApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
  }
}

// PATCH (update) job
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json(); // this contains updated fields: title, company, location, interview, offer
    const job = await prisma.jobApplication.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ message: "Job not found" }, { status: 404 });

    const updatedJob = await prisma.jobApplication.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
  }
}
