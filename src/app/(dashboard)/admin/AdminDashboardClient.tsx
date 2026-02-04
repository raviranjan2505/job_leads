"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiBriefcase, FiFileText, FiUserCheck, FiTrendingUp, FiPlus, FiClock, FiLoader } from "react-icons/fi";

interface DashboardData {
  stats: {
    totalJobs: number;
    activeJobs: number;
    candidateEnquiries: number;
    clientEnquiries: number;
    candidateEnquiriesWithResume: number;
  };
  recentJobs: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    isActive: boolean;
    createdAt: string;
  }>;
  metrics: {
    activeJobsPercentage: number;
    applicationRate: number;
    clientEnquiryRate: number;
  };
}

export default function AdminDashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const dashboardData = await res.json();
          setData(dashboardData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FiLoader className="animate-spin text-indigo-600" size={40} />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <p className="text-gray-600 font-medium">Failed to load dashboard data</p>
      </div>
    );
  }

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const getJobStatus = (isActive: boolean) => {
    return isActive 
      ? { text: "Active", bgColor: "bg-green-100", textColor: "text-green-600" }
      : { text: "Inactive", bgColor: "bg-gray-100", textColor: "text-gray-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your admin overview</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/jobs/create"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            <FiPlus size={20} />
            <span>Add Job</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Jobs Card */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiBriefcase className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {data.metrics.activeJobsPercentage}% active
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data.stats.totalJobs}</p>
          <p className="text-xs text-gray-500 mt-3">{data.stats.activeJobs} active jobs</p>
        </div>

        {/* Active Jobs Card */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
              {data.metrics.activeJobsPercentage}%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data.stats.activeJobs}</p>
          <p className="text-xs text-gray-500 mt-3">Currently active postings</p>
        </div>

        {/* Candidate Enquiries Card */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUserCheck className="text-green-600" size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
              {data.stats.candidateEnquiriesWithResume}/{data.stats.candidateEnquiries}
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Candidate Enquiries</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data.stats.candidateEnquiries}</p>
          <p className="text-xs text-gray-500 mt-3">{data.stats.candidateEnquiriesWithResume} with resumes</p>
        </div>

        {/* Client Enquiries Card */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FiFileText className="text-orange-600" size={24} />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
              {data.metrics.clientEnquiryRate}%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">Client Enquiries</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data.stats.clientEnquiries}</p>
          <p className="text-xs text-gray-500 mt-3">Total enquiries received</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Job Postings</h2>
            <Link href="/admin/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {data.recentJobs.length > 0 ? (
              data.recentJobs.map((job) => {
                const status = getJobStatus(job.isActive);
                return (
                  <div key={job.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{job.title}</h3>
                      <span className={`text-xs font-semibold ${status.textColor} ${status.bgColor} px-2 py-1 rounded`}>
                        {status.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.company} - {job.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock size={14} />
                        {getTimeAgo(job.createdAt)}
                      </span>
                      <Link href={`/admin/jobs/${job.id}`} className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">No jobs posted yet</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Stats</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Active Jobs</span>
                <span className="text-sm font-bold text-slate-900">{data.metrics.activeJobsPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${data.metrics.activeJobsPercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Application Rate</span>
                <span className="text-sm font-bold text-slate-900">{data.metrics.applicationRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${data.metrics.applicationRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Client Enquiry Rate</span>
                <span className="text-sm font-bold text-slate-900">{data.metrics.clientEnquiryRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${data.metrics.clientEnquiryRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6"></div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href="/admin/jobs"
              className="block w-full text-center px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Manage Jobs
            </Link>
            <Link
              href="/admin/candidate-enquiry"
              className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Enquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
