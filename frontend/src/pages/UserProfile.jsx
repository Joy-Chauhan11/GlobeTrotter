import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MapPin, Pencil, Plane, UserCircle } from "lucide-react";
import Header from "../components/Header";
import { useUser, SignOutButton } from "@clerk/clerk-react";

const plannedTrips = [
  {
    id: 1,
    name: "A week in Japan",
    dates: "Oct 12 - Oct 21, 2026",
    destination: "Tokyo, Kyoto",
    color: "from-[#d8e5d9] to-[#a9c5b4]",
  },
  {
    id: 2,
    name: "Mediterranean escape",
    dates: "Jun 08 - Jun 19, 2026",
    destination: "Barcelona, Nice",
    color: "from-[#f1dfbf] to-[#e7b687]",
  },
  {
    id: 3,
    name: "Coastal Portugal",
    dates: "Apr 03 - Apr 10, 2026",
    destination: "Porto, Lisbon",
    color: "from-[#d8d1e1] to-[#ad9fbd]",
  },
];

const previousTrips = [
  {
    id: 4,
    name: "Northern lights",
    dates: "Feb 14 - Feb 20, 2026",
    destination: "Reykjavik, Vik",
    color: "from-[#c4d4e3] to-[#8398b1]",
  },
  {
    id: 5,
    name: "A long weekend in Lisbon",
    dates: "Nov 02 - Nov 05, 2025",
    destination: "Lisbon, Sintra",
    color: "from-[#ead2c7] to-[#c58978]",
  },
  {
    id: 6,
    name: "Summer in Greece",
    dates: "Jul 11 - Jul 19, 2025",
    destination: "Athens, Naxos",
    color: "from-[#d7dfc2] to-[#aebd88]",
  },
];

function TripCard({ trip, compact = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] ${compact ? "min-w-0" : "min-w-[220px]"}`}
    >
      <div
        className={`relative h-24 bg-gradient-to-br ${trip.color}`}
        aria-hidden="true"
      >
        <MapPin
          className="absolute bottom-3 left-3 text-[#1f5b45]/60"
          size={17}
        />
        <span className="absolute right-3 top-3 h-7 w-7 rounded-full border border-white/50" />
      </div>
      <div className="p-3.5">
        <h3 className="truncate text-sm font-bold text-[#1b2821]">
          {trip.name}
        </h3>
        <p className="mt-1 truncate text-[11px] text-[#738078]">{trip.dates}</p>
        <p className="mt-2 truncate text-xs text-[#526159]">
          {trip.destination}
        </p>
        <button
          className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#1f5b45] transition hover:gap-2.5"
          type="button"
        >
          View <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Traveler", email: "", location: "" });
  const [draftProfile, setDraftProfile] = useState(profile);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const name = user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Traveler";
      const email = user.primaryEmailAddress?.emailAddress || (user.emailAddresses && user.emailAddresses[0]?.emailAddress) || "";
      const location = (user.publicMetadata && user.publicMetadata.location) || "";
      const newProfile = { name, email, location };
      setProfile(newProfile);
      setDraftProfile(newProfile);
    }
  }, [isLoaded, isSignedIn, user]);

  function startEditing() {
    setDraftProfile(profile);
    setEditing(true);
  }

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  }

  function saveProfile(event) {
    event.preventDefault();
    setProfile({
      name: draftProfile.name.trim() || "Alex Morgan",
      email: draftProfile.email.trim() || "alex.morgan@example.com",
      location: draftProfile.location.trim() || "London, United Kingdom",
    });
    setEditing(false);
  }

  function cancelEditing() {
    setDraftProfile(profile);
    setEditing(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <Header />

      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-10">
        <a
          className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#637168] transition hover:text-[#1f5b45]"
          href="/trips"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to my trips
        </a>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">
              Your space
            </p>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">
              Profile
            </h1>
          </div>
          <Plane
            className="hidden text-[#a8bbaa] sm:block"
            size={34}
            strokeWidth={1.2}
            aria-hidden="true"
          />
        </div>

        <section
          className="mb-9 rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-7"
          aria-labelledby="profile-details-heading"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[#aebdaf] bg-[#d9e5d8] text-[#1f5b45] overflow-hidden">
              {user && (user.profileImageUrl || user.imageUrl) ? (
                <img src={user.profileImageUrl || user.imageUrl} alt="avatar" className="h-24 w-24 object-cover" />
              ) : (
                <UserCircle size={55} strokeWidth={1.1} aria-label="Profile avatar" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#829087]">
                Traveler profile
              </p>
              {editing ? (
                <form
                  className="grid gap-3 sm:grid-cols-3"
                  onSubmit={saveProfile}
                >
                  <label
                    className="text-xs font-bold text-[#526159]"
                    htmlFor="profile-name"
                  >
                    Name
                    <input
                      className="mt-1 min-h-10 w-full rounded-md border border-[#bfcac1] bg-white px-3 text-sm font-normal text-[#1b2821] outline-none focus:border-[#1f5b45]"
                      id="profile-name"
                      name="name"
                      value={draftProfile.name}
                      onChange={handleProfileChange}
                      autoFocus
                    />
                  </label>
                  <label
                    className="text-xs font-bold text-[#526159]"
                    htmlFor="profile-email"
                  >
                    Email
                    <input
                      className="mt-1 min-h-10 w-full rounded-md border border-[#bfcac1] bg-white px-3 text-sm font-normal text-[#1b2821] outline-none focus:border-[#1f5b45]"
                      id="profile-email"
                      name="email"
                      type="email"
                      value={draftProfile.email}
                      onChange={handleProfileChange}
                    />
                  </label>
                  <label
                    className="text-xs font-bold text-[#526159]"
                    htmlFor="profile-location"
                  >
                    Location
                    <input
                      className="mt-1 min-h-10 w-full rounded-md border border-[#bfcac1] bg-white px-3 text-sm font-normal text-[#1b2821] outline-none focus:border-[#1f5b45]"
                      id="profile-location"
                      name="location"
                      value={draftProfile.location}
                      onChange={handleProfileChange}
                    />
                  </label>
                  <div className="flex gap-2 sm:col-span-3">
                    <button
                      className="flex w-fit items-center gap-1.5 rounded-md bg-[#1f5b45] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#164634]"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="flex w-fit items-center gap-1.5 rounded-md border border-[#bfcac1] px-3 py-2 text-xs font-bold text-[#526159] transition hover:border-[#1f5b45]"
                      type="button"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <h2
                  id="profile-details-heading"
                  className="text-2xl font-bold text-[#1b2821]"
                >
                  {profile.name}
                </h2>
              )}
              <p className="mt-1 text-sm text-[#68756c]">{profile.email}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-[#7b887f]">
                <MapPin size={13} aria-hidden="true" /> Based in{" "}
                {profile.location}
              </p>
            </div>
            {!editing && (
              <button
                className="flex w-fit items-center gap-2 rounded-md border border-[#bfcac1] px-3.5 py-2 text-xs font-bold text-[#1f5b45] transition hover:border-[#1f5b45] hover:bg-[#edf3ed]"
                type="button"
                onClick={startEditing}
              >
                <Pencil size={14} aria-hidden="true" /> Edit details
              </button>
            )}
            <div className="ml-4">
              <SignOutButton>
                <button className="flex w-fit items-center gap-2 rounded-md border border-[#e6bcbc] bg-white px-3.5 py-2 text-xs font-bold text-[#b32b2b] transition hover:bg-[#ffecec]">Sign out</button>
              </SignOutButton>
            </div>
          </div>
        </section>

        <section className="mb-9" aria-labelledby="planned-trips-heading">
          <div className="mb-3 flex items-center gap-3">
            <h2
              id="planned-trips-heading"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]"
            >
              Planned trips
            </h2>
            <span className="h-px flex-1 bg-[#d8ddd6]" />
            <span className="text-xs text-[#8b968e]">
              {plannedTrips.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {plannedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        <section aria-labelledby="previous-trips-heading">
          <div className="mb-3 flex items-center gap-3">
            <h2
              id="previous-trips-heading"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#526159]"
            >
              Previous trips
            </h2>
            <span className="h-px flex-1 bg-[#d8ddd6]" />
            <span className="text-xs text-[#8b968e]">
              {previousTrips.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {previousTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} compact />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default UserProfile;
