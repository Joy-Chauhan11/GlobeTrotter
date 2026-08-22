import { ArrowDownUp, ChevronDown, Filter, Search } from "lucide-react";

function SearchToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  filterOptions = [],
  onSort,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-3 sm:flex-row sm:items-center">
      <label className="flex min-h-10 flex-1 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-[#7c8880] focus-within:border-[#1f5b45]">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">Search</span>
        <input
          className="w-full border-0 bg-transparent text-sm text-[#1b2821] outline-none placeholder:text-[#9ca69f]"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search here ..."
        />
      </label>
      <div className="flex gap-2">
        <label className="relative flex flex-1 items-center">
          <Filter
            className="pointer-events-none absolute left-3 text-[#647169]"
            size={14}
            aria-hidden="true"
          />
          <span className="sr-only">Filter results</span>
          <select
            className="min-h-10 w-full appearance-none rounded-md border border-[#d8ddd6] bg-white py-2 pl-9 pr-8 text-xs font-bold text-[#405047] outline-none focus:border-[#1f5b45]"
            value={filter}
            onChange={(event) => onFilterChange(event.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 text-[#647169]"
            size={14}
            aria-hidden="true"
          />
        </label>
        <button
          className="flex min-h-10 items-center gap-2 rounded-md border border-[#d8ddd6] bg-white px-3 text-xs font-bold text-[#405047] transition hover:border-[#1f5b45]"
          type="button"
          onClick={onSort}
        >
          <ArrowDownUp size={14} aria-hidden="true" />{" "}
          <span className="hidden sm:inline">Sort by...</span>
        </button>
      </div>
    </div>
  );
}

export default SearchToolbar;
