import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true, // show only active jobs
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        company: true,
        location: true,
        experience: true,
        jobType: true,
        createdAt: true,
      },
      take: 6,
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("FETCH_RECENT_JOBS_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch recent jobs" },
      { status: 500 }
    );
  }
}
