import { useState, useEffect } from 'react';
import { 
  Edit2, MapPin, Calendar, Award, Book, Save, User, 
  Flag, Activity, X, Globe, Mail, ExternalLink, Camera
} from 'lucide-react';
import { api } from '../api/api';
import { useParams } from 'react-router-dom';

function PlayerProfileView() {
  const { userId } = useParams();
  const [user, setUser] = useState({
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
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  
  useEffect(() => {
    setIsLoading(true);
    api.post("/users/details", { userId: userId })
      .then((response) => {
        setUser(response.data);
        setEditableUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Failed to load user profile");
        setIsLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields for social media
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditableUser({
        ...editableUser,
        [parent]: {
          ...editableUser[parent],
          [child]: value
        }
      });
    } else {
      setEditableUser({
        ...editableUser,
        [name]: value
      });
    }
  };
  
  const handleEdit = () => {
    setEditing(true);
    setEditableUser(user);
  };
  
  const handleSave = () => {
    // In a real app, you would make an API call here to save the data
    api.post("/users/update", { user: editableUser })
      .then(() => {
        setUser(editableUser);
        setEditing(false);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };
  
  const handleCancel = () => {
    setEditing(false);
    setEditableUser(user);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-950 flex items-center justify-center">
        <div className="animate-pulse text-sky-400 text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sky-950 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-950 text-sky-100">
      {/* Header/Navigation */}
      <header className="bg-gradient-to-r from-sky-900 to-sky-950 py-4 shadow-lg border-b border-sky-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-300">Athlete Profile</h1>
         
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-sky-900 to-sky-950 rounded-xl shadow-2xl overflow-hidden mb-8 border border-sky-800">
          {/* Cover Photo */}
          <div className="h-64 bg-gradient-to-r from-sky-800 via-blue-900 to-sky-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950 to-transparent opacity-70"></div>
          </div>
          
          {/* Profile Info */}
          <div className="px-8 py-6 relative">
            {/* Profile Picture */}
            <div className="absolute -top-20 left-8">
              <div className="rounded-full border-4 border-sky-950 overflow-hidden shadow-xl">
                <img 
                  src={user.profilePicture || "/api/placeholder/144/144"} 
                  alt={user.name} 
                  className="w-36 h-36 object-cover bg-sky-800"
                />
                {editing && (
                  <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-sky-100 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Camera size={24} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="mt-20">
              {!editing ? (
                <>
                  <div className="flex items-baseline">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1">{user.name}</h2>
                    {user.nationality && (
                      <span className="ml-4 text-sky-400 flex items-center">
                        <Globe size={14} className="mr-1" />
                        {user.nationality}
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-sky-300 font-medium">{user.title}</p>
                  {user.location && (
                    <div className="flex items-center mt-2 text-sky-400">
                      <MapPin size={16} className="mr-1" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editableUser.name}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">Title/Position</label>
                      <input
                        type="text"
                        name="title"
                        value={editableUser.title}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editableUser.location}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">Nationality</label>
                      <input
                        type="text"
                        name="nationality"
                        value={editableUser.nationality}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sky-200">About</h3>
                {editing && (
                  <div className="text-sky-400">
                    <Edit2 size={16} />
                  </div>
                )}
              </div>
              
              {!editing ? (
                <p className="text-sky-100 leading-relaxed">{user.bio || "No bio information available."}</p>
              ) : (
                <div>
                  <textarea
                    name="bio"
                    value={editableUser.bio}
                    onChange={handleChange}
                    placeholder="Share your story, background, and aspirations..."
                    className="w-full bg-sky-900 border border-sky-700 rounded-md p-3 text-white h-32 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                  />
                </div>
              )}
            </div>
            
            {/* Achievements */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sky-200">Achievements</h3>
                {editing && (
                  <button className="text-sky-300 flex items-center bg-sky-800 px-3 py-1 rounded-md hover:bg-sky-700 transition-colors duration-300">
                    <Award size={16} className="mr-1" /> Add Achievement
                  </button>
                )}
              </div>
              
              {user.achievements && user.achievements.length > 0 ? (
                user.achievements.map((achievement, index) => (
                  <div key={index} className="flex mb-6 border-b border-sky-800/50 pb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-sky-800/50 rounded-lg p-1 backdrop-blur-sm">
                        <img 
                          src={achievement.image || "/api/placeholder/80/80"} 
                          alt={achievement.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sky-300 text-lg">{achievement.title}</h4>
                      <div className="flex items-center text-sm text-sky-400 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(achievement.date)}</span>
                      </div>
                      <p className="text-sky-200">{achievement.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sky-500">
                  No achievements added yet
                </div>
              )}
            </div>
            
            {/* Education */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sky-200">Education</h3>
                {editing && (
                  <button className="text-sky-300 flex items-center bg-sky-800 px-3 py-1 rounded-md hover:bg-sky-700 transition-colors duration-300">
                    <Book size={16} className="mr-1" /> Add Education
                  </button>
                )}
              </div>
              
              {user.education && user.education.length > 0 ? (
                user.education.map((edu, index) => (
                  <div key={index} className="mb-6 border-l-2 border-sky-700 pl-4 pb-2">
                    <h4 className="font-bold text-sky-300 text-lg">{edu.school}</h4>
                    <p className="text-white">{edu.degree} {edu.focus && `• ${edu.focus}`}</p>
                    <div className="text-sm text-sky-400 mt-1">{edu.period}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sky-500">
                  No education history added yet
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Sport Info */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">Sport Information</h3>
              
              {!editing ? (
                <div className="space-y-4">
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <Activity size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">Sport:</span>
                    <span className="text-white">{user.sport || "Not specified"}</span>
                  </div>
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <User size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">Gender:</span>
                    <span className="text-white">{user.gender || "Not specified"}</span>
                  </div>
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <Flag size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">Birth Country:</span>
                    <span className="text-white">{user.birthCountry || "Not specified"}</span>
                  </div>
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <MapPin size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">Birth Place:</span>
                    <span className="text-white">{user.birthPlace || "Not specified"}</span>
                  </div>
                  <div className="flex items-center p-2">
                    <Calendar size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">Date of Birth:</span>
                    <span className="text-white">{user.dateOfBirth ? formatDate(user.dateOfBirth) : "Not specified"}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Sport</label>
                    <input
                      type="text"
                      name="sport"
                      value={editableUser.sport}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Gender</label>
                    <select
                      name="gender"
                      value={editableUser.gender}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Birth Country</label>
                    <input
                      type="text"
                      name="birthCountry"
                      value={editableUser.birthCountry}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Birth Place</label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={editableUser.birthPlace}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editableUser.dateOfBirth ? new Date(editableUser.dateOfBirth).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Physical Stats */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">Physical Stats</h3>
              
              {!editing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-800/30 rounded-lg p-4 text-center">
                    <div className="text-sky-400 text-sm mb-1">HEIGHT</div>
                    <div className="text-2xl font-bold text-white">{user.height || "--"}</div>
                    <div className="text-sky-400 text-xs">centimeters</div>
                  </div>
                  <div className="bg-sky-800/30 rounded-lg p-4 text-center">
                    <div className="text-sky-400 text-sm mb-1">WEIGHT</div>
                    <div className="text-2xl font-bold text-white">{user.weight || "--"}</div>
                    <div className="text-sky-400 text-xs">kilograms</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={editableUser.height}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={editableUser.weight}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact & Social */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">Contact Information</h3>
              
              {!editing ? (
                <div className="space-y-4">
                  {user.email && (
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-sky-400" />
                      <a href={`mailto:${user.email}`} className="text-sky-300 hover:text-sky-100 transition-colors duration-300">
                        {user.email}
                      </a>
                    </div>
                  )}
                  
                  {/* Social Media Links */}
                  {user.socialMedia && Object.entries(user.socialMedia).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <div key={platform} className="flex items-center">
                        <ExternalLink size={18} className="mr-3 text-sky-400" />
                        <a 
                          href={url.startsWith('http') ? url : `https://${url}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sky-300 hover:text-sky-100 transition-colors duration-300 flex items-center"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editableUser.email}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Social Media Inputs */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Twitter</label>
                    <input
                      type="text"
                      name="socialMedia.twitter"
                      value={editableUser.socialMedia?.twitter || ""}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">Twitch</label>
                    <input
                      type="text"
                      name="socialMedia.twitch"
                      value={editableUser.socialMedia?.twitch || ""}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">YouTube</label>
                    <input
                      type="text"
                      name="socialMedia.youtube"
                      value={editableUser.socialMedia?.youtube || ""}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 py-6 bg-sky-950 border-t border-sky-900">
        <div className="container mx-auto px-4 text-center text-sky-500 text-sm">
          Elite Athlete Profile © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default PlayerProfileView;