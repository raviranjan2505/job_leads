import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { FetchJobsResponse, SearchJobsResponse } from "@/types/jobs";
import { deleteJob, fetchJobs, searchJobs } from "@/services/jobs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useInfiniteJobs({ limit }: { limit: number }) {
  return useInfiniteQuery<FetchJobsResponse>({
    queryKey: ["jobs"],
    queryFn: ({ pageParam }) =>
      fetchJobs({
        pageParam: pageParam as string | null,
        limit,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      router.replace("/jobs");
    },
    onError: (error) => {
      console.error("DELETE_JOB_ERROR:", error);
      alert("Failed to delete job");
    },
  });
}

export function useSearchJobs(query: string, limit = 5) {
  return useQuery({
    queryKey: ["search-jobs", query],
    queryFn: () => searchJobs({ q: query, limit }),
    enabled: query.length > 1, // prevent useless requests
  });
}

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
