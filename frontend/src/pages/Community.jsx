import Header from "../components/Header";

export default function Community() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="mt-2 text-sm text-[#526159]">Discover and share public trips</p>

        <div className="mt-6 grid gap-4">
          <div className="rounded border p-4 bg-white">Featured trip card</div>
          <div className="rounded border p-4 bg-white">Popular trip card</div>
        </div>
      </div>
    </main>
  );
}
