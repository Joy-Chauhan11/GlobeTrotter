import { Globe2, UserCircle } from "lucide-react";

function TravelHeader({ actionLabel, actionHref = "/create-trip" }) {
  return (
    <header className="border-b border-[#d8ddd6] bg-[#fbfaf6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#1b2821]"
          href="/"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[13px_13px_13px_3px] bg-[#1f5b45] text-[#f5f3ed]">
            <Globe2 size={17} aria-hidden="true" />
          </span>
          GlobeTrotter
        </a>
        <div className="flex items-center gap-3">
          {actionLabel && (
            <a
              className="hidden rounded-md bg-[#1f5b45] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#164634] sm:block"
              href={actionHref}
            >
              {actionLabel}
            </a>
          )}
          <a
            className="grid h-9 w-9 place-items-center rounded-full border border-[#ccd5ce] text-[#1f5b45] transition hover:bg-[#eaf0ea]"
            href="/profile"
            aria-label="Open profile"
          >
            <UserCircle size={20} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default TravelHeader;
