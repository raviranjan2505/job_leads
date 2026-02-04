import CandidateEnquiryList from "./CandidateEnquiryList";

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

async function getCandidateEnquiries(): Promise<CandidateEnquiry[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${base}/api/enquiry/candidate`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch candidate enquiries");
      return [];
    }

    const data = await res.json();
    return data.enquiries || [];
  } catch (error) {
    console.error("Error fetching candidate enquiries:", error);
    return [];
  }
}

export default async function CandidateEnquiryPage() {
  const enquiries = await getCandidateEnquiries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Candidate Enquiries</h1>
        <p className="text-gray-600 mt-2">Manage candidate enquiry submissions and resumes</p>
      </div>

      {/* Client Component with Interactive Features */}
      <CandidateEnquiryList initialEnquiries={enquiries} />
    </div>
  );
}
