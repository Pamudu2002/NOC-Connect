import HomePage from "./pages/HomePage";
import VolunteerPage from "./pages/VolunteerPage";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthletesList from "./pages/SponsorDashboard";
import PlayerProfile from "./pages/PlayerProfile";
import PlayerProfileView from "./pages/PlayerProfileView";
import SignupForm from "./pages/SignupPage";
import LoginForm from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
function App() {
  const [loading, setLoading] = useState(false); // State to manage loading overlay
  return (
    <BrowserRouter>
      {loading && <Loader />} {/* Show loading overlay */}
      <Routes>
        {/* Home Page without Navbar */}

        <Route path="/" element={<HomePage setLoading={setLoading} />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* All Other Pages with Navbar */}
        <Route
          path="/*"
          element={
            <div className="App bg-white">
              {!loading && <Navbar />} {/* Hide Navbar while loading */}
              <Routes>
                <Route
                  path="/athletes"
                  element={
                    <AthletesList setLoading={setLoading} loading={loading} />
                  }
                />
                <Route path="/player" element={<PlayerProfile />} />
                <Route
                  path="/playerView/:userId"
                  element={<PlayerProfileView />}
                />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
