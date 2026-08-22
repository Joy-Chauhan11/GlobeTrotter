import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#1b2821]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-[#526159]">Where are you going next?</p>

        <div className="mt-6 flex gap-3">
          <Link to="/trips/new" className="rounded-md bg-green-600 px-4 py-2 text-white">Plan New Trip</Link>
          <Link to="/trips" className="rounded-md border px-4 py-2">My Trips</Link>
          <Link to="/explore" className="rounded-md border px-4 py-2">Explore</Link>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Upcoming trips</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4 bg-white">Trip card placeholder</div>
            <div className="rounded-lg border p-4 bg-white">Trip card placeholder</div>
            <div className="rounded-lg border p-4 bg-white">Trip card placeholder</div>
          </div>
        </section>
      </div>
    </main>
  );
}
