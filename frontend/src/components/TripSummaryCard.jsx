import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

function TripSummaryCard({ trip }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] transition hover:border-[#a7b9aa] hover:shadow-[0_10px_24px_rgba(31,91,69,0.08)] sm:flex-row">
      <div
        className={`relative h-24 shrink-0 bg-gradient-to-br ${trip.color} sm:h-auto sm:w-40`}
        aria-hidden="true"
      >
        <MapPin
          className="absolute bottom-3 left-4 text-[#1f5b45]/60"
          size={20}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h3 className="text-base font-bold text-[#1b2821]">{trip.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#68756c]">
            <CalendarDays size={13} aria-hidden="true" /> {trip.dates}
          </p>
          <p className="mt-2 text-sm text-[#536159]">{trip.destination}</p>
        </div>
        <a
          className="flex w-fit items-center gap-2 rounded-md border border-[#bfcac1] px-4 py-2 text-xs font-bold text-[#1f5b45] transition hover:border-[#1f5b45] hover:bg-[#edf3ed]"
          href={`/trips/${trip.id}`}
        >
          View trip <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default TripSummaryCard;
