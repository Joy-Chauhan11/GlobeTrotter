import { ArrowRight, CircleDollarSign } from "lucide-react";

function ActivityExpenseRow({ activity, index }) {
  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-3 pl-1 sm:grid-cols-[1fr_auto] sm:gap-6 sm:pl-0">
      <div className="flex items-start gap-3 sm:order-1">
        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eaf0ea] text-xs font-bold text-[#1f5b45]">
          {index + 1}
        </span>
        <div>
          <h3 className="font-bold text-[#1b2821]">{activity.name}</h3>
          <p className="mt-1 text-xs text-[#68756c]">
            {activity.time} <span className="mx-1">·</span> {activity.type}
          </p>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#536159]">
            {activity.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-md border border-[#eadcc9] bg-[#fffaf2] px-3 py-2 sm:order-2 sm:w-32 sm:flex-col sm:items-start sm:justify-center">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#93633c]">
          <CircleDollarSign size={14} /> Expense
        </div>
        <strong className="text-sm text-[#7b5330]">{activity.cost}</strong>
      </div>
      {index > 0 && (
        <ArrowRight
          className="absolute -top-5 left-4 hidden text-[#aebbb1] sm:block"
          size={15}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default ActivityExpenseRow;
