import React, { useEffect, useState } from "react";
import AthleteCard from "../components/AthleteCard";
import { api } from "../api/api";

const AthletesList = () => {
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [sportSearchTerm, setSportSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [athleteList, setAthleteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchAthletes = async () => {
      try {
        const response = await api.get("/athletes/getAllAthletes");
        setAthleteList(response.data);
        console.log(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching athletes:", error);
        setError("Failed to load athletes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  // Get unique sports for dropdown
  const uniqueSports = [
    ...new Set(athleteList.map((athlete) => athlete.sport)),
  ];

  // Filter athletes based on both name and sport search terms
  const filteredAthletes = athleteList.filter(
    (athlete) =>
      (nameSearchTerm === "" ||
        athlete.userId.name.toLowerCase().includes(nameSearchTerm.toLowerCase())) &&
      (sportSearchTerm === "" ||
        athlete.sport.toLowerCase() === sportSearchTerm.toLowerCase())
  );

  // Select sport handler
  const handleSportSelect = (sport) => {
    setSportSearchTerm(sport);
    setIsDropdownOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setNameSearchTerm("");
    setSportSearchTerm("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="mx-auto p-4 bg-sky-950 mt-14">
      <div className="top-0 z-10 bg-sky-900 shadow-lg pt-4 pb-4 px-4 rounded-b-lg">
        <h1 className="text-3xl font-bold text-sky-50 mb-6">
          Athletes Directory
        </h1>

        {/* Search Section */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-900 p-6 rounded-xl shadow-md border border-sky-700">
          <h2 className="text-xl font-semibold text-sky-100 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-sky-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Find Athletes
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Name Search Input */}
            <div className="flex-1">
              <label
                htmlFor="name-search"
                className="block text-sm font-medium text-sky-200 mb-1"
              >
                Search by Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name-search"
                  className="block w-full pl-10 pr-3 py-2 border border-sky-600 rounded-lg bg-sky-800 text-sky-100 placeholder-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                  placeholder="Type athlete name..."
                  value={nameSearchTerm}
                  onChange={(e) => setNameSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sport Dropdown */}
            <div className="md:w-1/3">
              <label
                htmlFor="sport-select"
                className="block text-sm font-medium text-sky-200 mb-1"
              >
                Select Sport
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="relative w-full bg-sky-800 border border-sky-600 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="flex items-center">
                    {sportSearchTerm ? (
                      <>
                        <span className="h-6 w-6 flex items-center justify-center bg-sky-700 rounded-full mr-2">
                          <svg
                            className="h-4 w-4 text-sky-300"
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
                        </span>
                        <span className="block truncate text-sky-100">
                          {sportSearchTerm}
                        </span>
                      </>
                    ) : (
                      <span className="block truncate text-sky-300">
                        All Sports
                      </span>
                    )}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-sky-800 shadow-lg rounded-lg border border-sky-600 py-1 max-h-56 overflow-auto">
                    <div className="py-1">
                      {/* All Sports Option */}
                      <button
                        type="button"
                        className={`w-full text-left px-4 py-2 flex items-center hover:bg-sky-700 ${
                          sportSearchTerm === ""
                            ? "bg-sky-700 text-sky-100"
                            : "text-sky-100"
                        }`}
                        onClick={() => handleSportSelect("")}
                      >
                        <span className="h-6 w-6 flex items-center justify-center bg-sky-700 rounded-full mr-2">
                          <svg
                            className="h-4 w-4 text-sky-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </span>
                        <span className="font-medium">All Sports</span>
                      </button>

                      {/* Sport Options */}
                      {uniqueSports.map((sport, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`w-full text-left px-4 py-2 flex items-center hover:bg-sky-700 ${
                            sportSearchTerm === sport
                              ? "bg-sky-700 text-sky-100"
                              : "text-sky-100"
                          }`}
                          onClick={() => handleSportSelect(sport)}
                        >
                          <span className="h-6 w-6 flex items-center justify-center bg-sky-700 rounded-full mr-2">
                            {sport === "Athletics" && (
                              <svg
                                className="h-4 w-4 text-sky-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            )}
                            {sport === "Cricket" && (
                              <svg
                                className="h-4 w-4 text-sky-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                            )}
                            {sport === "Swimming" && (
                              <svg
                                className="h-4 w-4 text-sky-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                              </svg>
                            )}
                          </span>
                          <span>{sport}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reset Button */}
            <div className="md:w-auto flex items-end">
              <button
                onClick={resetFilters}
                className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-700 text-sky-100 rounded-lg hover:from-sky-500 hover:to-sky-600 transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with top padding to prevent overlap */}
      <div className="px-4 py-6">
        {/* Results Count with Search Info */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sky-200">
            <span className="font-medium">{filteredAthletes.length}</span>{" "}
            {filteredAthletes.length === 1 ? "athlete" : "athletes"} found
            {(nameSearchTerm || sportSearchTerm) && (
              <span>
                {" "}
                {nameSearchTerm && (
                  <span>
                    with name containing "
                    <span className="font-semibold text-sky-100">
                      {nameSearchTerm}
                    </span>
                    "{sportSearchTerm && " and "}
                  </span>
                )}
                {sportSearchTerm && (
                  <span>
                    in sport "
                    <span className="font-semibold text-sky-100">
                      {sportSearchTerm}
                    </span>
                    "
                  </span>
                )}
              </span>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-sky-900 rounded-xl p-8 text-center border border-sky-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-300 mx-auto"></div>
            <p className="mt-4 text-sky-200">Loading athletes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-sky-900 rounded-xl p-8 text-center border border-red-700">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-red-100">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-sky-600 text-sky-100 rounded-lg hover:bg-sky-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Athletes Grid */}
        {!isLoading &&
          !error &&
          (filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAthletes.map((athlete, index) => (
                <AthleteCard key={index} athlete={athlete} />
              ))}
            </div>
          ) : (
            <div className="bg-sky-900 rounded-xl p-8 text-center border border-sky-700">
              <svg
                className="mx-auto h-12 w-12 text-sky-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-sky-100">
                No athletes found
              </h3>
              <p className="mt-2 text-sky-300">
                Try changing your search criteria or clear filters
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-sky-600 text-sky-100 rounded-lg hover:bg-sky-500 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AthletesList;
