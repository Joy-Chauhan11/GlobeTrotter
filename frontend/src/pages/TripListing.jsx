import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDownUp, ChevronDown, Filter, MapPin, Search, SlidersHorizontal } from "lucide-react";
import Header from "../components/Header";

// Removed sampleTrips array as we now use real data from the database

const sections = ["Ongoing", "Upcoming", "Completed"];

function TripListing() {
  const [query, setQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All trips");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    import("../lib/api").then(({ getTrips }) => {
      getTrips()
        .then((data) => {
          if (!mounted) return;
          setTrips(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.warn("Failed to fetch trips", err);
          if (mounted) setError(err.message);
        })
        .finally(() => mounted && setLoading(false));
    });
    return () => {
      mounted = false;
    };
  }, []);

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
  }, [activeFilter, query, sortAscending, trips]);

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <Header />

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
          <Link
            to="/trips/new"
            className="hidden items-center gap-2 rounded-md bg-[#1f5b45] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#164634] sm:flex"
          >
            <span className="text-lg leading-none">+</span> Plan a new trip
          </Link>
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
          {loading && (
            <p className="text-sm text-gray-500">Loading trips…</p>
          )}
          {error && (
            <p className="text-sm text-red-500">Error: {error}</p>
          )}
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
                        <Link
                          to={`/trips/${trip.id}/itinerary`}
                          className="flex w-fit items-center gap-2 rounded-md border border-[#bfcac1] px-4 py-2 text-xs font-bold text-[#1f5b45] transition hover:border-[#1f5b45] hover:bg-[#edf3ed]"
                        >
                          View trip <span aria-hidden="true">→</span>
                        </Link>
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
        <Link
          to="/trips/new"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#aebbb1] py-3 text-xs font-bold text-[#1f5b45] sm:hidden"
        >
          + Plan a new trip
        </Link>
      </div>
    </main>
  );
}

export default TripListing;
