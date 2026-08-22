import Header from "../components/Header";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="mt-2 text-sm text-[#526159]">Trip calendar and events</p>
        <div className="mt-6 rounded border bg-white p-4">Calendar placeholder</div>
      </div>
    </main>
  );
}
