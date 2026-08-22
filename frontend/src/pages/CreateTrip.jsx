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
import DestinationCard from "../components/DestinationCard.jsx";

const suggestions = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    detail: "Temples & gardens",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    detail: "Hills & ocean air",
    color: "from-[#ead2c7] to-[#c58978]",
  },
  {
    id: 3,
    name: "Marrakech",
    country: "Morocco",
    detail: "Markets & riads",
    color: "from-[#f1dfbf] to-[#e7b687]",
  },
];

function CreateTrip() {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    place: "",
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [message, setMessage] = useState("");

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage("");
  }

  function choosePlace(place) {
    setSelectedPlace(place.id);
    setForm((current) => ({
      ...current,
      place: `${place.name}, ${place.country}`,
    }));
  }

  function submitTrip(event) {
    event.preventDefault();
    if (!form.name || !form.startDate || !form.endDate || !form.place) {
      setMessage("Complete the trip name, dates, and place to continue.");
      return;
    }
    setMessage("Trip details saved. You can now build your itinerary.");
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-2.5 text-sm font-bold" href="/">
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>
            GlobeTrotter
          </a>
          <Plane className="text-[#1f5b45]" size={20} aria-hidden="true" />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-11">
        <a
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#637168] hover:text-[#1f5b45]"
          href="/"
        >
          <ArrowLeft size={14} /> Back home
        </a>
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#1f5b45]">
            A new adventure
          </p>
          <h1 className="font-serif text-4xl font-normal sm:text-5xl">
            Plan a new trip
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#68756c]">
            Start with the essentials. You can add more stops and activities
            once your trip has a shape.
          </p>
        </div>
        <form
          className="rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-8"
          onSubmit={submitTrip}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#526159] sm:col-span-2">
              Trip name
              <input
                className="mt-2 min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                name="name"
                value={form.name}
                onChange={updateForm}
                placeholder="e.g. Summer across Italy"
              />
            </label>
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
                />
              </div>
            </label>
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
                />
              </div>
            </label>
            <label className="text-xs font-bold text-[#526159] sm:col-span-2">
              Select place
              <div className="relative mt-2">
                <MapPin
                  className="pointer-events-none absolute left-3 top-3 text-[#849088]"
                  size={16}
                />
                <input
                  className="min-h-11 w-full rounded-md border border-[#d8ddd6] bg-white px-3 pl-10 text-sm font-normal outline-none focus:border-[#1f5b45]"
                  name="place"
                  value={form.place}
                  onChange={updateForm}
                  placeholder="Search for a city or country"
                />
              </div>
            </label>
          </div>
          {message && (
            <p className="mt-4 text-sm font-medium text-[#a34537]" role="alert">
              {message}
            </p>
          )}
          <button
            className="mt-7 flex items-center gap-2 rounded-md bg-[#1f5b45] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#164634]"
            type="submit"
          >
            Save trip details <ArrowRight size={15} />
          </button>
        </form>
        <section className="mt-10" aria-labelledby="suggestions-heading">
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
              <div className="relative" key={suggestion.id}>
                <DestinationCard destination={suggestion} />
                <button
                  className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border ${selectedPlace === suggestion.id ? "border-[#1f5b45] bg-[#1f5b45] text-white" : "border-white/70 bg-[#fbfaf6]/80 text-[#1f5b45]"}`}
                  type="button"
                  onClick={() => choosePlace(suggestion)}
                  aria-label={`Select ${suggestion.name}`}
                >
                  {selectedPlace === suggestion.id ? (
                    <Check size={15} />
                  ) : (
                    <PlusIcon />
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

function PlusIcon() {
  return <span className="text-lg leading-none">+</span>;
}
export default CreateTrip;
