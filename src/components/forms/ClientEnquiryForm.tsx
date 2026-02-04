"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/enquiry/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setSuccess(false);
          router.push("/");
        }, 2000);
      } else {
        alert("Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Error submitting enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
          ✓ Enquiry submitted successfully! Redirecting...
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          required
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-300 mb-2 font-medium">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Write your message..."
          required
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}
