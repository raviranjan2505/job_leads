"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJob } from "@/services/jobs"; // adjust path if needed

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    client: "",
    location: "",
    jobType: "",
    vacancies: "",
    gender: "",
    education: "",
    experience: "",
    salary: "",
    benefits: "",
    workingHours: "",
    weeklyOff: "",
    joining: "",
    vehicleRequired: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const submit = async () => {
    if (!form.title || !form.company || !form.location || !form.jobType) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await createJob({
        title: form.title,
        company: form.company,
        client: form.client || undefined,
        location: form.location,
        jobType: form.jobType,
        vacancies: Number(form.vacancies),
        gender: form.gender || undefined,
        education: form.education || undefined,
        experience: form.experience,
        salary: form.salary,
        benefits: form.benefits
          ? form.benefits.split(",").map((b) => b.trim())
          : undefined,
        workingHours: form.workingHours || undefined,
        weeklyOff: form.weeklyOff || undefined,
        joining: form.joining || undefined,
        vehicleRequired: form.vehicleRequired ? "Yes" : "No",
        description: form.description || undefined,
      });

      router.push("/admin/jobs");
    } catch (error) {
      console.error("CREATE_JOB_ERROR", error);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2" name="title" placeholder="Job Title *" onChange={handleChange} />
        <input className="border p-2" name="company" placeholder="Company *" onChange={handleChange} />
        <input className="border p-2" name="client" placeholder="Client" onChange={handleChange} />
        <input className="border p-2" name="location" placeholder="Location *" onChange={handleChange} />

        <select className="border p-2" name="jobType" onChange={handleChange}>
          <option value="">Select Job Type *</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          className="border p-2"
          name="vacancies"
          type="number"
          placeholder="Vacancies *"
          onChange={handleChange}
        />

        <select className="border p-2" name="gender" onChange={handleChange}>
          <option value="">Gender Preference</option>
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input className="border p-2" name="education" placeholder="Education" onChange={handleChange} />
        <input className="border p-2" name="experience" placeholder="Experience *" onChange={handleChange} />
        <input className="border p-2" name="salary" placeholder="Salary *" onChange={handleChange} />

        <input className="border p-2" name="workingHours" placeholder="Working Hours" onChange={handleChange} />
        <input className="border p-2" name="weeklyOff" placeholder="Weekly Off" onChange={handleChange} />
        <input className="border p-2" name="joining" placeholder="Joining Time" onChange={handleChange} />
      </div>

      <textarea
        className="border p-2 w-full mt-4"
        rows={3}
        name="benefits"
        placeholder="Benefits (comma separated)"
        onChange={handleChange}
      />

      <textarea
        className="border p-2 w-full mt-4"
        rows={5}
        name="description"
        placeholder="Job Description"
        onChange={handleChange}
      />

      <div className="flex items-center gap-2 mt-4">
        <input type="checkbox" name="vehicleRequired" onChange={handleChange} />
        <span>Vehicle Required</span>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="mt-6 bg-black text-white px-6 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Job"}
      </button>
    </div>
  );
}
