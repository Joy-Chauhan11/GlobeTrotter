import { Globe2, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <nav className="flex items-center gap-6">
          <Link className="flex items-center gap-2.5 text-sm font-bold tracking-tight" to="/">
            <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]"><Globe2 size={17} /></span>
            GlobeTrotter
          </Link>
          <Link className="text-sm text-[#405047] hover:text-[#1f5b45]" to="/">Home</Link>
          <Link className="text-sm text-[#405047] hover:text-[#1f5b45]" to="/trips">Trips</Link>
          <Link className="text-sm text-[#405047] hover:text-[#1f5b45]" to="/activities">Activities</Link>
          <Link className="text-sm text-[#405047] hover:text-[#1f5b45]" to="/profile">Profile</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45] transition hover:bg-[#eaf0ea]" aria-label="Open profile">
            <UserCircle size={20} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </header>
  );
}
