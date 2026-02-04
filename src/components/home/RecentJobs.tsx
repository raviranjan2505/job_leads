import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";

interface Job {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  jobType: string;
  experience: string;
  createdAt: string;
}

export default async function RecentJobs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/recent`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch recent jobs");
      return null;
    }

    const { jobs }: { jobs: Job[] } = await res.json();

    if (!jobs || jobs.length === 0) {
      return null;
    }

    return (
      <div className="space-y-2 mb-10">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
          Recent Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-xl overflow-hidden bg-[#0B0B0B] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 p-5 space-y-3"
            >
              {/* Header with company and job type */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-400">{job.company}</p>
              </div>

              {/* Job details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <IoLocationOutline size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MdBusinessCenter size={16} />
                  <span>{job.jobType}</span>
                </div>
              </div>

              {/* Experience badge */}
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-300">
                  {job.experience}
                </span>
              </div>

              {/* Created Date */}
              <time className="text-xs text-gray-500">
                {new Date(job.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>

              {/* View button */}
              <Link
                href={`/jobs/${job.slug}`}
                className="inline-block text-sm font-medium text-indigo-400 hover:underline mt-2"
              >
                View Job →
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading recent jobs:", error);
    return null;
  }
}
