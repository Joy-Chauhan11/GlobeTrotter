import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { getTrip, addStop, addActivity } from "../lib/api";
import { MapPin, Plus, Calendar, ArrowRight, ChevronLeft } from "lucide-react";

export default function TripBuilder() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Stop form
  const [stopForm, setStopForm] = useState({ city: "", country: "", startDate: "", endDate: "" });
  const [addingStop, setAddingStop] = useState(false);

  // New Activity form per stop: { [stopId]: { name: "", duration: "", cost: "", description: "" } }
  const [activityForms, setActivityForms] = useState({});

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  function loadTrip() {
    getTrip(tripId)
      .then((data) => setTrip(data))
      .catch((err) => console.error("Failed to load trip", err))
      .finally(() => setLoading(false));
  }

  async function handleAddStop(e) {
    e.preventDefault();
    if (!stopForm.city || !stopForm.country || !stopForm.startDate || !stopForm.endDate) return;

    try {
      setAddingStop(true);
      await addStop(tripId, stopForm);
      setStopForm({ city: "", country: "", startDate: "", endDate: "" });
      loadTrip();
    } catch (err) {
      alert("Failed to add stop: " + err.message);
    } finally {
      setAddingStop(false);
    }
  }

  async function handleAddActivity(stopId, e) {
    e.preventDefault();
    const form = activityForms[stopId];
    if (!form || !form.name) return;

    try {
      await addActivity(tripId, stopId, {
        name: form.name,
        duration: form.duration || "1 hour",
        cost: form.cost ? Number(form.cost) : 0,
        description: form.description || ""
      });
      setActivityForms(prev => ({ ...prev, [stopId]: { name: "", duration: "", cost: "", description: "" } }));
      loadTrip();
    } catch (err) {
      alert("Failed to add activity: " + err.message);
    }
  }

  function updateActivityForm(stopId, field, value) {
    setActivityForms(prev => ({
      ...prev,
      [stopId]: { ...(prev[stopId] || {}), [field]: value }
    }));
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfaf6]">
        <Header />
        <div className="mx-auto max-w-4xl px-5 py-10 flex justify-center">
          <p className="text-[#68756c] font-medium animate-pulse">Loading builder...</p>
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-[#fbfaf6]">
        <Header />
        <div className="mx-auto max-w-4xl px-5 py-10 text-center">
          <h2 className="text-2xl font-bold">Trip not found</h2>
          <Link to="/trips" className="text-[#1f5b45] underline mt-4 inline-block">Back to My Trips</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821] pb-20">
      <Header />

      <div className="bg-[#1f5b45] text-white pt-8 pb-12 px-5">
        <div className="mx-auto max-w-4xl">
          <Link to="/trips" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-xs font-bold">
            <ChevronLeft size={14} className="mr-1" /> Back to My Trips
          </Link>
          <h1 className="text-3xl font-serif font-bold">Build Itinerary: {trip.title}</h1>
          <p className="mt-2 text-white/80 text-sm">Add stops and activities to shape your journey.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8">
        
        {/* Existing Stops */}
        <div className="space-y-6 mb-10">
          <h2 className="text-xl font-bold text-[#1b2821]">Stops ({trip.stops?.length || 0})</h2>

          {trip.stops?.map((stop, idx) => (
            <div key={stop.id} className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1f5b45]">Stop {idx + 1}</span>
                  <h3 className="text-2xl font-serif font-bold mt-1">{stop.city}, {stop.country}</h3>
                  <p className="text-xs text-[#68756c] mt-1 font-medium">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Activities under this stop */}
              <div className="mt-4 pt-4 border-t border-[#f5f3ed]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b968e] mb-3">Activities</h4>
                <div className="space-y-2 mb-4">
                  {stop.activities?.map(act => (
                    <div key={act.id} className="flex justify-between items-center bg-[#fbfaf6] p-3 rounded border border-[#edf3ed] text-sm">
                      <div>
                        <p className="font-bold text-[#1b2821]">{act.name}</p>
                        <p className="text-xs text-[#68756c]">{act.duration} • {act.description}</p>
                      </div>
                      <span className="font-bold text-[#1f5b45]">${act.cost}</span>
                    </div>
                  ))}
                </div>

                {/* Add activity form */}
                <form onSubmit={(e) => handleAddActivity(stop.id, e)} className="flex flex-wrap gap-2 mt-3">
                  <input 
                    type="text"
                    placeholder="Activity name (e.g. Visit Museum)"
                    value={activityForms[stop.id]?.name || ""}
                    onChange={(e) => updateActivityForm(stop.id, "name", e.target.value)}
                    className="flex-1 min-w-[180px] text-xs border border-[#d8ddd6] rounded px-3 py-2 outline-none focus:border-[#1f5b45]"
                    required
                  />
                  <input 
                    type="number"
                    placeholder="Cost ($)"
                    value={activityForms[stop.id]?.cost || ""}
                    onChange={(e) => updateActivityForm(stop.id, "cost", e.target.value)}
                    className="w-20 text-xs border border-[#d8ddd6] rounded px-3 py-2 outline-none focus:border-[#1f5b45]"
                  />
                  <button type="submit" className="bg-[#1f5b45] text-white text-xs font-bold px-3 py-2 rounded hover:bg-[#164634]">
                    + Add Activity
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Stop Form */}
        <div className="bg-white rounded-xl border border-[#d8ddd6] p-6 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-[#1b2821] mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-[#1f5b45]"/> Add a Stop
          </h3>
          <form onSubmit={handleAddStop} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#526159] mb-1">City</label>
              <input 
                type="text" 
                placeholder="e.g. Tokyo"
                value={stopForm.city}
                onChange={(e) => setStopForm(prev => ({ ...prev, city: e.target.value }))}
                className="w-full border border-[#d8ddd6] rounded-md p-2.5 text-sm outline-none focus:border-[#1f5b45]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#526159] mb-1">Country</label>
              <input 
                type="text" 
                placeholder="e.g. Japan"
                value={stopForm.country}
                onChange={(e) => setStopForm(prev => ({ ...prev, country: e.target.value }))}
                className="w-full border border-[#d8ddd6] rounded-md p-2.5 text-sm outline-none focus:border-[#1f5b45]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#526159] mb-1">Start Date</label>
              <input 
                type="date" 
                value={stopForm.startDate}
                onChange={(e) => setStopForm(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full border border-[#d8ddd6] rounded-md p-2.5 text-sm outline-none focus:border-[#1f5b45]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#526159] mb-1">End Date</label>
              <input 
                type="date" 
                value={stopForm.endDate}
                onChange={(e) => setStopForm(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full border border-[#d8ddd6] rounded-md p-2.5 text-sm outline-none focus:border-[#1f5b45]"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <button 
                type="submit" 
                disabled={addingStop}
                className="w-full bg-[#1f5b45] text-white font-bold py-3 rounded-md hover:bg-[#164634] transition flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Stop to Itinerary
              </button>
            </div>
          </form>
        </div>

        {/* View Final Itinerary */}
        <div className="flex justify-end">
          <button 
            onClick={() => navigate(`/trips/${tripId}/itinerary`)}
            className="bg-[#1f5b45] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#164634] transition flex items-center gap-2"
          >
            Finish & View Full Itinerary <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
