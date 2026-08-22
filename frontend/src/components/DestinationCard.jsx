import { ArrowRight, MapPin } from "lucide-react";

function DestinationCard({ destination, compact = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] ${compact ? "" : "min-w-[220px]"}`}
    >
      <div
        className="relative h-28 overflow-hidden"
        aria-hidden="true"
      >
        {destination.imageUrl ? (
          <img src={destination.imageUrl} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className={`absolute inset-0 h-full w-full bg-gradient-to-br ${destination.color}`} />
        )}
        <div className="absolute inset-0 bg-black/10" />
        <MapPin
          className="absolute bottom-3 left-4 text-white drop-shadow-md"
          size={19}
        />
        <span className="absolute right-4 top-4 h-9 w-9 rounded-full border border-white/50" />
      </div>
      <div className="p-4">
        <h3 className="truncate text-sm font-bold text-[#1b2821]">
          {destination.name}
        </h3>
        <p className="mt-1 truncate text-xs text-[#738078]">
          {destination.country}
        </p>
        <p className="mt-2 text-xs text-[#526159]">{destination.detail}</p>
        <button
          className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#1f5b45] transition group-hover:gap-2.5"
          type="button"
        >
          Explore <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
