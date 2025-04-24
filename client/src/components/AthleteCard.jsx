import React from "react";
import { Medal, Trophy, Award, Star } from "lucide-react";

const AthleteCard = ({ athlete }) => {
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

  const getAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    return age;
  };

  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-sky-950 to-sky-900 p-0 m-4 border border-sky-800 hover:shadow-xl transition-all duration-300 hover:translate-y-1 flex flex-col">
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm">{athlete.userId.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - wrapped in a flex-grow div */}
      <div className="p-6 flex-grow">
        {/* Primary info with icons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-800 rounded-lg">
              <svg
                className="w-4 h-4 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-sky-400 font-medium">Gender</p>
              <p className="text-sm text-sky-100">{athlete.gender}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-800 rounded-lg">
              <svg
                className="w-4 h-4 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-sky-400 font-medium">Nationality</p>
              <p className="text-sm text-sky-100">{athlete.nationility}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-800 rounded-lg">
              <svg
                className="w-4 h-4 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-sky-400 font-medium">Age</p>
              <p className="text-sm text-sky-100">
                {getAge(athlete.dateOfBirth)}
              </p>
            </div>
          </div>
        </div>

        {/* Sport info with highlight */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-900 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-sky-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="font-bold text-sky-100">Sport Details</span>
          </div>
          <p className="flex items-center justify-between py-1 border-b border-sky-700">
            <span className="text-sm font-medium text-sky-400">Sport:</span>
            <span className="text-sm text-sky-100 font-semibold">
              {athlete.sport}
            </span>
          </p>
          <p className="flex items-center justify-between py-1 border-b border-sky-700">
            <span className="text-sm font-medium text-sky-400">Height:</span>
            <span className="text-sm text-sky-100">{athlete.height}</span>
          </p>
          <p className="flex items-center justify-between py-1">
            <span className="text-sm font-medium text-sky-400">Weight:</span>
            <span className="text-sm text-sky-100">{athlete.weight}</span>
          </p>
        </div>

        {/* Achievement section - updated for pointwise display */}
        <div className="bg-sky-900 border-l-4 border-sky-400 p-3 mb-4 rounded-r-lg">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-sky-400 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="w-full">
              <p className="text-xs text-sky-400 font-medium mb-2">
                Achievements
              </p>

              {/* Assuming athlete.achievements is an array of strings */}
              <div className="space-y-2">
                {Array.isArray(athlete.achievements) ? (
                  athlete.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-sky-800 p-2 rounded-lg shadow-sm"
                    >
                      {getAchievementIcon(achievement)}
                      <p className="text-sm text-sky-100 font-medium">
                        {achievement}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-sky-100 font-medium">
                    {athlete.achievements}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons - now in a separate div outside of content area */}
      <div className="flex p-4 bg-sky-900 border-t border-sky-800 mt-auto">
        <button className="flex-1 flex items-center justify-center gap-2 bg-sky-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-sky-500 transition-colors duration-300 shadow-md">
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
        </button>
        <button className="ml-2 flex items-center justify-center p-2 bg-sky-800 text-sky-300 rounded-xl hover:bg-sky-700 transition-colors duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AthleteCard;
