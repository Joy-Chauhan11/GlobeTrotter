import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function ShareTrip() {
  const { tripId } = useParams();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-5 py-10">
        <h1 className="text-2xl font-bold">Shared Trip</h1>
        <p className="text-sm text-[#526159]">Public view for trip {tripId}</p>
        <div className="mt-6 rounded border bg-white p-4">Public itinerary preview</div>
      </div>
    </main>
  );
}
