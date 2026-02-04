
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await verifyAdmin();

if (!admin) {
  return NextResponse.json({ error: "Admin access only" }, { status: 401 });
}


    const body = await req.json();

    const {
      title,
      company,
      client,
      location,
      jobType,
      vacancies,
      gender,
      education,
      experience,
      salary,
      benefits,
      workingHours,
      weeklyOff,
      joining,
      vehicleRequired,
      description,
    } = body;

    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !vacancies ||
      !experience ||
      !salary
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (await prisma.job.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const job = await prisma.job.create({
      data: {
        title,
        slug,
        company,
        client,
        location,
        jobType,
        vacancies: Number(vacancies),
        gender,
        education,
        experience,
        salary,
        benefits,
        workingHours,
        weeklyOff,
        joining,
        vehicleRequired,
        description,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("CREATE_JOB_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const DEFAULT_LIMIT = 5;
//     const cursor = searchParams.get("cursor");
//     const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

//     const jobs = await prisma.job.findMany({
//       take: limit + 1,
//       orderBy: {
//         createdAt: "desc",
//       },
//       cursor: cursor ? { id: cursor } : undefined,
//       skip: cursor ? 1 : 0,
//       where: {
//         isActive: true,
//       },
//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         company: true,
//         location: true,
//         jobType: true,
//         experience: true,
//         salary: true,
//         createdAt: true,
//       },
//     });

//     const hasMore = jobs.length > limit;
//     const items = hasMore ? jobs.slice(0, limit) : jobs;
//     const nextCursor = hasMore ? items[items.length - 1].id : null;

//     return NextResponse.json({
//       jobs: items,
//       nextCursor,
//     });
//   } catch (error) {
//     console.error("FETCH_JOBS_ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch jobs" },
//       { status: 500 }
//     );
//   }
// }


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const DEFAULT_LIMIT = 5;
    const cursor = searchParams.get("cursor");
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    // Fetch limit + 1 to check if there are more
    const jobs = await prisma.job.findMany({
      take: limit + 1,
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        slug: true,
        company: true,
        client: true,
        location: true,
        jobType: true,
        vacancies: true,
        gender: true,
        education: true,
        experience: true,
        salary: true,
        benefits: true,
        workingHours: true,
        weeklyOff: true,
        joining: true,
        vehicleRequired: true,
        description: true,
        createdAt: true,
      },
    });

    // Slice the extra item
    const hasMore = jobs.length > limit;
    const items = hasMore ? jobs.slice(0, limit) : jobs;

    // Always use the **last item's id as next cursor**
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    return NextResponse.json({ jobs: items, nextCursor });
  } catch (error) {
    console.error("FETCH_JOBS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
