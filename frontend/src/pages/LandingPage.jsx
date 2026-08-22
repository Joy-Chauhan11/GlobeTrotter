import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import DestinationCard from "../components/DestinationCard.jsx";
import SearchToolbar from "../components/SearchToolbar.jsx";
import TravelHeader from "../components/TravelHeader.jsx";
import TripSummaryCard from "../components/TripSummaryCard.jsx";

const destinations = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    detail: "Temples, gardens & quiet streets",
    region: "Asia",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    detail: "Sunlit hills & ocean air",
    region: "Europe",
    color: "from-[#ead2c7] to-[#c58978]",
  },
  {
    id: 3,
    name: "Marrakech",
    country: "Morocco",
    detail: "Markets, spices & hidden riads",
    region: "Africa",
    color: "from-[#f1dfbf] to-[#e7b687]",
  },
  {
    id: 4,
    name: "Reykjavik",
    country: "Iceland",
    detail: "Wild landscapes & northern skies",
    region: "Europe",
    color: "from-[#c4d4e3] to-[#8398b1]",
  },
];

const previousTrips = [
  {
    id: 1,
    name: "Northern lights",
    dates: "Feb 14 - Feb 20, 2026",
    destination: "Reykjavik, Iceland",
    color: "from-[#c4d4e3] to-[#8398b1]",
  },
  {
    id: 2,
    name: "A long weekend in Lisbon",
    dates: "Nov 02 - Nov 05, 2025",
    destination: "Lisbon, Portugal",
    color: "from-[#ead2c7] to-[#c58978]",
  },
];

function LandingPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [sortAscending, setSortAscending] = useState(true);

  const visibleDestinations = useMemo(
    () =>
      destinations
        .filter((destination) => {
          const searchable =
            `${destination.name} ${destination.country} ${destination.detail}`.toLowerCase();
          return (
            (!query || searchable.includes(query.toLowerCase())) &&
            (region === "All regions" || destination.region === region)
          );
        })
        .sort((first, second) =>
          sortAscending
            ? first.name.localeCompare(second.name)
            : second.name.localeCompare(first.name),
        ),
    [query, region, sortAscending],
  );

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <TravelHeader actionLabel="Plan a trip" />
      <section className="relative min-h-[310px] overflow-hidden bg-[#244b3b] px-5 py-14 text-[#f5f3ed] sm:min-h-[360px] sm:px-8 sm:py-20">
        <div
          className="absolute inset-0 bg-[linear-gradient(110deg,rgba(20,59,45,.94),rgba(20,59,45,.48)),url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7e4d8]">
            Your world, thoughtfully mapped
          </p>
          <h1 className="max-w-2xl font-serif text-5xl font-normal leading-[.98] sm:text-7xl">
            Where will you
            <br />
            <em className="text-[#d7e4d8]">go next?</em>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#e0e9df]">
            Find inspiration, gather your ideas, and shape a trip that feels
            entirely yours.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <SearchToolbar
          query={query}
          onQueryChange={setQuery}
          filter={region}
          onFilterChange={setRegion}
          filterOptions={["All regions", "Africa", "Asia", "Europe"]}
          sortAscending={sortAscending}
          onSort={() => setSortAscending((current) => !current)}
        />
        <section className="mt-10" aria-labelledby="regional-heading">
          <div className="mb-4 flex items-center gap-3">
            <h2
              id="regional-heading"
              className="text-xs font-bold uppercase tracking-[.16em] text-[#526159]"
            >
              Top regional selections
            </h2>
            <span className="h-px flex-1 bg-[#d8ddd6]" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          {!visibleDestinations.length && (
            <p className="mt-3 rounded-lg border border-dashed border-[#bfcac1] p-8 text-center text-sm text-[#68756c]">
              No destinations match your search.
            </p>
          )}
        </section>
        <section className="mt-11" aria-labelledby="previous-heading">
          <div className="mb-4 flex items-center gap-3">
            <h2
              id="previous-heading"
              className="text-xs font-bold uppercase tracking-[.16em] text-[#526159]"
            >
              Previous trips
            </h2>
            <span className="h-px flex-1 bg-[#d8ddd6]" />
          </div>
          <div className="space-y-3">
            {previousTrips.map((trip) => (
              <TripSummaryCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
        <a
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#aebbb1] py-3 text-xs font-bold text-[#1f5b45] transition hover:border-[#1f5b45] hover:bg-[#edf3ed]"
          href="/create-trip"
        >
          <Plus size={15} aria-hidden="true" /> Plan a trip
        </a>
      </div>
    </main>
  );
}

export default LandingPage;
