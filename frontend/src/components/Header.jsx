import { Globe2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isSignedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <nav className="flex items-center gap-6">
          <Link className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#1b2821]" to="/">
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
              <Globe2 size={17} />
            </span>
            GlobeTrotter
          </Link>
          {isSignedIn && (
            <>
              <Link className="text-sm font-medium text-[#405047] hover:text-[#1f5b45]" to="/dashboard">Dashboard</Link>
              <Link className="text-sm font-medium text-[#405047] hover:text-[#1f5b45]" to="/trips">My Trips</Link>
              <Link className="text-sm font-medium text-[#405047] hover:text-[#1f5b45]" to="/explore">Explore</Link>
              <Link className="text-sm font-medium text-[#405047] hover:text-[#1f5b45]" to="/calendar">Calendar</Link>
              <Link className="text-sm font-medium text-[#405047] hover:text-[#1f5b45]" to="/community">Community</Link>
              {user?.role === 'ADMIN' && (
                <Link className="text-sm font-bold text-[#1f5b45] bg-[#edf3ed] px-2 py-1 rounded" to="/admin">Admin</Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link
                to="/trips/new"
                className="hidden sm:inline-flex items-center rounded-md bg-[#1f5b45] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#164634] transition"
              >
                + Plan Trip
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-[#405047] hover:text-[#1f5b45]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#edf3ed] text-[#1f5b45] text-xs font-bold border border-[#d8ddd6]">
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-[#8b968e] hover:text-red-500 transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-xs font-bold text-[#405047] hover:text-[#1f5b45]">Log in</Link>
              <Link to="/register" className="rounded-md bg-[#1f5b45] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#164634] transition">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
