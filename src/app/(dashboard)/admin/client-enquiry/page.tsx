import { FiMail, FiPhone, FiCalendar, FiMessageSquare } from "react-icons/fi";
import Link from "next/link";

interface ClientEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

async function getClientEnquiries(): Promise<ClientEnquiry[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/enquiry/client`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch client enquiries");
      return [];
    }

    const data = await res.json();
    return data.enquiries || [];
  } catch (error) {
    console.error("Error fetching client enquiries:", error);
    return [];
  }
}

export default async function ClientEnquiryPage() {
  const enquiries = await getClientEnquiries();

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      contacted: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Client Enquiries</h1>
        <p className="text-gray-600 mt-2">Manage client enquiry submissions</p>
      </div>

      {/* Enquiries Table */}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
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
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(
                          enquiry.status
                        )}`}
                      >
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">Total Enquiries</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{enquiries.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {enquiries.filter((e) => e.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-medium">Resolved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {enquiries.filter((e) => e.status === "resolved").length}
          </p>
        </div>
      </div>
    </div>
  );
}
