import ContainerLayout from "@/layouts/ContainerLayout";
import { notFound } from "next/navigation";

interface JobDetails {
  id: string;
  slug: string;
  title: string;
  company: string;
  client?: string;
  location: string;
  jobType: string;
  vacancies: number;
  gender?: string;
  education?: string;
  experience: string;
  salary: string;
  benefits?: string[];
  workingHours?: string;
  weeklyOff?: string;
  joining?: string;
  vehicleRequired?: string;
  description?: string;
  createdAt: string;
}

async function getJobBySlug(slug: string): Promise<JobDetails | null> {
  try {
    // Fetch all jobs to find the one with matching slug
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?limit=100`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch jobs:", res.status);
      return null;
    }

    const data = await res.json();
    const jobs = data.jobs || [];

    // Find job by slug
    const job = jobs.find((j: JobDetails) => j.slug === slug);
    return job || null;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const job = await getJobBySlug(slug);

  if (!job) return notFound();

  return (
    <ContainerLayout>
      <div className="px-4 sm:px-12 max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{job.title}</h1>
          <p className="text-2xl text-indigo-400 font-semibold">{job.company}</p>
          {job.client && <p className="text-gray-400 text-sm mt-2">Client: {job.client}</p>}
          <p className="text-gray-400 mt-3 flex flex-wrap gap-3">
            <span>📍 {job.location}</span>
            <span>•</span>
            <span>💼 {job.jobType}</span>
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {job.vacancies && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Vacancies</p>
              <p className="text-white text-2xl font-bold">{job.vacancies}</p>
            </div>
          )}
          {job.salary && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Salary</p>
              <p className="text-white text-xl font-bold">{job.salary}</p>
            </div>
          )}
          {job.experience && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Experience</p>
              <p className="text-white text-lg font-bold">{job.experience}</p>
            </div>
          )}
          {job.jobType && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Job Type</p>
              <p className="text-white text-lg font-bold">{job.jobType}</p>
            </div>
          )}
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-5">Job Requirements</h2>
            <div className="space-y-4">
              {job.education && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Education</p>
                  <p className="text-white mt-1">{job.education}</p>
                </div>
              )}
              {job.gender && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Gender</p>
                  <p className="text-white mt-1">{job.gender}</p>
                </div>
              )}
              {job.vehicleRequired && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Vehicle Required</p>
                  <p className="text-white mt-1">{job.vehicleRequired}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-5">Job Terms</h2>
            <div className="space-y-4">
              {job.workingHours && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Working Hours</p>
                  <p className="text-white mt-1">{job.workingHours}</p>
                </div>
              )}
              {job.weeklyOff && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Weekly Off</p>
                  <p className="text-white mt-1">{job.weeklyOff}</p>
                </div>
              )}
              {job.joining && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">Joining Date</p>
                  <p className="text-white mt-1">{job.joining}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        {job.description && (
          <div className="bg-secondary-background border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
        )}

        {/* Posted Date */}
        {job.createdAt && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Posted on {new Date(job.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}</p>
          </div>
        )}
      </div>
    </ContainerLayout>
  );
}
