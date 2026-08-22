import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import ActivityExpenseRow from "./ActivityExpenseRow.jsx";

function DayTimeline({ day }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section
      className="rounded-lg border border-[#d8ddd6] bg-[#fbfaf6] p-5 sm:p-6"
      aria-labelledby={`day-${day.id}`}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#1f5b45] text-xs font-bold text-white">
            Day {day.id}
          </span>
          <div>
            <h2 id={`day-${day.id}`} className="text-lg font-bold">
              {day.title}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[#718078]">
              <CalendarDays size={13} /> {day.date}
            </p>
          </div>
        </div>
        <button
          className="grid h-8 w-8 place-items-center rounded-md border border-[#d8ddd6] text-[#647169]"
          type="button"
          aria-label={`Toggle ${day.title}`}
          aria-expanded={isExpanded}
          aria-controls={`activities-${day.id}`}
          onClick={() => setIsExpanded((current) => !current)}
        >
          <ChevronDown
            className={`transition-transform ${isExpanded ? "" : "-rotate-90"}`}
            size={16}
            aria-hidden="true"
          />
        </button>
      </div>
      {isExpanded && (
        <div
          className="space-y-5 border-l border-dashed border-[#b7c5ba] pl-4 sm:pl-6"
          id={`activities-${day.id}`}
        >
          {day.activities.map((activity, index) => (
            <ActivityExpenseRow
              key={activity.name}
              activity={activity}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DayTimeline;
