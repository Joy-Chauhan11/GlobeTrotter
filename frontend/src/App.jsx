import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TripListing from "./pages/TripListing.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ActivitySearch from "./pages/ActivitySearch.jsx";
import ItineraryView from "./pages/ItineraryView.jsx";
import CommunityTab from "./pages/CommunityTab.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import BuildItinerary from "./pages/BuildItinerary.jsx";
import { SignIn } from "@clerk/clerk-react";
import { SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<TripListing />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/activities" element={<ActivitySearch />} />
        <Route path="/itinerary-view" element={<ItineraryView />} />
        <Route path="/itinerary/:id" element={<ItineraryView />} />
        <Route path="/community" element={<CommunityTab />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/build-itinerary" element={<BuildItinerary />} />
        <Route
          path="/clerk/sign-in"
          element={
            <SignIn
              routing="path"
              path="/clerk/sign-in"
              fallbackRedirectUrl="/trips"
            />
          }
        />
        <Route
          path="/clerk/sign-up"
          element={
            <SignUp
              routing="path"
              path="/clerk/sign-up"
              fallbackRedirectUrl="/trips"
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
