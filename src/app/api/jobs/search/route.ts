import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q")?.trim();
    const limit = Number(searchParams.get("limit")) || 10;

    if (!query || query.length < 2) {
      return NextResponse.json({ jobs: [] });
    }

    // Search across multiple fields: title, location, company, education
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            client: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            education: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        company: true,
        client: true,
        location: true,
        jobType: true,
        education: true,
        experience: true,
        salary: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("SEARCH_JOBS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to search jobs", jobs: [] },
      { status: 500 }
    );
  }
}
