
import { verifyAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

/* =========================
   GET JOB BY ID
========================= */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{jobId: string }>}
) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;
    console.log(jobId, "jobid frm fronend")
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("FETCH_JOB_ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

/* =========================
   UPDATE JOB
========================= */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{jobId: string }> }
) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
const { jobId } = await params;
    const existingJob = await prisma.job.findUnique({
      where: { id:jobId },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const body = await req.json();

    let slug = existingJob.slug;

    // Regenerate slug if title changed
    if (body.title && body.title !== existingJob.title) {
      const baseSlug = slugify(body.title, { lower: true, strict: true });
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await prisma.job.findFirst({
          where: { slug: uniqueSlug, NOT: { id: jobId } },
        })
      ) {
        uniqueSlug = `${baseSlug}-${counter++}`;
      }

      slug = uniqueSlug;
    }

    const updated = await prisma.job.update({
      where: { id:jobId },
      data: {
        ...body,
        slug,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE_JOB_ERROR:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}


/* =========================
   DELETE JOB
========================= */
export async function DELETE(
  _req: Request,
   { params }: { params: Promise<{jobId: string }> }
) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await params;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE_JOB_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
