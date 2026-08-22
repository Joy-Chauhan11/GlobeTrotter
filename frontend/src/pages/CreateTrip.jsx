import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../lib/api";

export default function CreateTrip() {
  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", budget: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
        budget: form.budget ? parseFloat(form.budget) : undefined,
      };

      const created = await createTrip(payload);
      if (created && created.id) {
        navigate(`/trips/${created.id}/build`);
      } else {
        alert("Trip created (no id returned)");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create trip: " + err.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-2xl font-bold">Create a new trip</h1>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <input name="title" placeholder="Trip name" value={form.title} onChange={handleChange} className="rounded border p-2" />
          <input name="description" placeholder="Short description (optional)" value={form.description} onChange={handleChange} className="rounded border p-2" />
          <div className="flex gap-2">
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="rounded border p-2" />
            <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="rounded border p-2" />
          </div>
          <input name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} className="rounded border p-2" />
          <div className="flex gap-2">
            <button className="rounded bg-green-600 px-4 py-2 text-white">Create Trip</button>
            <a href="/trips" className="rounded border px-4 py-2 inline-block">Cancel</a>
          </div>
        </form>
      </div>
    </main>
  );
}
