import Header from "../components/Header";

export default function Explore() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="mt-2 text-sm text-[#526159]">Search cities and activities</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border p-4 bg-white">City card</div>
          <div className="rounded border p-4 bg-white">City card</div>
          <div className="rounded border p-4 bg-white">City card</div>
        </div>
      </div>
    </main>
  );
}
