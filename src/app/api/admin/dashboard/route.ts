import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all counts in parallel
    const [totalJobs, activeJobs, candidateEnquiries, clientEnquiries, candidateEnquiriesWithResume] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.candidateEnquiry.count(),
      prisma.clientEnquiry.count(),
      prisma.candidateEnquiry.count({ where: { resume: { not: null } } }),
    ]);

    // Fetch recent jobs (last 5)
    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Fetch jobs by status for pie chart data
    const activeJobsCount = activeJobs;
    const inactiveJobsCount = totalJobs - activeJobs;

    // Calculate application rate (candidate enquiries with resume vs without)
    const applicationsWithResume = candidateEnquiriesWithResume;
    const applicationsWithoutResume = candidateEnquiries - candidateEnquiriesWithResume;
    const applicationRate = candidateEnquiries > 0 
      ? Math.round((applicationsWithResume / candidateEnquiries) * 100) 
      : 0;

    return NextResponse.json(
      {
        stats: {
          totalJobs,
          activeJobs,
          candidateEnquiries,
          clientEnquiries,
          candidateEnquiriesWithResume,
        },
        recentJobs,
        metrics: {
          activeJobsPercentage: totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0,
          applicationRate,
          clientEnquiryRate: candidateEnquiries > 0 
            ? Math.round((clientEnquiries / (candidateEnquiries + clientEnquiries)) * 100) 
            : 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DASHBOARD_STATS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
