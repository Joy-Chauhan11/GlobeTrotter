import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Filter,
  Globe2,
  MapPin,
  Search,
  SlidersHorizontal,
  UserCircle,
} from "lucide-react";

const activities = [
  {
    id: 1,
    name: "Fushimi Inari Taisha",
    city: "Kyoto, Japan",
    category: "Sightseeing",
    duration: "2-3 hours",
    cost: "Free",
    description:
      "Walk beneath thousands of vermilion torii gates through the forested hillside.",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
  },
  {
    id: 2,
    name: "Tsukiji Outer Market Tour",
    city: "Tokyo, Japan",
    category: "Food & drink",
    duration: "3 hours",
    cost: "$28",
    description:
      "Taste your way through Tokyo's famous market with a local food guide.",
    color: "from-[#f1dfbf] to-[#e7b687]",
  },
  {
    id: 3,
    name: "Arashiyama Bamboo Grove",
    city: "Kyoto, Japan",
    category: "Nature",
    duration: "1-2 hours",
    cost: "Free",
    description:
      "Explore a quiet bamboo path and the temples around Kyoto's western hills.",
    color: "from-[#d7dfc2] to-[#aebd88]",
  },
  {
    id: 4,
    name: "Osaka Street Food Walk",
    city: "Osaka, Japan",
    category: "Food & drink",
    duration: "2.5 hours",
    cost: "$42",
    description:
      "Try takoyaki, kushikatsu, and other local favorites around Dotonbori.",
    color: "from-[#ead2c7] to-[#c58978]",
  },
  {
    id: 5,
    name: "Nara Deer Park",
    city: "Nara, Japan",
    category: "Nature",
    duration: "Half day",
    cost: "$8",
    description:
      "Meet Nara's famous deer and visit the monumental Todai-ji temple.",
    color: "from-[#c4d4e3] to-[#8398b1]",
  },
];

function ActivitySearch() {
  const [query, setQuery] = useState("Paragliding");
  const [category, setCategory] = useState("All categories");
  const [sortAscending, setSortAscending] = useState(true);
  const [addedActivities, setAddedActivities] = useState([]);

  const visibleActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return activities
      .filter((activity) => {
        const searchable =
          `${activity.name} ${activity.city} ${activity.category}`.toLowerCase();
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (category === "All categories" || activity.category === category)
        );
      })
      .sort((firstActivity, secondActivity) => {
        const comparison = firstActivity.name.localeCompare(
          secondActivity.name,
        );
        return sortAscending ? comparison : -comparison;
      });
  }, [category, query, sortAscending]);

  function toggleActivity(activityId) {
    setAddedActivities((currentActivities) =>
      currentActivities.includes(activityId)
        ? currentActivities.filter((id) => id !== activityId)
        : [...currentActivities, activityId],
    );
  }

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
          <a
            className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45] transition hover:bg-[#eaf0ea]"
            href="/profile"
            aria-label="Open profile"
          >
            <UserCircle size={20} strokeWidth={1.7} />
          </a>
        </div>
      </header>

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

        <div className="mb-7 flex flex-col gap-3 rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-3 sm:flex-row sm:items-center">
          <label className="flex min-h-10 flex-1 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-[#7c8880] focus-within:border-[#1f5b45]">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search activities</span>
            <input
              className="w-full border-0 bg-transparent text-sm text-[#1b2821] outline-none placeholder:text-[#9ca69f]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search activities or cities"
            />
          </label>
          <div className="flex gap-2">
            <label className="relative flex min-w-0 flex-1 items-center">
              <Filter
                className="pointer-events-none absolute left-3 text-[#647169]"
                size={14}
                aria-hidden="true"
              />
              <span className="sr-only">Filter by category</span>
              <select
                className="min-h-10 w-full appearance-none rounded-md border border-[#d8ddd6] bg-white py-2 pl-9 pr-8 text-xs font-bold text-[#405047] outline-none focus:border-[#1f5b45]"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>All categories</option>
                <option>Sightseeing</option>
                <option>Food &amp; drink</option>
                <option>Nature</option>
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
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]">
            Results
          </h2>
          <span className="h-px flex-1 bg-[#d8ddd6]" />
          <span className="text-xs text-[#8b968e]">
            {visibleActivities.length} found
          </span>
        </div>

        <div className="space-y-3">
          {visibleActivities.map((activity) => {
            const isAdded = addedActivities.includes(activity.id);
            return (
              <article
                className="flex flex-col overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] transition hover:border-[#a7b9aa] hover:shadow-[0_10px_24px_rgba(31,91,69,0.08)] sm:flex-row"
                key={activity.id}
              >
                <div
                  className={`relative h-28 shrink-0 bg-gradient-to-br ${activity.color} sm:h-auto sm:w-40`}
                  aria-hidden="true"
                >
                  <MapPin
                    className="absolute bottom-3 left-4 text-[#1f5b45]/60"
                    size={20}
                  />
                  <span className="absolute right-4 top-4 h-9 w-9 rounded-full border border-white/50" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-6">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-base font-bold text-[#1b2821]">
                        {activity.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1f5b45]">
                        {activity.category}
                      </span>
                    </div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs text-[#68756c]">
                      <MapPin size={13} aria-hidden="true" /> {activity.city}
                    </p>
                    <p className="max-w-2xl text-sm leading-6 text-[#536159]">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-xs text-[#8b968e]">
                      {activity.duration} <span className="mx-1">·</span>{" "}
                      {activity.cost}
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
          {!visibleActivities.length && (
            <p className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
              No activities match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ActivitySearch;
