"use client";

import { useState } from "react";
import { FiMail, FiDownload, FiTrash2, FiMessageSquare } from "react-icons/fi";

interface CandidateEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  resume: string | null;
  status: string;
  createdAt: string;
}

interface CandidateEnquiryListProps {
  initialEnquiries: CandidateEnquiry[];
}

export default function CandidateEnquiryList({
  initialEnquiries,
}: CandidateEnquiryListProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/enquiry/candidate?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        setDeleteConfirm(null);
        alert("Enquiry and resume deleted successfully");
      } else {
        alert("Failed to delete enquiry");
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      alert("Error deleting enquiry");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      contacted: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return badges[status] || badges.pending;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-8 text-center">
            <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={40} />
            <p className="text-gray-500 font-medium">No enquiries yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Resume
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{enquiry.name}</p>
                        <p className="text-sm text-gray-500">{enquiry.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-2"
                      >
                        <FiMail size={16} />
                        {enquiry.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900 font-medium">{enquiry.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      {enquiry.resume ? (
                        <a
                          href={enquiry.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-2"
                        >
                          <FiDownload size={16} />
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No resume</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(
                          enquiry.status
                        )}`}
                      >
                        {enquiry.status.charAt(0).toUpperCase() +
                          enquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDeleteConfirm(enquiry.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-2"
                      >
                        <FiTrash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Delete Enquiry?
            </h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete the enquiry and remove the resume from
              Cloudinary. This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">Total Enquiries</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{enquiries.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">With Resume</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {enquiries.filter((e) => e.resume).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">Pending Response</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {enquiries.filter((e) => e.status === "pending").length}
          </p>
        </div>
      </div>
    </>
  );
}
