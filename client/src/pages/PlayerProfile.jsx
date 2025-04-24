import { useState, useEffect } from 'react';
import { Edit2, MapPin, Calendar, Award, Book, Save, User, Flag, Activity, X } from 'lucide-react';
import { api } from '../api/api';

export default function AthleteProfile() {
  // Initial state from the provided user data
  const [user, setUser] = useState(
    {
      "name": "",
      "title": "",
      "location": "",
      "bio": "",
      "sport": "",
      "dateOfBirth": "",
      "nationality": "",
      "birthPlace": "",
      "birthCountry": "",
      "gender": "",
      "height": "",
      "weight": "",
      "education": [],
      "achievements": [],
      "socialMedia": {
        "twitter": "",
        "twitch": "",
        "youtube": ""
      },
      "email": "",
      "profilePicture": ""
    }    
  );
  useEffect(() => {
    api.post("/users/details", { userId: "680a275d45f32c33d9e6e7db" })
    .then((response) => {
      console.log("API response:", response.data); // check this
      setUser(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
  }, []);

  const [editing, setEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value
    });
  };
  
  const handleEdit = () => {
    setEditing(true);
    setEditableUser(user);
  };
  
  const handleSave = () => {
    setUser(editableUser);
    setEditing(false);
  };
  
  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Header/Navigation */}
      <header className="bg-slate-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-400">Athlete Profile</h1>
          
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-sky-800 to-slate-700"></div>
          
          {/* Profile Info */}
          <div className="px-6 py-4 relative">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-6 border-4 border-slate-800 rounded-full overflow-hidden">
              <img src={user.profilePicture} alt={user.name} className="w-32 h-32 object-cover" />
            </div>
            
            {/* Edit Button */}
            {!editing ? (
              <button 
                onClick={handleEdit}
                className="absolute top-4 right-4 flex items-center bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
              >
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="absolute top-4 right-4 space-x-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
            
            {/* Profile Details */}
            <div className="mt-16">
              {!editing ? (
                <>
                  <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                  <p className="text-xl text-sky-400">{user.title}</p>
                  <div className="flex items-center mt-2 text-slate-400">
                    <MapPin size={16} className="mr-1" />
                    <span>{user.location}</span>
                  </div>
                  <p className="mt-4">{user.bio}</p>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editableUser.name}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editableUser.title}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editableUser.location}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={editableUser.bio}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">About</h3>
                {editing && (
                  <Edit2 size={16} className="text-sky-400" />
                )}
              </div>
              
              {!editing ? (
                <p>{user.bio}</p>
              ) : (
                <div className="mb-4">
                  <textarea
                    name="bio"
                    value={editableUser.bio}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-32"
                  />
                </div>
              )}
            </div>
            
            {/* Achievements */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Achievements</h3>
                {editing && (
                  <button className="text-sky-400 flex items-center">
                    <Award size={16} className="mr-1" /> Add Achievement
                  </button>
                )}
              </div>
              
              {user.achievements.map((achievement, index) => (
                <div key={index} className="flex mb-6 border-b border-slate-700 pb-4">
                  <div className="flex mr-4">
                    <img 
                      src={achievement.image || "/api/placeholder/80/80"} 
                      alt={achievement.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sky-400">{achievement.title}</h4>
                    <div className="flex items-center text-sm text-slate-400 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Education */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Education</h3>
                {editing && (
                  <button className="text-sky-400 flex items-center">
                    <Book size={16} className="mr-1" /> Add Education
                  </button>
                )}
              </div>
              
              {user.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold text-sky-400">{edu.school}</h4>
                  <p className="text-white">{edu.degree} • {edu.focus}</p>
                  <div className="text-sm text-slate-400">{edu.period}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Sport Info */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Sport Information</h3>
              
              {!editing ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Activity size={16} className="mr-2 text-sky-400" />
                    <span className="font-medium">Sport:</span>
                    <span className="ml-2">{user.sport}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-sky-400" />
                    <span className="font-medium">Gender:</span>
                    <span className="ml-2">{user.gender}</span>
                  </div>
                  <div className="flex items-center">
                    <Flag size={16} className="mr-2 text-sky-400" />
                    <span className="font-medium">Birth Country:</span>
                    <span className="ml-2">{user.birthCountry}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-sky-400" />
                    <span className="font-medium">Birth Place:</span>
                    <span className="ml-2">{user.birthPlace}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-sky-400" />
                    <span className="font-medium">Date of Birth:</span>
                    <span className="ml-2">{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Sport</label>
                    <input
                      type="text"
                      name="sport"
                      value={editableUser.sport}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      value={editableUser.gender}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Birth Country</label>
                    <input
                      type="text"
                      name="birthCountry"
                      value={editableUser.birthCountry}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Birth Place</label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={editableUser.birthPlace}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editableUser.dateOfBirth}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Physical Stats */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Physical Stats</h3>
              
              {!editing ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Height:</span>
                    <span>{user.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{user.weight} kg</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={editableUser.height}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={editableUser.weight}
                      onChange={handleChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              
              {!editing ? (
                <div>
                  <p className="text-sky-400">{user.email}</p>
                </div>
              ) : (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editableUser.email}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}