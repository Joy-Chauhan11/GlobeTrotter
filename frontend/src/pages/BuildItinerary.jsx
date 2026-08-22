import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Globe2,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";

const initialSections = [
  {
    id: 1,
    city: "Tokyo",
    country: "Japan",
    start: "Oct 12",
    end: "Oct 15",
    budget: "$420",
  },
  {
    id: 2,
    city: "Kyoto",
    country: "Japan",
    start: "Oct 15",
    end: "Oct 18",
    budget: "$280",
  },
];

function BuildItinerary() {
  const [sections, setSections] = useState(initialSections);
  function addSection() {
    setSections((current) => [
      ...current,
      {
        id: Date.now(),
        city: "New destination",
        country: "Choose a country",
        start: "",
        end: "",
        budget: "$0",
      },
    ]);
  }
  function updateSection(id, field, value) {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  }
  function removeSection(id) {
    setSections((current) => current.filter((section) => section.id !== id));
  }
  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-2.5 text-sm font-bold" href="/">
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>
            GlobeTrotter
          </a>
          <span className="text-xs font-bold text-[#7b887f]">Step 2 of 2</span>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-11">
        <a
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#637168] hover:text-[#1f5b45]"
          href="/create-trip"
        >
          <ArrowLeft size={14} /> Back to trip details
        </a>
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#1f5b45]">
            Shape the journey
          </p>
          <h1 className="font-serif text-4xl font-normal sm:text-5xl">
            Build your itinerary
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#68756c]">
            Organize your stops, dates, and budget before adding the details
            that make each day yours.
          </p>
        </div>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <section
              className="rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-6"
              key={section.id}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical
                    className="text-[#9aa69d]"
                    size={18}
                    aria-hidden="true"
                  />
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1f5b45] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h2 className="text-lg font-bold">Stop {index + 1}</h2>
                </div>
                {sections.length > 1 && (
                  <button
                    className="grid h-8 w-8 place-items-center rounded-md text-[#9b655a] hover:bg-[#f4e8e4]"
                    type="button"
                    onClick={() => removeSection(section.id)}
                    aria-label={`Remove stop ${index + 1}`}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold text-[#526159]">
                  Place
                  <input
                    className="mt-2 min-h-10 w-full rounded-md border border-[#d8ddd6] bg-white px-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                    value={section.city}
                    onChange={(event) =>
                      updateSection(section.id, "city", event.target.value)
                    }
                  />
                </label>
                <label className="text-xs font-bold text-[#526159]">
                  Country
                  <input
                    className="mt-2 min-h-10 w-full rounded-md border border-[#d8ddd6] bg-white px-3 text-sm font-normal outline-none focus:border-[#1f5b45]"
                    value={section.country}
                    onChange={(event) =>
                      updateSection(section.id, "country", event.target.value)
                    }
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0ea] px-3 py-1.5 text-[11px] font-bold text-[#1f5b45]">
                  <CalendarDays size={13} /> Date range
                </span>
                <input
                  className="min-h-8 w-24 rounded-full border border-[#d8ddd6] bg-white px-3 text-xs outline-none"
                  placeholder="Start"
                  value={section.start}
                  onChange={(event) =>
                    updateSection(section.id, "start", event.target.value)
                  }
                />
                <span className="text-xs text-[#87928a]">to</span>
                <input
                  className="min-h-8 w-24 rounded-full border border-[#d8ddd6] bg-white px-3 text-xs outline-none"
                  placeholder="End"
                  value={section.end}
                  onChange={(event) =>
                    updateSection(section.id, "end", event.target.value)
                  }
                />
                <span className="inline-flex rounded-full bg-[#f5eadb] px-3 py-1.5 text-[11px] font-bold text-[#93633c]">
                  Budget
                </span>
                <input
                  className="min-h-8 w-20 rounded-full border border-[#d8ddd6] bg-white px-3 text-xs outline-none"
                  value={section.budget}
                  onChange={(event) =>
                    updateSection(section.id, "budget", event.target.value)
                  }
                />
              </div>
              <button
                className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#1f5b45]"
                type="button"
              >
                <Plus size={14} /> Add activities to this stop
              </button>
            </section>
          ))}
        </div>
        <button
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#aebbb1] py-3 text-xs font-bold text-[#1f5b45] hover:bg-[#edf3ed]"
          type="button"
          onClick={addSection}
        >
          <Plus size={15} /> Add another section
        </button>
        <button
          className="mt-7 flex items-center gap-2 rounded-md bg-[#1f5b45] px-4 py-3 text-xs font-bold text-white hover:bg-[#164634]"
          type="button"
        >
          Save itinerary <ChevronDown size={15} />
        </button>
      </div>
    </main>
  );
}

export default BuildItinerary;
