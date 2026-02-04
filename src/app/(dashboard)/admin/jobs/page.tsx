"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJobs } from "@/services/jobs";
import { JobListItem } from "@/types/jobs";
import { deleteJob } from "@/services/jobs";
export default function JobsPage() {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadJobs = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await fetchJobs({
        pageParam: cursor,
        limit: 5,
      });

      setJobs((prev) => {
        const newJobs = res.jobs.filter(
          (job) => !prev.some((j) => j.id === job.id)
        );
        return [...prev, ...newJobs];
      });
      setCursor(res.nextCursor);
      setHasMore(Boolean(res.nextCursor));
    } catch (error) {
      console.error("FETCH_JOBS_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this job?");
  if (!confirmDelete) return;

  try {
    await deleteJob(id);

    // Remove job from UI instantly
    setJobs((prev) => prev.filter((job) => job.id !== id));
  } catch (error) {
    console.error("DELETE_JOB_ERROR", error);
    alert("Failed to delete job");
  }
};


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Jobs</h1>

        <Link
          href="/admin/jobs/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Job
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Company</th>
            <th className="p-2">Location</th>
            <th className="p-2">Job Type</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="p-2">{job.title}</td>
              <td className="p-2">{job.company}</td>
              <td className="p-2">{job.location}</td>
              <td className="p-2">{job.jobType}</td>
              <td className="p-2">
                <Link
                  href={`/admin/jobs/edit/${job.id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {!loading && jobs.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-4 text-center text-gray-500"
              >
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {hasMore && (
        <button
          onClick={loadJobs}
          disabled={loading}
          className="mt-4 border px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
