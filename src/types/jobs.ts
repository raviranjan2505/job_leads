// Pagination params (same pattern as posts)
export interface FetchJobsParams {
  pageParam?: string | null;
  limit?: number;
}

// Job summary (list page)
export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string | null;
  vacancies: number;
  createdAt: string;
}

// Full job details
export interface JobDetails extends Job {
  client: string;
  gender: string;
  education: string;
  workingHours: string;
  weeklyOff: string;
  joining: string;
  vehicleRequired: string;
  benefits: string[];
  description: string[];
}

// API response for paginated jobs
export interface FetchJobsResponse {
  jobs: JobListItem[];
  nextCursor: string | null;
}


export interface SearchJobsParams {
  q: string;
  limit?: number;
}

export interface SearchJobsResponse {
  jobs: Pick<
    Job,
    | "id"
    | "slug"
    | "title"
    | "company"
    | "location"
    | "experience"
    | "jobType"
  >[];
}

export interface JobListItem {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string | null;
  createdAt: string;
}
