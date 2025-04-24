import HomePage from "./pages/HomePage";
import VolunteerPage from "./pages/VolunteerPage";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import VolunteerCard from "./components/VolunteerCard";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthleteCard from "./components/AthleteCard";
import AthletesList from "./pages/SponsorDashboard";

function App() {
  const [loading, setLoading] = useState(false); // State to manage loading overlay
  return (
    <BrowserRouter>
      {loading && <Loader />} {/* Show loading overlay */}
      <Routes>
        {/* Home Page without Navbar */}

        <Route path="/" element={<HomePage setLoading={setLoading} />} />
        <Route path="/volunteer" element={<VolunteerPage />} />

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
              </Routes>
            </div>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
