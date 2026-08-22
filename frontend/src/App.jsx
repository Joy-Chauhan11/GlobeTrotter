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

import CalendarPage from "./pages/Calendar.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Admin from "./pages/Admin.jsx";

import { SignIn, SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/clerk/sign-in"
          element={
            <SignIn
              routing="path"
              path="/clerk/sign-in"
              afterSignInUrl="/dashboard"
            />
          }
        />

        <Route
          path="/clerk/sign-up"
          element={
            <SignUp
              routing="path"
              path="/clerk/sign-up"
              afterSignUpUrl="/dashboard"
            />
          }
        />

        {/* Public shared itinerary */}
        <Route
          path="/share/:tripId"
          element={<ShareTrip />}
        />


        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* Trips */}
        <Route
          path="/trips"
          element={
            <RequireAuth>
              <TripListing />
            </RequireAuth>
          }
        />

        <Route
          path="/trips/new"
          element={
            <RequireAuth>
              <CreateTrip />
            </RequireAuth>
          }
        />

        {/* Itinerary Builder */}
        <Route
          path="/trips/:tripId/build"
          element={
            <RequireAuth>
              <TripBuilder />
            </RequireAuth>
          }
        />

        {/* Alternative builder page from main branch */}
        <Route
          path="/build-itinerary"
          element={
            <RequireAuth>
              <BuildItinerary />
            </RequireAuth>
          }
        />

        {/* Final itinerary */}
        <Route
          path="/trips/:tripId/itinerary"
          element={
            <RequireAuth>
              <TripItinerary />
            </RequireAuth>
          }
        />

        {/* Explore */}
        <Route
          path="/explore"
          element={
            <RequireAuth>
              <Explore />
            </RequireAuth>
          }
        />

        {/* Activities */}
        <Route
          path="/activities"
          element={
            <RequireAuth>
              <ActivitySearch />
            </RequireAuth>
          }
        />

        {/* Community */}
        <Route
          path="/community"
          element={
            <RequireAuth>
              <Community />
            </RequireAuth>
          }
        />

        {/* Calendar */}
        <Route
          path="/calendar"
          element={
            <RequireAuth>
              <CalendarPage />
            </RequireAuth>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />

        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;