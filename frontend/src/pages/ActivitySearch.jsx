import { useEffect, useState } from "react";
import { Check, ChevronDown, Filter, MapPin, Search, SlidersHorizontal } from "lucide-react";
import Header from "../components/Header";
import { getExploreActivities } from "../lib/api";

export default function ActivitySearch() {
  const [query, setQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedActivities, setAddedActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, [query]);

  function loadActivities() {
    setLoading(true);
    getExploreActivities(query)
      .then(data => setActivities(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch activities", err))
      .finally(() => setLoading(false));
  }

  function toggleActivity(activityId) {
    setAddedActivities((current) =>
      current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821]">
      <Header />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <div className="mb-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">
            Build your itinerary
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">
            Find activities
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#68756c]">
            Discover memorable things to do and add them to your next stop.
          </p>
        </div>

        <div className="mb-7 flex flex-col gap-3 rounded-lg border border-[#d8ddd6] bg-white p-3 sm:flex-row sm:items-center">
          <label className="flex min-h-10 flex-1 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-[#7c8880] focus-within:border-[#1f5b45]">
            <Search size={16} aria-hidden="true" />
            <input
              className="w-full border-0 bg-transparent text-sm text-[#1b2821] outline-none placeholder:text-[#9ca69f]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activities or cities (e.g. Tokyo, Tower)"
            />
          </label>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]">
            Results
          </h2>
          <span className="h-px flex-1 bg-[#d8ddd6]" />
          <span className="text-xs text-[#8b968e]">
            {activities.length} found
          </span>
        </div>

        {loading ? (
          <p className="text-center py-8 text-[#68756c] font-medium animate-pulse">Loading activities...</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const isAdded = addedActivities.includes(activity.id);
              return (
                <article
                  className="flex flex-col overflow-hidden rounded-lg border border-[#d8ddd6] bg-white transition hover:shadow-[0_10px_24px_rgba(31,91,69,0.08)] sm:flex-row"
                  key={activity.id}
                >
                  <div
                    className="relative h-28 shrink-0 bg-[#edf3ed] sm:h-auto sm:w-40 flex items-center justify-center"
                  >
                    <MapPin className="text-[#1f5b45]/40" size={24} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-6">
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-base font-bold text-[#1b2821]">
                          {activity.name}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f5b45]">
                          {activity.type || "Sightseeing"}
                        </span>
                      </div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs text-[#68756c]">
                        <MapPin size={13} aria-hidden="true" /> {activity.city?.name || "Global"}, {activity.city?.country || ""}
                      </p>
                      <p className="mt-2 text-xs text-[#8b968e]">
                        {activity.duration || "1-2 hours"} <span className="mx-1">·</span> ${activity.cost || 0}
                      </p>
                    </div>
                    <button
                      className={`flex shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold transition ${isAdded ? "border border-[#bfcac1] bg-[#edf3ed] text-[#1f5b45]" : "bg-[#1f5b45] text-white hover:bg-[#164634]"}`}
                      type="button"
                      onClick={() => toggleActivity(activity.id)}
                    >
                      {isAdded && <Check size={14} aria-hidden="true" />}
                      {isAdded ? "Added" : "Add to trip"}
                    </button>
                  </div>
                </article>
              );
            })}
            {!activities.length && (
              <p className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
                No activities match your search.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
