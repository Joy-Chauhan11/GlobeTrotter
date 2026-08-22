import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MapPin, Pencil, Plane, UserCircle } from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext.jsx";
import { getTrips } from "../lib/api";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  return (
    <Link to={`/trips/${trip.id}/itinerary`}>
      <article className="group overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] hover:shadow-md transition">
        <div className={`relative h-24 bg-gradient-to-br ${trip.color || "from-[#d8e5d9] to-[#a9c5b4]"}`} aria-hidden="true">
          <MapPin className="absolute bottom-3 left-3 text-[#1f5b45]/60" size={17} />
          <span className="absolute right-3 top-3 h-7 w-7 rounded-full border border-white/50" />
        </div>
        <div className="p-3.5">
          <h3 className="truncate text-sm font-bold text-[#1b2821]">{trip.title}</h3>
          <p className="mt-1 truncate text-[11px] text-[#738078]">{trip.dates}</p>
          <p className="mt-2 truncate text-xs text-[#526159]">{trip.places}</p>
          <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#1f5b45]">
            View <ArrowRight size={13} />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState({ firstName: "", lastName: "", city: "", country: "" });
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (user) {
      setDraftProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        city: user.city || "",
        country: user.country || "",
      });
    }
  }, [user]);

  useEffect(() => {
    getTrips()
      .then(data => { if (Array.isArray(data)) setUserTrips(data); })
      .catch(() => {});
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setDraftProfile(prev => ({ ...prev, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <Header />

      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-10">
        <Link
          to="/trips"
          className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#637168] transition hover:text-[#1f5b45]"
        >
          <ArrowLeft size={14} /> Back to my trips
        </Link>

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">Your space</p>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">Profile</h1>
          </div>
          <Plane className="hidden text-[#a8bbaa] sm:block" size={34} strokeWidth={1.2} />
        </div>

        {/* Profile card */}
        <section className="mb-9 rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[#aebdaf] bg-[#d9e5d8] text-[#1f5b45] overflow-hidden">
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="avatar" className="h-24 w-24 object-cover" />
              ) : (
                <span className="text-3xl font-bold text-[#1f5b45]">
                  {user?.firstName?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#829087]">Traveler profile</p>
              {editing ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-[#526159]">First name</label>
                    <input name="firstName" value={draftProfile.firstName} onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-[#bfcac1] bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5b45]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#526159]">Last name</label>
                    <input name="lastName" value={draftProfile.lastName} onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-[#bfcac1] bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5b45]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#526159]">City</label>
                    <input name="city" value={draftProfile.city} onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-[#bfcac1] bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5b45]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#526159]">Country</label>
                    <input name="country" value={draftProfile.country} onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-[#bfcac1] bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5b45]" />
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <button onClick={() => setEditing(false)}
                      className="rounded-md bg-[#1f5b45] px-4 py-2 text-xs font-bold text-white hover:bg-[#164634]">
                      Save
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="rounded-md border border-[#bfcac1] px-4 py-2 text-xs font-bold text-[#526159] hover:border-[#1f5b45]">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#1b2821]">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="mt-1 text-sm text-[#68756c]">{user?.email}</p>
                  {(user?.city || user?.country) && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#7b887f]">
                      <MapPin size={13} /> {[user?.city, user?.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                </>
              )}
            </div>

            {!editing && (
              <div className="flex flex-col gap-3">
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-md border border-[#bfcac1] px-3.5 py-2 text-xs font-bold text-[#1f5b45] hover:border-[#1f5b45] hover:bg-[#edf3ed]">
                  <Pencil size={14} /> Edit details
                </button>
                <button onClick={logout}
                  className="flex items-center gap-2 rounded-md border border-[#e6bcbc] bg-white px-3.5 py-2 text-xs font-bold text-[#b32b2b] hover:bg-[#ffecec]">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </section>

        {/* My Trips */}
        <section className="mb-9">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]">My Trips</h2>
            <span className="h-px flex-1 bg-[#d8ddd6]" />
            <span className="text-xs text-[#8b968e]">{userTrips.length}</span>
          </div>
          {userTrips.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {userTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#bfcac1] p-8 text-center">
              <p className="text-sm text-[#68756c]">No trips yet.</p>
              <Link to="/trips/new" className="mt-3 inline-block text-sm font-bold text-[#1f5b45] hover:underline">
                Plan your first trip →
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
