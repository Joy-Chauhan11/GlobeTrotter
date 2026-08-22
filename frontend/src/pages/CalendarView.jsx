import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getTrips } from "../lib/api";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, 
  isWithinInterval, parseISO 
} from "date-fns";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrips()
      .then(data => setTrips(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to fetch trips for calendar", err))
      .finally(() => setLoading(false));
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Calendar logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;

      // Find trips that span across this day
      const daysTrips = trips.filter(trip => {
        try {
          const start = parseISO(trip.startDate);
          const end = parseISO(trip.endDate);
          return isWithinInterval(cloneDay, { start, end }) || isSameDay(cloneDay, start) || isSameDay(cloneDay, end);
        } catch {
          return false;
        }
      });

      days.push(
        <div
          className={`min-h-[100px] p-2 border-r border-b border-[#e2e8e4] relative transition ${
            !isSameMonth(day, monthStart)
              ? "bg-[#f5f3ed] text-[#a7b9aa]"
              : isSameDay(day, new Date())
              ? "bg-[#e2e8e4] text-[#1f5b45] font-bold"
              : "bg-white text-[#526159]"
          }`}
          key={day}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm">{formattedDate}</span>
          </div>
          
          <div className="mt-1 space-y-1">
            {daysTrips.map((trip, idx) => {
              const isStart = isSameDay(cloneDay, parseISO(trip.startDate));
              return (
                <Link
                  key={`${trip.id}-${idx}`}
                  to={`/trips/${trip.id}/itinerary`}
                  className={`block px-2 py-1 text-[10px] font-bold truncate rounded-sm transition hover:opacity-80
                    ${trip.color ? `bg-gradient-to-r ${trip.color}` : "bg-[#1f5b45]"} text-white
                    ${isStart ? "rounded-l-md" : "rounded-none"}
                  `}
                >
                  {trip.title}
                </Link>
              );
            })}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
  }

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
    <div key={day} className="text-center font-bold text-[11px] text-[#8b968e] py-3 tracking-wider">
      {day}
    </div>
  ));

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <Header />
      
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-11">
        <div className="mb-7 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">
              Timeline
            </p>
            <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">
              Calendar View
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="flex items-center bg-white border border-[#d8ddd6] rounded-md px-3 py-2 flex-1 sm:min-w-[250px]">
                <Search size={16} className="text-[#8b968e]" />
                <input type="text" placeholder="Search trips..." className="ml-2 w-full outline-none text-sm bg-transparent" />
             </div>
             <div className="flex gap-2">
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#d8ddd6] rounded-md text-sm font-bold text-[#526159]">
                 Group by
               </button>
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#d8ddd6] rounded-md text-sm font-bold text-[#526159]">
                 <Filter size={16} /> Filter
               </button>
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#d8ddd6] rounded-md text-sm font-bold text-[#526159]">
                 Sort by
               </button>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#d8ddd6] shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-[#e2e8e4]">
            <button onClick={prevMonth} className="p-2 hover:bg-[#f5f3ed] rounded-full transition text-[#526159]">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            <button onClick={nextMonth} className="p-2 hover:bg-[#f5f3ed] rounded-full transition text-[#526159]">
              <ChevronRight size={24} />
            </button>
          </div>
          
          {loading ? (
            <div className="p-10 text-center text-[#68756c]">Loading timeline...</div>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-7 border-b border-[#e2e8e4] bg-[#fbfaf6]">
                {weekDays}
              </div>
              <div className="grid grid-cols-7 border-l border-[#e2e8e4]">
                {days}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
