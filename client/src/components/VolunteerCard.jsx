import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, ArrowRight, User, Mail, Phone, Home, Award } from 'lucide-react';
import { api } from '../api/api'; 
import Swal from 'sweetalert2';

function VolunteerCard({event}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    address: '',
    experience: ''
  });

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return formData.fullName && 
           formData.birthDate && 
           formData.email && 
           formData.phoneNumber && 
           formData.address;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid()) {
    
      api.post('/volunteers/register', {
        ...formData,
        eventName: event.name
      })
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: `Thank you for volunteering, ${formData.fullName}! We will contact you soon with more details.`,
          icon: 'success',
          background: '#0c4a6e', // Sky-900 dark background matching your theme
          color: '#bae6fd', // Sky-200 text color for readability
          confirmButtonColor: '#0ea5e9', // Sky-500 for the button to match your other buttons
          iconColor: '#38bdf8' // Sky-400 for the success icon
        })
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: `${error.response?.data?.message || 'Failed to register. Please try again later.'}`,
          icon: 'error',
          background: '#0c4a6e',
          color: '#f8fafb',
          confirmButtonColor: '#0ea5e9'
        });
      })
    
      // Close the volunteer modal

      setIsVolunteerModalOpen(false);
      // Reset form data
      setFormData({
        fullName: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        address: '',
        experience: ''
      });
    }
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
              onClick={() => setIsVolunteerModalOpen(true)}
              className="w-1/2 bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <span>Volunteer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal Component */}
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsVolunteerModalOpen(true);
                  }}
                  className="w-1/2 bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                >
                  <span>Volunteer Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Form Modal */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-sky-950 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative bg-sky-800 p-4">
              <h2 className="text-sky-100 font-bold text-xl">Volunteer Registration</h2>
              <h3 className="text-sky-200 text-sm">{event.name}</h3>
              {/* Close Button */}
              <button 
                onClick={() => setIsVolunteerModalOpen(false)}
                className="absolute top-4 right-4 text-sky-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <User size={16} className="mr-2" />
                      Full Name <span className="text-red-400 ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                {/* Birthdate Field */}
                <div className="mb-4">
                  <label htmlFor="birthDate" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Birthdate <span className="text-red-400 ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      Email <span className="text-red-400 ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                {/* Phone Number Field */}
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      Phone Number <span className="text-red-400 ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                {/* Address Field */}
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <Home size={16} className="mr-2" />
                      Address <span className="text-red-400 ml-1">*</span>
                    </span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                {/* Experience Field (Not Required) */}
                <div className="mb-6">
                  <label htmlFor="experience" className="block text-sky-200 mb-1 font-medium">
                    <span className="flex items-center">
                      <Award size={16} className="mr-2" />
                      Relevant Experience
                    </span>
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Tell us about any relevant experience you have (optional)"
                    className="w-full bg-sky-900 border border-sky-700 rounded p-2 text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <button 
                    type="button"
                    onClick={() => setIsVolunteerModalOpen(false)}
                    className="w-1/2 bg-sky-700 hover:bg-sky-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!isFormValid()}
                    className={`w-1/2 py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center ${
                      isFormValid() 
                        ? 'bg-sky-500 hover:bg-sky-400 text-white' 
                        : 'bg-sky-800 text-sky-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VolunteerCard;