import ContainerLayout from "@/layouts/ContainerLayout";
import Link from "next/link";

interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  experience: string;
}

interface FetchJobsResponse {
  jobs: Job[];
  nextCursor: string | null;
}

async function getAllJobs(): Promise<Job[]> {
  let allJobs: Job[] = [];
  let cursor: string | null = null;

  try {
    // Fetch all jobs with pagination
    while (true) {
      const params = new URLSearchParams();
      if (cursor) params.append("cursor", cursor);
      params.append("limit", "100");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        console.error("Failed to fetch jobs");
        break;
      }

      const data: FetchJobsResponse = await res.json();
      allJobs = [...allJobs, ...data.jobs];

      if (!data.nextCursor) break;
      cursor = data.nextCursor;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return allJobs;
}

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <ContainerLayout>
      <div className="px-4 sm:px-12">
        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          Current Job Openings
        </h1>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-secondary-background border border-white/10 rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {job.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Experience: {job.experience}
                  </p>
                </div>

                <Link
                  href={`/jobs/${job.slug}`}
                  className="px-6 py-2 rounded-full bg-indigo-600 text-white"
                >
                  View Job Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </ContainerLayout>
  );
}
