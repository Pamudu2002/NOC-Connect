import React, { useEffect, useState } from "react";
import { Medal, Trophy, Award, Star } from "lucide-react";
import { api } from "../api/api";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const AthleteCard = ({ athlete }) => {
  const [athleteAchievements, setAthleteAchievements] = useState([]);

  useEffect(() => {
    const fetchAthleteAchievements = async () => {
      try {
        const response = await api.get("/achievements/" + athlete.userId._id);
        console.log(response.data);
        setAthleteAchievements(response.data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching athlete achievements:", error);
      }
    };

    fetchAthleteAchievements();
  }, []);
  // Function to determine which icon to display based on achievement text
  const getAchievementIcon = (achievement) => {
    const text = achievement.toLowerCase();
    if (
      text.includes("gold") ||
      text.includes("medal") ||
      text.includes("olympic")
    ) {
      return <Medal className="w-4 h-4 text-yellow-500" />;
    } else if (
      text.includes("champion") ||
      text.includes("trophy") ||
      text.includes("cup")
    ) {
      return <Trophy className="w-4 h-4 text-amber-600" />;
    } else if (
      text.includes("award") ||
      text.includes("mvp") ||
      text.includes("player")
    ) {
      return <Award className="w-4 h-4 text-blue-500" />;
    } else {
      return <Star className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-sky-950 to-sky-900  border border-sky-800 hover:shadow-xl transition-all duration-300 hover:translate-y-1 flex flex-col">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-300 shadow-md">
            <img
              className="w-full h-full object-cover"
              src={athlete.userId.profilePicture || "/default-avatar.png"}
              alt={`${athlete.userId.name}'s profile`}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {athlete.userId.name}
            </h2>
            <div className="flex items-center gap-2 text-sky-300">
              <span className="text-sm">{athlete.sport}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - wrapped in a flex-grow div */}
      <div className="p-3 flex-grow ">
        {/* Achievement section - updated for pointwise display */}
        <div className="bg-sky-800 border-l-4 border-sky-400 p-3  rounded-r-lg">
          <div className="flex items-start  ">
            <div className="w-full">
              <div className="flex  gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-sky-400 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-sky-400 font-medium mb-2">
                  Recent Achievements
                </p>
              </div>

              {/* Assuming athlete.achievements is an array of strings */}
              <div className="space-y-3">
                {Array.isArray(athleteAchievements) ? (
                  athleteAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-sky-700 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-sky-500"
                    >
                      <div className="mt-1">
                        {getAchievementIcon(achievement.title)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-sky-100 font-semibold mb-0.5">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-sky-200">
                          {achievement.subtitle}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-sky-700 p-3 rounded-lg shadow-md border-l-4 border-sky-500">
                    <p className="text-sm text-sky-100 font-medium">
                      {athleteAchievements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons - now in a separate div outside of content area */}
      <div className="flex p-4 bg-sky-900 border-t border-sky-800 ">
        <Link to={`/playerView/${athlete.userId._id}`} className="flex-1 flex items-center justify-center gap-2 bg-sky-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-sky-500 transition-colors duration-300 shadow-md">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AthleteCard;
