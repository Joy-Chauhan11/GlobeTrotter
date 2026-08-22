import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { getTrip, addStop, addActivity, suggestStops, suggestActivities } from "../lib/api";
import { MapPin, Plus, Calendar, ArrowRight, ChevronLeft, Sparkles, Check } from "lucide-react";

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

  // AI Suggestions
  const [suggestedStops, setSuggestedStops] = useState([]);
  const [loadingStops, setLoadingStops] = useState(false);
  const [suggestedActivities, setSuggestedActivities] = useState({});
  const [loadingActivities, setLoadingActivities] = useState({});

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
    if (e) e.preventDefault();
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

  async function handleAddSuggestedStop(stopSuggestion) {
    try {
      setAddingStop(true);
      await addStop(tripId, {
        city: stopSuggestion.name,
        country: stopSuggestion.country || "Unknown",
        startDate: trip.startDate.split('T')[0], // Default to trip start
        endDate: trip.endDate.split('T')[0]      // Default to trip end
      });
      loadTrip();
      // Remove from suggestions
      setSuggestedStops(prev => prev.filter(s => s.name !== stopSuggestion.name));
    } catch (err) {
      alert("Failed to add stop: " + err.message);
    } finally {
      setAddingStop(false);
    }
  }

  async function handleAddActivity(stopId, e) {
    if (e) e.preventDefault();
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

  async function handleAddSuggestedActivity(stopId, actSuggestion) {
    try {
      await addActivity(tripId, stopId, {
        name: actSuggestion.name,
        duration: actSuggestion.duration || "1 hour",
        cost: actSuggestion.cost ? Number(actSuggestion.cost) : 0,
        description: actSuggestion.description || ""
      });
      loadTrip();
      // Remove from suggestions
      setSuggestedActivities(prev => ({
        ...prev,
        [stopId]: prev[stopId].filter(a => a.name !== actSuggestion.name)
      }));
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

  async function handleSuggestStops() {
    if (!trip) return;
    setLoadingStops(true);
    try {
      // Use the trip title or first stop as context
      const context = trip.title; 
      const res = await suggestStops(context);
      setSuggestedStops(res);
    } catch (err) {
      alert("Failed to get AI suggestions: " + err.message);
    } finally {
      setLoadingStops(false);
    }
  }

  async function handleSuggestActivities(stopId, cityName) {
    setLoadingActivities(prev => ({ ...prev, [stopId]: true }));
    try {
      const res = await suggestActivities(cityName);
      setSuggestedActivities(prev => ({ ...prev, [stopId]: res }));
    } catch (err) {
      alert("Failed to get AI suggestions: " + err.message);
    } finally {
      setLoadingActivities(prev => ({ ...prev, [stopId]: false }));
    }
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
          <p className="mt-2 text-white/80 text-sm">Add stops and activities to shape your journey. Let AI help you decide!</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8">
        
        {/* Existing Stops */}
        <div className="space-y-6 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#1b2821]">Stops ({trip.stops?.length || 0})</h2>
            <button 
              onClick={handleSuggestStops}
              disabled={loadingStops}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              <Sparkles size={14} /> {loadingStops ? "Thinking..." : "AI Suggest Stops"}
            </button>
          </div>

          {/* AI Stop Suggestions */}
          {suggestedStops.length > 0 && (
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 mb-6">
              <h3 className="text-sm font-bold text-purple-800 mb-3 flex items-center gap-2"><Sparkles size={16}/> Suggested for {trip.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedStops.map((sug, idx) => (
                  <div key={idx} className="bg-white border border-purple-100 rounded-lg p-3 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-sm">{sug.name}</p>
                      <p className="text-xs text-gray-500">{sug.detail}</p>
                    </div>
                    <button 
                      onClick={() => handleAddSuggestedStop(sug)}
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 p-1.5 rounded-full transition"
                      title="Add to itinerary"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                <button 
                  onClick={() => handleSuggestActivities(stop.id, stop.city)}
                  disabled={loadingActivities[stop.id]}
                  className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-indigo-100 transition disabled:opacity-50"
                >
                  <Sparkles size={14} /> {loadingActivities[stop.id] ? "Loading..." : "Suggest Activities"}
                </button>
              </div>

              {/* AI Activity Suggestions */}
              {suggestedActivities[stop.id]?.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-4">
                  <h4 className="text-xs font-bold text-indigo-800 mb-2 flex items-center gap-1.5"><Sparkles size={14}/> Top Picks for {stop.city}</h4>
                  <div className="space-y-2">
                    {suggestedActivities[stop.id].map((act, i) => (
                      <div key={i} className="flex justify-between items-center bg-white border border-indigo-50 rounded p-2 text-sm shadow-sm">
                        <div>
                          <p className="font-bold text-gray-800">{act.name}</p>
                          <p className="text-xs text-gray-500">{act.duration} • {act.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-green-700">${act.cost}</span>
                          <button 
                            onClick={() => handleAddSuggestedActivity(stop.id, act)}
                            className="bg-indigo-100 text-indigo-700 p-1.5 rounded-full hover:bg-indigo-200 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities under this stop */}
              <div className="mt-4 pt-4 border-t border-[#f5f3ed]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b968e] mb-3">Activities</h4>
                <div className="space-y-2 mb-4">
                  {stop.activities?.length === 0 && <p className="text-xs text-gray-400">No activities planned yet.</p>}
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
                    className="flex-1 min-w-[200px] border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="Duration (e.g. 2 hrs)"
                    value={activityForms[stop.id]?.duration || ""}
                    onChange={(e) => updateActivityForm(stop.id, "duration", e.target.value)}
                    className="w-32 border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
                  />
                  <input 
                    type="number"
                    placeholder="Cost $"
                    value={activityForms[stop.id]?.cost || ""}
                    onChange={(e) => updateActivityForm(stop.id, "cost", e.target.value)}
                    className="w-24 border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
                  />
                  <button type="submit" className="bg-[#1f5b45] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#164634] transition flex items-center gap-1">
                    <Plus size={16} /> Add
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Stop Form */}
        <div className="bg-[#fbfaf6] border border-[#d8ddd6] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#1f5b45]" /> Add Another Stop manually
          </h3>
          <form onSubmit={handleAddStop} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="City (e.g. Rome)"
              value={stopForm.city} onChange={(e) => setStopForm({...stopForm, city: e.target.value})}
              className="border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
              required
            />
            <input 
              type="text" placeholder="Country"
              value={stopForm.country} onChange={(e) => setStopForm({...stopForm, country: e.target.value})}
              className="border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
              required
            />
            <input 
              type="date" 
              value={stopForm.startDate} onChange={(e) => setStopForm({...stopForm, startDate: e.target.value})}
              className="border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
              required
            />
            <input 
              type="date" 
              value={stopForm.endDate} onChange={(e) => setStopForm({...stopForm, endDate: e.target.value})}
              className="border border-[#d8ddd6] rounded px-3 py-2 text-sm outline-none focus:border-[#1f5b45]"
              required
            />
            <button 
              type="submit" 
              disabled={addingStop}
              className="sm:col-span-2 mt-2 bg-[#1f5b45] text-white px-4 py-3 rounded-md text-sm font-bold hover:bg-[#164634] transition disabled:opacity-60"
            >
              {addingStop ? "Adding..." : "Save Stop"}
            </button>
          </form>
        </div>

        <div className="mt-10 flex justify-end">
           <Link to="/trips" className="flex items-center gap-2 bg-[#1b2821] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-black transition">
             Finish Itinerary <ArrowRight size={16} />
           </Link>
        </div>

      </div>
    </main>
  );
}
