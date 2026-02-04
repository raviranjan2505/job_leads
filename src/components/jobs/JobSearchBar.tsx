"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/custom-hooks/useJobs";
import { useQuery } from "@tanstack/react-query";
import { searchJobs } from "@/services/jobs";

export default function JobSearchBar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const router = useRouter();

  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["search-jobs", debouncedQuery],
    queryFn: () => searchJobs({ q: debouncedQuery, limit: 8 }),
    enabled: debouncedQuery.length > 1, // prevent useless requests
  });

  const handleNavigate = (slug: string) => {
    router.push(`/jobs/${slug}`);
    setQuery("");
    setShowResults(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/jobs/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-secondary-background border border-white/10 rounded-xl px-4 py-2 focus-within:border-indigo-500 transition">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => query && setShowResults(true)}
            type="text"
            placeholder="Search jobs by title or company..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            className="ml-2 text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-secondary-background border border-white/10 rounded-xl overflow-hidden z-50 shadow-lg">
          <div className="max-h-80 overflow-y-auto divide-y divide-white/10">
            {/* Loading State */}
            {(isLoading || isFetching) && (
              <div className="px-4 py-3 text-gray-400 text-sm">Searching...</div>
            )}

            {/* No Results */}
            {!isLoading && !isFetching && results.length === 0 && (
              <div className="px-4 py-3 text-gray-400 text-sm">
                No jobs found matching "{query}"
              </div>
            )}

            {/* Results List */}
            {results.map((result: any) => (
              <button
                onClick={() => handleNavigate(result.slug)}
                key={result.id}
                className="w-full text-left px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white cursor-pointer"
              >
                <div className="font-medium">{result.title}</div>
                <div className="text-xs text-gray-500">
                  {result.company} • {result.location}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
