import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, ArrowRight, User } from 'lucide-react';

function VolunteerCard({event}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Card Component - Fixed size regardless of content */}
      <div className="bg-sky-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-1 w-full h-full flex flex-col">
        {/* Card Image - Fixed 4:3 aspect ratio */}
        <div className="w-full pb-[75%] relative"> {/* 4:3 aspect ratio (75% of width) */}
          <img 
            src={event.image || "/api/placeholder/400/300"} 
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Card Content - Fixed height sections with proper overflow handling */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sky-100 font-bold text-xl mb-2 line-clamp-1">{event.name}</h3>
          
          <div className="flex-1 flex flex-col"> {/* This will take up available space */}
            {/* Date Information */}
            <div className="flex items-center text-sky-300 mb-2">
              <Calendar size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {formatDate(event.startDate)}
                {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
              </span>
            </div>
            
            {/* Time Information (if available in the event object) */}
            <div className="flex items-center text-sky-300 mb-2">
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {event.startTime || "All day"}
                {event.endTime && ` - ${event.endTime}`}
              </span>
            </div>
            
            {/* Venue Information */}
            <div className="flex items-center text-sky-300 mb-4">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{event.venue || "Location TBA"}</span>
            </div>
          </div>
          
          {/* Action Buttons - Fixed at bottom */}
          <div className="flex flex-row justify-between w-full gap-2 mt-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-1/2 bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <span>View</span>
            </button>
            <button 
              className="w-1/2 bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <span>Volunteer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-sky-950 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header with Image - 4:3 aspect ratio */}
            <div className="relative w-full pb-[75%]"> {/* 4:3 aspect ratio */}
              <img 
                src={event.image || "/api/placeholder/400/300"} 
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-sky-950 p-1 rounded-full hover:bg-sky-800"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-sky-100 font-bold text-2xl mb-4">{event.name}</h2>
              
              <div className="space-y-4 mb-6">
                {/* Date Information */}
                <div className="flex items-start">
                  <Calendar size={20} className="mr-3 text-sky-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sky-200 font-medium">Date</h4>
                    <p className="text-sky-300">
                      {formatDate(event.startDate)}
                      {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                    </p>
                  </div>
                </div>
                
                {/* Time Information */}
                <div className="flex items-start">
                  <Clock size={20} className="mr-3 text-sky-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sky-200 font-medium">Time</h4>
                    <p className="text-sky-300">
                      {event.startTime || "All day"}
                      {event.endTime && ` - ${event.endTime}`}
                    </p>
                  </div>
                </div>
                
                {/* Venue Information */}
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 text-sky-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sky-200 font-medium">Location</h4>
                    <p className="text-sky-300">{event.venue || "Location TBA"}</p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <h4 className="text-sky-200 font-medium text-lg mb-2">About This Event</h4>
                <p className="text-sky-300 whitespace-pre-line text-justify">{event.description || "No description available."}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Close
                </button>
                <button 
                  className="w-1/2 bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                >
                  <span>Volunteer Now</span>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VolunteerCard;