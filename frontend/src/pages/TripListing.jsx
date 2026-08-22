import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  Filter,
  Globe2,
  MapPin,
  Search,
  SlidersHorizontal,
  UserCircle,
} from "lucide-react";

const trips = [
  {
    id: 1,
    title: "A week in Japan",
    dates: "Oct 12 - Oct 21, 2026",
    places: "Tokyo, Kyoto, Osaka",
    days: "9 days",
    status: "Ongoing",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
  },
  {
    id: 2,
    title: "Mediterranean escape",
    dates: "Jun 08 - Jun 19, 2026",
    places: "Barcelona, Nice, Rome",
    days: "11 days",
    status: "Upcoming",
    color: "from-[#f1dfbf] to-[#e7b687]",
  },
  {
    id: 3,
    title: "Northern lights",
    dates: "Feb 14 - Feb 20, 2026",
    places: "Reykjavik, Vik",
    days: "6 days",
    status: "Completed",
    color: "from-[#c4d4e3] to-[#8398b1]",
  },
  {
    id: 4,
    title: "A long weekend in Lisbon",
    dates: "Nov 02 - Nov 05, 2025",
    places: "Lisbon, Sintra",
    days: "3 days",
    status: "Completed",
    color: "from-[#ead2c7] to-[#c58978]",
  },
];

const sections = ["Ongoing", "Upcoming", "Completed"];

function TripListing() {
  const [query, setQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All trips");

  const visibleTrips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return trips
      .filter((trip) => {
        const searchable = `${trip.title} ${trip.places}`.toLowerCase();
        const matchesQuery =
          !normalizedQuery || searchable.includes(normalizedQuery);
        const matchesFilter =
          activeFilter === "All trips" || trip.status === activeFilter;
        return matchesQuery && matchesFilter;
      })
      .sort((firstTrip, secondTrip) => {
        const comparison = firstTrip.title.localeCompare(secondTrip.title);
        return sortAscending ? comparison : -comparison;
      });
  }, [activeFilter, query, sortAscending]);

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            className="flex items-center gap-2.5 text-sm font-bold tracking-tight"
            href="/trips"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} aria-hidden="true" />
            </span>
            GlobeTrotter
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45] transition hover:bg-[#eaf0ea]"
            type="button"
            aria-label="Open profile"
          >
            <UserCircle size={20} strokeWidth={1.7} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">
              Your journeys
            </p>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">
              My trips
            </h1>
          </div>
          <button
            className="hidden items-center gap-2 rounded-md bg-[#1f5b45] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#164634] sm:flex"
            type="button"
          >
            <span className="text-lg leading-none">+</span> Plan a new trip
          </button>
        </div>

        <div className="mb-9 flex flex-col gap-3 rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-3 sm:flex-row sm:items-center">
          <label className="flex min-h-10 flex-1 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-[#7c8880] focus-within:border-[#1f5b45]">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search trips</span>
            <input
              className="w-full border-0 bg-transparent text-sm text-[#1b2821] outline-none placeholder:text-[#9ca69f]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your trips"
            />
          </label>
          <div className="flex gap-2">
            <label className="relative flex flex-1 items-center">
              <Filter
                className="pointer-events-none absolute left-3 text-[#647169]"
                size={14}
                aria-hidden="true"
              />
              <span className="sr-only">Filter trips</span>
              <select
                className="min-h-10 w-full appearance-none rounded-md border border-[#d8ddd6] bg-white py-2 pl-9 pr-8 text-xs font-bold text-[#405047] outline-none focus:border-[#1f5b45]"
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
              >
                <option>All trips</option>
                {sections.map((section) => (
                  <option key={section}>{section}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 text-[#647169]"
                size={14}
                aria-hidden="true"
              />
            </label>
            <button
              className="flex min-h-10 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-xs font-bold text-[#405047] transition hover:border-[#1f5b45]"
              type="button"
              onClick={() => setSortAscending((current) => !current)}
            >
              <ArrowDownUp size={14} aria-hidden="true" />{" "}
              <span className="hidden sm:inline">Sort</span>
            </button>
            <button
              className="grid min-h-10 w-10 place-items-center rounded-md border border-[#d8ddd6] bg-white text-[#405047] transition hover:border-[#1f5b45]"
              type="button"
              aria-label="More filters"
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => {
            const sectionTrips = visibleTrips.filter(
              (trip) => trip.status === section,
            );
            if (!sectionTrips.length) return null;
            return (
              <section key={section} aria-labelledby={`${section}-heading`}>
                <div className="mb-3 flex items-center gap-3">
                  <h2
                    id={`${section}-heading`}
                    className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]"
                  >
                    {section}
                  </h2>
                  <span className="h-px flex-1 bg-[#d8ddd6]" />
                  <span className="text-xs text-[#8b968e]">
                    {sectionTrips.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {sectionTrips.map((trip) => (
                    <article
                      className="group flex min-h-32 flex-col overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] transition hover:-translate-y-0.5 hover:border-[#a7b9aa] hover:shadow-[0_10px_24px_rgba(31,91,69,0.08)] sm:flex-row"
                      key={trip.id}
                    >
                      <div
                        className={`relative min-h-28 w-full bg-gradient-to-br ${trip.color} sm:w-44`}
                        aria-hidden="true"
                      >
                        <MapPin
                          className="absolute bottom-4 left-5 text-[#1f5b45]/60"
                          size={21}
                        />
                        <span className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/45" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-7">
                        <div>
                          <h3 className="mb-2 text-lg font-bold text-[#1b2821]">
                            {trip.title}
                          </h3>
                          <p className="mb-2 text-xs font-medium text-[#68756c]">
                            {trip.dates}
                          </p>
                          <p className="text-sm text-[#536159]">
                            {trip.places}{" "}
                            <span className="mx-1 text-[#b0b9b2]">·</span>{" "}
                            {trip.days}
                          </p>
                        </div>
                        <button
                          className="flex w-fit items-center gap-2 rounded-md border border-[#bfcac1] px-4 py-2 text-xs font-bold text-[#1f5b45] transition hover:border-[#1f5b45] hover:bg-[#edf3ed]"
                          type="button"
                        >
                          View trip <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
          {!visibleTrips.length && (
            <p className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
              No trips match your search.
            </p>
          )}
        </div>
        <button
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#aebbb1] py-3 text-xs font-bold text-[#1f5b45] sm:hidden"
          type="button"
        >
          + Plan a new trip
        </button>
      </div>
    </main>
  );
}

export default TripListing;
