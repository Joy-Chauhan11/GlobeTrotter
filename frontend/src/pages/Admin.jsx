import Header from "../components/Header";

export default function Admin() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-[#526159]">Site metrics and management tools</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded border p-4 bg-white">Total Users</div>
          <div className="rounded border p-4 bg-white">Total Trips</div>
          <div className="rounded border p-4 bg-white">Popular City</div>
        </div>
      </div>
    </main>
  );
}
