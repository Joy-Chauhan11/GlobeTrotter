import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { getTrip } from "../lib/api";
import { Calendar, MapPin, Receipt, Clock, CreditCard, ChevronLeft } from "lucide-react";

export default function TripItinerary() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("timeline"); // "timeline" | "expenses"

  useEffect(() => {
    getTrip(tripId)
      .then((data) => setTrip(data))
      .catch((err) => console.error("Failed to fetch trip", err))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfaf6]">
        <Header />
        <div className="mx-auto max-w-4xl px-5 py-10 flex justify-center items-center h-64">
          <p className="text-[#68756c] font-medium animate-pulse">Loading itinerary...</p>
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-[#fbfaf6]">
        <Header />
        <div className="mx-auto max-w-4xl px-5 py-10 text-center">
          <h2 className="text-2xl font-bold text-[#1b2821]">Trip not found</h2>
          <Link to="/trips" className="text-[#1f5b45] hover:underline mt-4 inline-block">← Back to My Trips</Link>
        </div>
      </main>
    );
  }

  const start = new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const end = new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const totalExpenses = trip.expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821] pb-20">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#1f5b45] text-white pt-10 pb-16 px-5">
        <div className="mx-auto max-w-4xl">
          <Link to="/trips" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition">
            <ChevronLeft size={16} className="mr-1" /> Back to Trips
          </Link>
          <h1 className="text-4xl font-serif font-bold">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-6 mt-4 text-white/90">
            <span className="flex items-center gap-2"><Calendar size={18} /> {start} - {end}</span>
            <span className="flex items-center gap-2"><MapPin size={18} /> {trip.stops?.length || 0} stops</span>
          </div>
          {trip.description && <p className="mt-4 text-white/80 max-w-2xl">{trip.description}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 -mt-8">
        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-lg shadow-sm border border-[#d8ddd6] p-1 mb-8 w-fit mx-auto sm:mx-0">
          <button 
            onClick={() => setView("timeline")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-bold text-sm transition ${view === "timeline" ? "bg-[#f5f3ed] text-[#1b2821]" : "text-[#68756c] hover:text-[#1b2821]"}`}
          >
            <Clock size={16} /> Itinerary
          </button>
          <button 
            onClick={() => setView("expenses")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-bold text-sm transition ${view === "expenses" ? "bg-[#f5f3ed] text-[#1b2821]" : "text-[#68756c] hover:text-[#1b2821]"}`}
          >
            <Receipt size={16} /> Expenses
          </button>
        </div>

        {view === "timeline" && (
          <div className="space-y-8">
            {trip.stops?.length > 0 ? (
              trip.stops.map((stop, idx) => (
                <div key={stop.id} className="flex gap-4">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-3 h-3 rounded-full bg-[#1f5b45]" />
                    {idx !== trip.stops.length - 1 && <div className="w-px h-full bg-[#d8ddd6] mt-2 mb-2" />}
                  </div>
                  
                  {/* Stop Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1b2821]">{stop.city}, {stop.country}</h3>
                          <p className="text-sm text-[#68756c] mt-1 font-medium">
                            {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      {stop.activities?.length > 0 ? (
                        <div className="space-y-3 mt-6 border-t border-[#f5f3ed] pt-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b968e]">Activities</h4>
                          {stop.activities.map(act => (
                            <div key={act.id} className="flex justify-between items-center bg-[#fbfaf6] p-3 rounded border border-[#edf3ed]">
                              <div>
                                <p className="font-semibold text-sm">{act.name}</p>
                                <p className="text-xs text-[#68756c] mt-0.5">{act.duration} • {act.description}</p>
                              </div>
                              <span className="font-medium text-[#1f5b45] text-sm">${act.cost}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8b968e] mt-4 border-t border-[#f5f3ed] pt-4">No activities planned yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#bfcac1]">
                <p className="text-[#68756c] font-medium">No stops added yet.</p>
              </div>
            )}
          </div>
        )}

        {view === "expenses" && (
          <div className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-[#f5f3ed] pb-6">
              <div>
                <h3 className="text-xl font-bold">Budget Overview</h3>
                <p className="text-sm text-[#68756c] mt-1">Total budget: <span className="font-bold text-[#1b2821]">${trip.budget || 0}</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold uppercase tracking-wider text-[#8b968e]">Total Spent</p>
                <p className={`text-3xl font-serif mt-1 ${totalExpenses > trip.budget && trip.budget > 0 ? "text-red-600" : "text-[#1f5b45]"}`}>
                  ${totalExpenses}
                </p>
              </div>
            </div>

            {trip.expenses?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#d8ddd6] text-xs uppercase tracking-wider text-[#8b968e]">
                    <th className="py-3 font-bold">Category</th>
                    <th className="py-3 font-bold">Description</th>
                    <th className="py-3 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {trip.expenses.map(exp => (
                    <tr key={exp.id} className="border-b border-[#f5f3ed] last:border-0 hover:bg-[#fbfaf6] transition">
                      <td className="py-4 font-medium flex items-center gap-2">
                        <CreditCard size={14} className="text-[#8b968e]"/> {exp.category}
                      </td>
                      <td className="py-4 text-[#526159]">{exp.description}</td>
                      <td className="py-4 font-bold text-right">${exp.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-8 text-[#68756c]">No expenses recorded yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
