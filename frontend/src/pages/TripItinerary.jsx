import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function TripItinerary() {
  const { tripId } = useParams();

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl font-bold">Trip Itinerary</h1>
        <p className="text-sm text-[#526159] mt-1">Viewing itinerary for trip {tripId}</p>

        <div className="mt-6 rounded border bg-white p-4">Timeline / calendar view placeholder</div>
      </div>
    </main>
  );
}
