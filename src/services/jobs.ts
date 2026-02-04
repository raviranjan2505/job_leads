import axios from "axios";
import {
  FetchJobsParams,
  FetchJobsResponse,
  SearchJobsParams,
  SearchJobsResponse,
  JobDetails,
} from "@/types/jobs";

/* =========================
   Fetch paginated jobs
========================= */
export async function fetchJobs({
  pageParam,
  limit,
}: FetchJobsParams): Promise<FetchJobsResponse> {
  const res = await axios.get("/api/jobs", {
    params: {
      cursor: pageParam,
      limit,
    },
  });

  return res.data;
}



/* =========================
   Create job
========================= */
export type CreateJobPayload = {
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
};

export async function createJob(payload: CreateJobPayload) {
  const res = await axios.post("/api/jobs", payload);
  return res.data;
}

/* =========================
   Delete job
========================= */
export async function deleteJob(jobId: string) {
  const res = await axios.delete(`/api/jobs/${jobId}`);
  return res.data;
}

/* =========================
   Search jobs
========================= */
export async function searchJobs({
  q,
  limit = 5,
}: SearchJobsParams): Promise<SearchJobsResponse["jobs"]> {
  if (!q) return [];

  const res = await axios.get("/api/jobs/search", {
    params: {
      q,
      limit,
    },
  });

  return res.data.jobs;
}



export type UpdateJobPayload = Partial<{
  title: string;
  company: string;
  client: string;
  location: string;
  jobType: string;
  vacancies: number;
  gender: string;
  education: string;
  experience: string;
  salary: string;
  benefits: string[];
  workingHours: string;
  weeklyOff: string;
  joining: string;
  vehicleRequired: string;
  description: string;
}>;

/* =========================
   Get job by ID
========================= */
export async function getJobById(jobId: string) {
  const res = await axios.get(`/api/jobs/${jobId}`, {
    withCredentials: true, // 🔥 needed for admin auth cookie
  });
  console.log(res.data,"data from fronted")
  return res.data;
  
}

/* =========================
   Update job
========================= */
export async function updateJob(jobId: string, payload: UpdateJobPayload) {
  const res = await axios.patch(`/api/jobs/${jobId}`, payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function getRecentJobs(limit: number = 5): Promise<JobDetails[]> {
  const res = await axios.get("/api/jobs/recent", {
    params: { limit },
  });
  return res.data.jobs;
}