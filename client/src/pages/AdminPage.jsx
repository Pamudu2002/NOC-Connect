import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiEye,
  FiCheck,
  FiX,
  FiTrash2,
  FiPlus,
  FiArrowLeft,
} from "react-icons/fi";
import {
  FaRunning,
  FaHandsHelping,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";
import { api } from "../api/api";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("pendingAthletes");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data - replace with your actual data fetching logic
  const [pendingAthletes, setPendingAthletes] = useState([
    {
      id: 1,
      fullName: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john@example.com",
      sport: "Basketball",
      status: "pending",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      phoneNumber: "234-567-8901",
      email: "jane@example.com",
      sport: "Swimming",
      status: "pending",
    },
  ]);

  const [pendingSponsors, setPendingSponsors] = useState([
    {
      id: 1,
      fullName: "Acme Corp",
      phoneNumber: "345-678-9012",
      email: "acme@example.com",
      status: "pending",
    },
  ]);

  const [athletes, setAthletes] = useState([
    {
      id: 3,
      fullName: "Mike Johnson",
      phoneNumber: "456-789-0123",
      email: "mike@example.com",
      sport: "Running",
      status: "accepted",
    },
  ]);

  const [sponsors, setSponsors] = useState([
    {
      id: 2,
      fullName: "Global Inc",
      phoneNumber: "567-890-1234",
      email: "global@example.com",
      status: "accepted",
    },
  ]);

  const [events, setEvents] = useState([
    {
      name: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      venue: "",
      description: "",
      image: "",
      volunteers: [
        { fullName: "", email: "", phoneNumber: "" },
        { fullName: "", email: "", phoneNumber: "" },
      ],
    },
  ]);

  const [volunteers, setVolunteers] = useState([
    {
      fullName: "",
      birthDate: "",
      phoneNumber: "",
      email: "",
      address: "",
      experience: "",
      eventName: "",
    },
  ]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await api.get("/users/all");
        const users = response.data;
  
        const mappedUsers = users.map(user => ({
          id: user._id,
          fullName: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          sport: user.sport,
          status: user.isAccepted ? "accepted" : "pending", // accepted / pending / rejected
          role: user.role
        }));
  
        setPendingAthletes(
          mappedUsers.filter((user) => user.role === "athlete" && user.status === "pending")
        );
        setPendingSponsors(
          mappedUsers.filter((user) => user.role === "sponsor" && user.status === "pending")
        );
        setAthletes(
          mappedUsers.filter((user) => user.role === "athlete" && user.status === "accepted")
        );
        setSponsors(
          mappedUsers.filter((user) => user.role === "sponsor" && user.status === "accepted")
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
  
    fetchAllUsers();
  }, []);  

  // Filter functions
  const filteredPendingAthletes = pendingAthletes.filter((athlete) => {
    const matchesSearch =
      athlete.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || athlete.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPendingSponsors = pendingSponsors.filter((sponsor) => {
    const matchesSearch = sponsor.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || sponsor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAthletes = athletes.filter((athlete) => {
    return (
      athlete.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredSponsors = sponsors.filter((sponsor) => {
    return sponsor.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      volunteer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Action handlers
  const handleAthleteStatusChange = (id, newStatus) => {
    setPendingAthletes(
      pendingAthletes.map((athlete) =>
        athlete.id === id ? { ...athlete, status: newStatus } : athlete
      )
    );
  };

  const handleSponsorStatusChange = (id, newStatus) => {
    setPendingSponsors(
      pendingSponsors.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, status: newStatus } : sponsor
      )
    );
  };

  const deleteAthlete = (id) => {
    setAthletes(athletes.filter((athlete) => athlete.id !== id));
  };

  const deleteSponsor = (id) => {
    setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
  };

  const deleteEvent = (name) => {
    setEvents((prev) => prev.filter((event) => event.name !== name));
    api
      .post("/events/deleteEvent", { name })
      .then((response) => {
        console.log(`Event "${name}" deleted successfully:`, response.data);
      })
      .catch((error) => {
        console.error(`Error deleting event "${name}":`, error);
      });
  };

  const deleteVolunteer = (id) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer._id !== id));
    api
      .post("/volunteers/deleteVolunteer", { id })
      .then((response) => {
        console.log(`Volunteer with ID "${id}" deleted successfully:`, response.data);
      })
      .catch((error) => {
        console.error(`Error deleting volunteer with ID "${id}":`, error);
      });
  };

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setShowAddEventModal(false);
  };
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await api.get("/events/getAllEvents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    const fetchAllVolunteers = async () => {
      try {
        const response = await api.get("/volunteers/getAllVolunteers");
        setVolunteers(response.data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchAllVolunteers();
  }, []);

  return (
    <div className="min-h-screen bg-sky-900 text-sky-50">
      {/* Header */}
      <header className="bg-sky-800 p-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-6 bg-sky-800 rounded-lg shadow-inner">
          <button
            onClick={() => setActiveTab("pendingAthletes")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "pendingAthletes"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaRunning className="mr-2" />
            Pending Athletes
            {pendingAthletes.length > 0 && (
              <span className="ml-2 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {pendingAthletes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("pendingSponsors")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "pendingSponsors"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaUserTie className="mr-2" />
            Pending Sponsors
            {pendingSponsors.length > 0 && (
              <span className="ml-2 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {pendingSponsors.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("athletes")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "athletes"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaRunning className="mr-2" />
            Athletes
          </button>

          <button
            onClick={() => setActiveTab("sponsors")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "sponsors"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaUserTie className="mr-2" />
            Sponsors
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "events"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaCalendarAlt className="mr-2" />
            Events
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={`flex items-center px-4 py-3 ${
              activeTab === "volunteers"
                ? "bg-sky-700 text-white"
                : "text-sky-200 hover:bg-sky-600"
            }`}
          >
            <FaHandsHelping className="mr-2" />
            Volunteers
          </button>

          <button
            onClick={() => console.log("Leave admin mode")}
            className="flex items-center px-4 py-3 text-sky-200 hover:bg-sky-600 ml-auto"
          >
            <FiArrowLeft className="mr-2" />
            Leave Admin Mode
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-sky-800 rounded-lg shadow-lg p-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-sky-300" />
              </div>
              <input
                type="text"
                placeholder={
                  activeTab === "pendingAthletes"
                    ? "Search by name or sport..."
                    : activeTab === "pendingSponsors" ||
                      activeTab === "sponsors"
                    ? "Search by name..."
                    : activeTab === "athletes"
                    ? "Search by name or sport..."
                    : activeTab === "events"
                    ? "Search by event name..."
                    : "Search by name or event..."
                }
                className="w-full pl-10 pr-4 py-2 bg-sky-700 border border-sky-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 placeholder-sky-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {(activeTab === "pendingAthletes" ||
              activeTab === "pendingSponsors") && (
              <div className="w-full md:w-auto">
                <select
                  className="w-full px-4 py-2 bg-sky-700 border border-sky-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}

            {activeTab === "events" && (
              <button
                onClick={() => setShowAddEventModal(true)}
                className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition"
              >
                <FiPlus className="mr-2" />
                Add Event
              </button>
            )}
          </div>

          {/* Tables */}
          <div className="overflow-x-auto">
            {/* Pending Athletes Table */}
            {activeTab === "pendingAthletes" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Sport
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredPendingAthletes.map((athlete) => (
                      <tr key={athlete.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {athlete.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.sport}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              athlete.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : athlete.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {athlete.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-sky-400 hover:text-sky-300">
                              <FiEye />
                            </button>
                            <button
                              className="text-green-400 hover:text-green-300"
                              onClick={() =>
                                handleAthleteStatusChange(
                                  athlete.id,
                                  "accepted"
                                )
                              }
                            >
                              <FiCheck />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() =>
                                handleAthleteStatusChange(
                                  athlete.id,
                                  "rejected"
                                )
                              }
                            >
                              <FiX />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPendingAthletes.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No pending athletes found
                  </div>
                )}
              </div>
            )}

            {/* Pending Sponsors Table */}
            {activeTab === "pendingSponsors" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredPendingSponsors.map((sponsor) => (
                      <tr key={sponsor.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {sponsor.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sponsor.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sponsor.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              sponsor.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : sponsor.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {sponsor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-sky-400 hover:text-sky-300">
                              <FiEye />
                            </button>
                            <button
                              className="text-green-400 hover:text-green-300"
                              onClick={() =>
                                handleSponsorStatusChange(
                                  sponsor.id,
                                  "accepted"
                                )
                              }
                            >
                              <FiCheck />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() =>
                                handleSponsorStatusChange(
                                  sponsor.id,
                                  "rejected"
                                )
                              }
                            >
                              <FiX />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPendingSponsors.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No pending sponsors found
                  </div>
                )}
              </div>
            )}

            {/* Athletes Table */}
            {activeTab === "athletes" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Sport
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredAthletes.map((athlete) => (
                      <tr key={athlete.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {athlete.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {athlete.sport}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-sky-400 hover:text-sky-300">
                              <FiEye />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => deleteAthlete(athlete.id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAthletes.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No athletes found
                  </div>
                )}
              </div>
            )}

            {/* Sponsors Table */}
            {activeTab === "sponsors" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredSponsors.map((sponsor) => (
                      <tr key={sponsor.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {sponsor.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sponsor.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sponsor.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-sky-400 hover:text-sky-300">
                              <FiEye />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => deleteSponsor(sponsor.id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSponsors.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No sponsors found
                  </div>
                )}
              </div>
            )}

            {/* Events Table */}
            {activeTab === "events" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Venue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {event.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.venue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              className="text-sky-400 hover:text-sky-300"
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEventModal(true);
                              }}
                            >
                              <FiEye />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-300"
                              onClick={() => deleteEvent(event.name)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredEvents.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No events found
                  </div>
                )}
              </div>
            )}

            {/* Volunteers Table */}
            {activeTab === "volunteers" && (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-sky-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider sticky left-0 bg-sky-700">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Birth Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-sky-800 divide-y divide-sky-700">
                    {filteredVolunteers.map((volunteer) => (
                      <tr key={volunteer.id}>
                        <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-sky-800">
                          {volunteer.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.birthDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.experience}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {volunteer.eventName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-red-400 hover:text-red-300"
                            onClick={() => deleteVolunteer(volunteer._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredVolunteers.length === 0 && (
                  <div className="text-center py-8 text-sky-300">
                    No volunteers found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event View Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-sky-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedEvent.name}</h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-sky-300 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Start Date:</span>{" "}
                      {selectedEvent.startDate}
                    </p>
                    <p>
                      <span className="font-medium">End Date:</span>{" "}
                      {selectedEvent.endDate}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                    <p>
                      <span className="font-medium">Venue:</span>{" "}
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{selectedEvent.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Volunteers ({selectedEvent.volunteers.length})
                </h3>
                <div className="bg-sky-700 rounded-lg p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sky-600">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.volunteers.map((volunteer, index) => (
                        <tr
                          key={index}
                          className="border-b border-sky-600 last:border-0"
                        >
                          <td className="py-3">{volunteer.fullName}</td>
                          <td className="py-3">{volunteer.email}</td>
                          <td className="py-3">{volunteer.phoneNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-sky-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Add New Event</h2>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="text-sky-300 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const newEvent = {
                    name: formData.get("name"),
                    image: formData.get("image"),
                    startDate: formData.get("startDate"),
                    endDate: formData.get("endDate"),
                    startTime: formData.get("startTime"),
                    endTime: formData.get("endTime"),
                    venue: formData.get("venue"),
                    description: formData.get("description"),
                    volunteers: [],
                  };

                  // Make the API call
                  api.post("/events/addEvent", newEvent).then((response) => {
                    // Add the new event to local state
                    addEvent(response.data);
                    // Close the modal
                    setShowAddEventModal(false);
                  });
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      className="w-full px-3 py-2 bg-sky-700 border border-sky-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
