"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getJobById, updateJob } from "@/services/jobs";

export default function EditJobPage() {
  const { jobsId } = useParams<{ jobsId: string }>();
  console.log(jobsId, "job id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    client: "",
    location: "",
    jobType: "",
    vacancies: 0,
    gender: "",
    education: "",
    experience: "",
    salary: "",
    benefits: "",
    workingHours: "",
    weeklyOff: "",
    joining: "",
    vehicleRequired: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (!jobsId) return;

    const loadJob = async () => {
      try {
        const data = await getJobById(jobsId);
        console.warn(data, "get job by Id");

        setForm({
          title: data.title || "",
          company: data.company || "",
          client: data.client || "",
          location: data.location || "",
          jobType: data.jobType || "",
          vacancies: data.vacancies || 0,
          gender: data.gender || "",
          education: data.education || "",
          experience: data.experience || "",
          salary: data.salary || "",
          benefits: Array.isArray(data.benefits) ? data.benefits.join(", ") : "",
          workingHours: data.workingHours || "",
          weeklyOff: data.weeklyOff || "",
          joining: data.joining || "",
          vehicleRequired: data.vehicleRequired || "",
          description: data.description || "",
          isActive: data.isActive ?? true,
        });
      } catch (err: any) {
        toast.error(err.response?.data?.error || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobsId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateJob(jobsId, {
        ...form,
        benefits: form.benefits
          ? form.benefits.split(",").map((b) => b.trim())
          : [],
      });

      toast.success("Job updated successfully");
      router.push("/admin/jobs");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-10">Loading job...</p>;

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2" name="title" value={form.title} onChange={handleChange} placeholder="Job Title *" />
          <input className="border p-2" name="company" value={form.company} onChange={handleChange} placeholder="Company *" />
          <input className="border p-2" name="client" value={form.client} onChange={handleChange} placeholder="Client" />
          <input className="border p-2" name="location" value={form.location} onChange={handleChange} placeholder="Location *" />

          <input className="border p-2" name="jobType" value={form.jobType} onChange={handleChange} placeholder="Job Type *" />
          <input className="border p-2" name="vacancies" type="number" value={form.vacancies} onChange={handleChange} placeholder="Vacancies *" />

          <input className="border p-2" name="gender" value={form.gender} onChange={handleChange} placeholder="Gender Preference" />
          <input className="border p-2" name="education" value={form.education} onChange={handleChange} placeholder="Education" />
          <input className="border p-2" name="experience" value={form.experience} onChange={handleChange} placeholder="Experience *" />
          <input className="border p-2" name="salary" value={form.salary} onChange={handleChange} placeholder="Salary *" />

          <input className="border p-2" name="workingHours" value={form.workingHours} onChange={handleChange} placeholder="Working Hours" />
          <input className="border p-2" name="weeklyOff" value={form.weeklyOff} onChange={handleChange} placeholder="Weekly Off" />
          <input className="border p-2" name="joining" value={form.joining} onChange={handleChange} placeholder="Joining Time" />
          <input className="border p-2" name="vehicleRequired" value={form.vehicleRequired} onChange={handleChange} placeholder="Vehicle Required" />
        </div>

        <textarea
          className="border p-2 w-full mt-4"
          rows={3}
          name="benefits"
          value={form.benefits}
          onChange={handleChange}
          placeholder="Benefits (comma separated)"
        />

        <textarea
          className="border p-2 w-full mt-4"
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
        />

        <button
          disabled={saving}
          className="mt-6 bg-black text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {saving ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
