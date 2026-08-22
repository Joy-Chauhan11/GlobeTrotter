import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import heroImage from "../assets/hero-travel.jpg";
import { useUser } from "@clerk/clerk-react";

function HomeAuth() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">
      <Header />
      <section className="mx-auto max-w-6xl px-6 py-16 lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold leading-tight text-[#0f2a20] sm:text-5xl">
            Plan delightful trips — together.
          </h1>
          <p className="mt-4 text-lg text-[#41524a]">
            Create beautiful trip plans, invite friends, and capture memories along the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {!isSignedIn ? (
              <Link to="/clerk/sign-in" className="inline-block rounded-md bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm">Get started</Link>
            ) : null}
            <Link to="/trips" className="inline-block rounded-md border border-gray-200 px-5 py-3 text-sm font-medium text-[#405047]">Explore trips</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/60 p-3 text-xs font-semibold text-[#405047]">Collaborative planning</div>
            <div className="rounded-lg bg-white/60 p-3 text-xs font-semibold text-[#405047]">Offline maps</div>
            <div className="rounded-lg bg-white/60 p-3 text-xs font-semibold text-[#405047]">Expense splitting</div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <div className="rounded-2xl bg-gradient-to-br from-[#f5f8ff] to-[#eef6f2] p-6 shadow-lg">
            <img alt="travel preview" src={heroImage} className="w-full rounded-lg object-cover max-h-72" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="text-lg font-bold text-[#1b2821]">Why GlobeTrotter</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-[#e6eee6] bg-white p-5">
            <h4 className="font-semibold">Plan once, reuse forever</h4>
            <p className="mt-2 text-sm text-[#5c6a61]">Save itineraries and adapt them for future trips.</p>
          </div>
          <div className="rounded-lg border border-[#e6eee6] bg-white p-5">
            <h4 className="font-semibold">Invite friends</h4>
            <p className="mt-2 text-sm text-[#5c6a61]">Co-edit plans and coordinate logistics together.</p>
          </div>
          <div className="rounded-lg border border-[#e6eee6] bg-white p-5">
            <h4 className="font-semibold">Keep records</h4>
            <p className="mt-2 text-sm text-[#5c6a61]">Track expenses, notes and memories in one place.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

  if (!clerkKey) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">
        <Header />
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold">Welcome to GlobeTrotter</h1>
          <p className="mt-4 text-lg text-[#41524a]">Discover, plan and share trips with friends.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/login" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md">Log in</Link>
            <Link to="/register" className="inline-block border border-gray-200 px-6 py-3 rounded-md">Sign up</Link>
          </div>
        </section>
      </main>
    );
  }

  return <HomeAuth />;
}
