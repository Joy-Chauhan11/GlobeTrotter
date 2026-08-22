import { useMemo, useState } from "react";
import { ArrowLeft, Globe2, UserCircle } from "lucide-react";
import DayTimeline from "../components/DayTimeline.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";

const days = [
  {
    id: 1,
    title: "Arrival & first impressions",
    date: "October 12, 2026",
    activities: [
      {
        name: "Arrive at Tokyo Station",
        time: "10:30 AM",
        type: "Transport",
        cost: "$35",
        description:
          "Collect your bags and settle into the rhythm of the city.",
      },
      {
        name: "Explore Senso-ji Temple",
        time: "2:00 PM",
        type: "Sightseeing",
        cost: "$12",
        description:
          "Visit Asakusa's landmark temple and wander through Nakamise Street.",
      },
    ],
  },
  {
    id: 2,
    title: "A day among the city lights",
    date: "October 13, 2026",
    activities: [
      {
        name: "Tsukiji Outer Market",
        time: "9:00 AM",
        type: "Food & drink",
        cost: "$28",
        description:
          "Taste fresh sushi and market specialties with a local guide.",
      },
      {
        name: "Shibuya neighbourhood walk",
        time: "3:00 PM",
        type: "Walking tour",
        cost: "$18",
        description:
          "See the famous crossing, hidden streets, and a sunset city view.",
      },
    ],
  },
  {
    id: 3,
    title: "From Tokyo to Kyoto",
    date: "October 15, 2026",
    activities: [
      {
        name: "Shinkansen to Kyoto",
        time: "8:15 AM",
        type: "Transport",
        cost: "$96",
        description:
          "A scenic high-speed journey west through the Japanese countryside.",
      },
      {
        name: "Fushimi Inari Shrine",
        time: "4:00 PM",
        type: "Sightseeing",
        cost: "Free",
        description:
          "Walk beneath the thousands of torii gates before the evening crowds.",
      },
    ],
  },
];

function ItineraryView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All days");
  const [ascending, setAscending] = useState(true);
  const visibleDays = useMemo(
    () =>
      days
        .filter(
          (day) =>
            !query ||
            `${day.title} ${day.date} ${day.activities.map((activity) => activity.name).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .filter((day) => filter === "All days" || `Day ${day.id}` === filter)
        .sort((a, b) => (ascending ? a.id - b.id : b.id - a.id)),
    [ascending, filter, query],
  );

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            className="flex items-center gap-2.5 text-sm font-bold"
            href="/trips"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>
            GlobeTrotter
          </a>
          <a
            className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45]"
            href="/profile"
            aria-label="Open profile"
          >
            <UserCircle size={20} />
          </a>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <a
          className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#637168] hover:text-[#1f5b45]"
          href="/trips"
        >
          <ArrowLeft size={14} /> Back to my trips
        </a>
        <div className="mb-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#1f5b45]">
            Tokyo · Kyoto · Osaka
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl">
            Itinerary for a selected place
          </h1>
          <p className="mt-3 text-sm text-[#68756c]">
            A week in Japan <span className="mx-1">·</span> October 12 - 21,
            2026
          </p>
        </div>
        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          filterOptions={["All days", "Day 1", "Day 2", "Day 3"]}
          onSort={() => setAscending((current) => !current)}
        />
        <div className="mt-7 space-y-4">
          {visibleDays.map((day) => (
            <DayTimeline day={day} key={day.id} />
          ))}
          {!visibleDays.length && (
            <p className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
              No itinerary days match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ItineraryView;
