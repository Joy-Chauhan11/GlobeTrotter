import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getExploreCities } from "../lib/api";
import { Search, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExploreCities()
      .then(data => setCities(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch cities", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#1f5b45]">Find your next destination</h1>
          <p className="mt-4 text-[#526159]">Search top-rated cities and discover popular activities for your itinerary.</p>
          
          <div className="mt-8 flex items-center bg-white rounded-full border border-[#d8ddd6] px-4 py-2 shadow-sm focus-within:border-[#1f5b45] focus-within:ring-1 focus-within:ring-[#1f5b45]">
            <Search size={20} className="text-[#8b968e]" />
            <input 
              type="text" 
              placeholder="Search destinations (e.g., Tokyo, Paris)"
              className="flex-1 ml-3 outline-none bg-transparent placeholder:text-[#9ca69f]"
            />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Globe size={20} className="text-[#1f5b45]"/> Popular Cities</h2>
          </div>
          
          {loading ? (
            <p className="text-[#68756c] font-medium animate-pulse text-center">Loading destinations...</p>
          ) : cities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map(city => (
                <div key={city.id} className="group relative overflow-hidden rounded-xl bg-white border border-[#d8ddd6] shadow-sm hover:shadow-md transition">
                  <div className="h-32 bg-[#edf3ed] relative flex items-center justify-center">
                    <MapPin size={32} className="text-[#1f5b45]/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#1b2821]">{city.name}</h3>
                    <p className="text-sm font-medium text-[#68756c] mb-4">{city.country}, {city.region}</p>
                    <Link to="/trips/new" className="text-sm font-bold text-[#1f5b45] hover:underline inline-flex items-center gap-1">
                      Start planning here →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#bfcac1]">
              <p className="text-[#68756c] font-medium">No cities found.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
