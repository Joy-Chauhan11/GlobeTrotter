import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import TripListing from "./pages/TripListing.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import TripBuilder from "./pages/TripBuilder.jsx";
import BuildItinerary from "./pages/BuildItinerary.jsx";
import TripItinerary from "./pages/TripItinerary.jsx";

import Explore from "./pages/Explore.jsx";
import ActivitySearch from "./pages/ActivitySearch.jsx";
import Community from "./pages/Community.jsx";
import ShareTrip from "./pages/ShareTrip.jsx";

import CalendarView from "./pages/CalendarView.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= PUBLIC ROUTES ========================= */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public shared itinerary */}
        <Route path="/share/:tripId" element={<ShareTrip />} />

        {/* ========================= PROTECTED ROUTES ========================= */}

        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/trips" element={<RequireAuth><TripListing /></RequireAuth>} />
        <Route path="/trips/new" element={<RequireAuth><CreateTrip /></RequireAuth>} />
        <Route path="/create-trip" element={<RequireAuth><CreateTrip /></RequireAuth>} />
        <Route path="/trips/:tripId/build" element={<RequireAuth><TripBuilder /></RequireAuth>} />
        <Route path="/build-itinerary" element={<RequireAuth><BuildItinerary /></RequireAuth>} />
        <Route path="/trips/:tripId/itinerary" element={<RequireAuth><TripItinerary /></RequireAuth>} />
        <Route path="/explore" element={<RequireAuth><Explore /></RequireAuth>} />
        <Route path="/activities" element={<RequireAuth><ActivitySearch /></RequireAuth>} />
        <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
        <Route path="/calendar" element={<RequireAuth><CalendarView /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />

        {/* ========================= FALLBACK ========================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;