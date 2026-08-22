import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../lib/api").then(({ getTrips }) => {
      getTrips()
        .then((data) => {
          if (Array.isArray(data)) {
            // Filter for upcoming/ongoing
            setTrips(data.filter(t => t.status !== "Completed"));
          }
        })
        .finally(() => setLoading(false));
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-[#526159]">Where are you going next?</p>

        <div className="mt-6 flex gap-3">
          <Link to="/trips/new" className="rounded-md bg-[#1f5b45] px-4 py-2 text-white hover:bg-[#164634]">Plan New Trip</Link>
          <Link to="/trips" className="rounded-md border border-[#d8ddd6] bg-white px-4 py-2 hover:border-[#1f5b45]">My Trips</Link>
          <Link to="/explore" className="rounded-md border border-[#d8ddd6] bg-white px-4 py-2 hover:border-[#1f5b45]">Explore</Link>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming trips</h2>
          {loading ? (
            <p className="text-[#68756c] text-sm">Loading trips...</p>
          ) : trips.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#bfcac1] p-10 text-center text-sm text-[#68756c]">
              No upcoming trips. <Link to="/trips/new" className="text-[#1f5b45] font-bold">Plan one now!</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {trips.slice(0, 3).map(trip => (
                <article key={trip.id} className="group overflow-hidden rounded-lg border border-[#d8ddd6] bg-white hover:shadow-md transition">
                  <div className={`relative h-24 w-full bg-gradient-to-br ${trip.color}`}>
                    <MapPin className="absolute bottom-3 left-4 text-[#1f5b45]/60" size={20} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{trip.title}</h3>
                    <p className="text-xs text-[#68756c] mt-1">{trip.dates}</p>
                    <Link to={`/trips/${trip.id}/itinerary`} className="mt-3 block text-sm font-bold text-[#1f5b45] hover:underline">
                      View itinerary →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
