import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Globe2,
  MapPin,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DestinationCard from "../components/DestinationCard.jsx";
import Header from "../components/Header.jsx";
import { createTrip } from "../lib/api";

const suggestions = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    detail: "Temples & gardens",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    detail: "Hills & ocean air",
    color: "from-[#ead2c7] to-[#c58978]",
    imageUrl: "https://images.unsplash.com/photo-1558102822-da570eb113ed?w=600&q=80",
  },
  {
    id: 3,
    name: "Marrakech",
    country: "Morocco",
    detail: "Markets & riads",
    color: "from-[#f1dfbf] to-[#e7b687]",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80",
  },
];

export default function CreateTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    destination: "",
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  }

  function choosePlace(place) {
    setSelectedPlace(place.id);

    setForm((current) => ({
      ...current,
      destination: place.name,
      title: current.title || `${place.name} Adventure`,
      description:
        current.description ||
        `A trip to ${place.name}, ${place.country}.`,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title || !form.startDate || !form.endDate) {
      setMessage(
        "Please enter a trip name and select your travel dates."
      );
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      setMessage("End date cannot be before start date.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        title: form.title,
        description: form.description || undefined,
        startDate: form.startDate,
        endDate: form.endDate,
        budget: form.budget ? Number(form.budget) : undefined,
        destination: form.destination,
      };

      console.log("Creating trip:", payload);

      const created = await createTrip(payload);

      console.log("Created trip:", created);

      if (created?.id) {
        navigate(`/trips/${created.id}/build`);
      } else {
        setMessage("Trip created, but no trip ID was returned.");
      }
    } catch (error) {
      console.error("Failed to create trip:", error);

      setMessage(
        error?.message || "Failed to create trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">

      {/* Header */}
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 text-sm font-bold"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>

            GlobeTrotter
          </button>

          <Plane
            className="text-[#1f5b45]"
            size={20}
            aria-hidden="true"
          />

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-11">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#637168] hover:text-[#1f5b45]"
        >
          <ArrowLeft size={14} />
          Back home
        </button>

        {/* Heading */}
        <div className="mb-8">

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#1f5b45]">
            A new adventure
          </p>

          <h1 className="font-serif text-4xl font-normal sm:text-5xl">
            Plan a new trip
          </h1>

          <p className="mt-3 max-w-xl text-sm text-[#68756c]">
            Start with the essentials. You can add more stops and
            activities once your trip has a shape.
          </p>

        </div>

        {/* Form */}
        <form
          className="rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-8"
          onSubmit={handleSubmit}
        >

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Trip name */}
            <label className="text-xs font-bold text-[#526159] sm:col-span-2">

              Trip name

              <input
                className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder="e.g. Summer across Italy"
                required
              />

            </label>

            {/* Description */}
            <label className="text-xs font-bold text-[#526159] sm:col-span-2">

              Description

              <textarea
                className="mt-2 min-h-24 w-full rounded-md border border-[#d8ddd6] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                name="description"
                value={form.description}
                onChange={updateForm}
                placeholder="Tell us a little about your trip..."
              />

            </label>

            {/* Start date */}
            <label className="text-xs font-bold text-[#526159]">

              Start date

              <div className="relative mt-2">

                <CalendarDays
                  className="pointer-events-none absolute left-3 top-3 text-[#849088]"
                  size={16}
                />

                <input
                  className="min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 pl-10 text-sm font-normal outline-none focus:border-[#1f5b45]"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={updateForm}
                  required
                />

              </div>

            </label>

            {/* End date */}
            <label className="text-xs font-bold text-[#526159]">

              End date

              <div className="relative mt-2">

                <CalendarDays
                  className="pointer-events-none absolute left-3 top-3 text-[#849088]"
                  size={16}
                />

                <input
                  className="min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 pl-10 text-sm font-normal outline-none focus:border-[#1f5b45]"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={updateForm}
                  required
                />

              </div>

            </label>

            {/* Budget */}
            <label className="text-xs font-bold text-[#526159]">

              Budget

              <input
                className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                name="budget"
                type="number"
                min="0"
                value={form.budget}
                onChange={updateForm}
                placeholder="e.g. 100000"
              />

            </label>

            {/* Destination */}
            <label className="text-xs font-bold text-[#526159]">

              Destination

              <div className="relative mt-2">

                <MapPin
                  className="pointer-events-none absolute left-3 top-3 text-[#849088]"
                  size={16}
                />

                <input
                  className="min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 pl-10 text-sm font-normal outline-none focus:border-[#1f5b45]"
                  name="destination"
                  value={form.destination}
                  onChange={updateForm}
                  placeholder="e.g. Paris or Tokyo"
                />

              </div>

            </label>

          </div>

          {/* Error */}
          {message && (
            <p
              className="mt-4 text-sm font-medium text-[#a34537]"
              role="alert"
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            className="mt-7 flex items-center gap-2 rounded-md bg-[#1f5b45] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#164634] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              "Creating trip..."
            ) : (
              <>
                Save trip details
                <ArrowRight size={15} />
              </>
            )}
          </button>

        </form>

        {/* Suggestions */}
        <section
          className="mt-10"
          aria-labelledby="suggestions-heading"
        >

          <div className="mb-4 flex items-center gap-3">

            <h2
              id="suggestions-heading"
              className="text-xs font-bold uppercase tracking-[.18em] text-[#526159]"
            >
              Suggestions for places to visit / activities to perform
            </h2>

            <span className="h-px flex-1 bg-[#d8ddd6]" />

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {suggestions.map((suggestion) => (
              <div
                className="relative"
                key={suggestion.id}
              >

                <DestinationCard
                  destination={suggestion}
                />

                <button
                  className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border ${
                    selectedPlace === suggestion.id
                      ? "border-[#1f5b45] bg-[#1f5b45] text-white"
                      : "border-white/70 bg-[#fbfaf6]/80 text-[#1f5b45]"
                  }`}
                  type="button"
                  onClick={() => choosePlace(suggestion)}
                  aria-label={`Select ${suggestion.name}`}
                >
                  {selectedPlace === suggestion.id ? (
                    <Check size={15} />
                  ) : (
                    <span className="text-lg leading-none">
                      +
                    </span>
                  )}
                </button>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}