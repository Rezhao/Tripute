import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import TripListPage from "./pages/TripListPage.jsx";
import CreateTripPage from "./pages/CreateTripPage.jsx";
import TripDashboardPage from "./pages/TripDashboardPage.jsx";
import ItineraryPage from "./pages/ItineraryPage.jsx";

export default function App() {
  return (
    <div className="app-shell min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripListPage />} />
        <Route path="/trips/new" element={<CreateTripPage />} />
        <Route path="/trips/:tripId" element={<TripDashboardPage />} />
        <Route path="/trips/:tripId/itinerary" element={<ItineraryPage />} />
      </Routes>
    </div>
  );
}
