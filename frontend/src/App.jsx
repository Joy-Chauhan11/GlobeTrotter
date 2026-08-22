import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TripListing from "./pages/TripListing.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ActivitySearch from "./pages/ActivitySearch.jsx";
import Home from "./pages/Home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import TripBuilder from "./pages/TripBuilder.jsx";
import TripItinerary from "./pages/TripItinerary.jsx";
import Explore from "./pages/Explore.jsx";
import Community from "./pages/Community.jsx";
import ShareTrip from "./pages/ShareTrip.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import Admin from "./pages/Admin.jsx";
import { SignIn } from "@clerk/clerk-react";
import { SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<RequireAuth><TripListing /></RequireAuth>} />
        <Route path="/trips/new" element={<RequireAuth><CreateTrip /></RequireAuth>} />
        <Route path="/trips/:tripId/build" element={<RequireAuth><TripBuilder /></RequireAuth>} />
        <Route path="/trips/:tripId/itinerary" element={<RequireAuth><TripItinerary /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
        <Route path="/activities" element={<RequireAuth><ActivitySearch /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/explore" element={<RequireAuth><Explore /></RequireAuth>} />
        <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
        <Route path="/share/:tripId" element={<ShareTrip />} />
        <Route path="/calendar" element={<RequireAuth><CalendarPage /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        <Route
          path="/clerk/sign-in"
          element={<SignIn routing="path" path="/clerk/sign-in" afterSignInUrl="/trips" />}
        />
        <Route
          path="/clerk/sign-up"
          element={<SignUp routing="path" path="/clerk/sign-up" afterSignUpUrl="/trips" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
