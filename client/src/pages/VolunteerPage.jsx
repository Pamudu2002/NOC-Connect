import React from 'react'
import { useState, useEffect } from 'react'
import VolunteerCard from '../components/VolunteerCard'
import { api } from '../api/api' // Assuming you have an api.js file for API calls
import { Search, Home } from 'lucide-react'
import { Link } from 'react-router-dom' // Assuming you're using React Router

function VolunteerPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/events/getAllEvents');
        setEvents(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load volunteer events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events?.filter(event => 
    event?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-sky-950 text-sky-100">
      {/* Header Section with Logo and Navigation */}
      <header className="bg-sky-900 py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">NOC</span>
              </div>
              <span className="text-xl font-bold text-white">Connect</span>
            </div>
            
            {/* Back to Home Button */}
            <Link 
              to="/" 
              className="flex items-center px-4 py-2 bg-sky-800 hover:bg-sky-700 rounded-lg transition-colors duration-300 text-sky-100"
            >
              <Home size={18} className="mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          {/* Page Title and Description */}
          <h1 className="text-3xl font-bold text-sky-100 mb-2">Volunteer Opportunities</h1>
          <p className="text-sky-300 max-w-2xl">
            Discover meaningful volunteer events and make a difference in your community.
          </p>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="bg-sky-900/50 py-6 border-y border-sky-800">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-sky-400" />
            </div>
            <input
              type="text"
              placeholder="Search volunteer events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-sky-950 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 placeholder-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Kept exactly as in your original code */}
      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-4 rounded-md text-center">
            {error}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-sky-300 mb-2">No events found</h3>
            <p className="text-sky-400">
              {events.length === 0 
                ? "There are currently no volunteer events available." 
                : "No events match your search criteria. Try a different search term."}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sky-400">
                {searchTerm ? `Showing ${filteredEvents.length} of ${events.length} events` : `Showing all ${events.length} events`}
              </p>
            </div>
            
            {/* Events Grid - Kept exactly as in your original code */}
            <div className="flex flex-col items-center">
              <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-2 lg:gap-5 mx-10 sm:mx-10 mt-10">
                {filteredEvents.map((event) => (
                  <div key={event.id || event._id} className="flex">
                    <VolunteerCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-sky-900 py-6 border-t border-sky-800">
        <div className="container mx-auto px-4 text-center text-sky-400 text-sm">
          <p>© {new Date().getFullYear()} Volunteer Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default VolunteerPage