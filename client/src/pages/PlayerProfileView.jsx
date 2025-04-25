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

  const phoneNumber = "+94718823065"; // Replace with actual phone number

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
                <div className="space-y-4 flex flex-col ">
                  {user.email && (
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-sky-400" />
                      <a href={`mailto:${user.email}`} className="text-sky-300 hover:text-sky-100 transition-colors duration-300">
                        {user.email}
                      </a> 
                    </div>
                  )}
                  <a aria-label="Chat on WhatsApp" href={`https://wa.me/${user.phoneNumber}`}> 
        <svg width="160" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="36" rx="8" fill="#25D366"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.7885 8.7894c2.4186.0117 4.7528.9614 6.4988 2.6351 1.7881 1.7142 2.8185 4.0127 2.9086 6.488.088 2.4173-.7559 4.7918-2.3566 6.6052-1.7555 1.9889-4.1975 3.1312-6.835 3.2069a9.4172 9.4172 0 0 1-.2709.0039c-1.4211 0-2.8291-.3205-4.1043-.9341l-4.9568 1.1024a.0728.0728 0 0 1-.086-.0811l.8373-5.012c-.7146-1.3057-1.1135-2.7768-1.1565-4.2731-.0724-2.5285.844-4.9337 2.5805-6.7728 1.8005-1.9069 4.2593-2.9684 6.894-2.9684h.0469Zm-.0527 1.6431c-.0757 0-.1513.0011-.2274.0033-4.3138.1237-7.7226 3.7339-7.5988 8.0476.0378 1.3172.4088 2.6102 1.0731 3.7391l.1442.2447-.6204 3.401 3.3656-.7945.2541.1323c1.109.577 2.3515.8794 3.607.8794.0746 0 .1493-.001.2239-.0032 4.3138-.1237 7.7226-3.7338 7.5989-8.0476-.1216-4.2376-3.6078-7.6021-7.8202-7.6021Zm-3.2738 3.2521c.1583.0048.3169.0093.4551.0195.1692.0121.3563.0258.5222.4273.1968.4768.6224 1.6671.6782 1.7878.0557.1207.0911.2608.007.4172-.0841.1562-.1268.2541-.2496.3892-.123.1353-.2593.3023-.3692.4055-.1229.115-.2506.24-.1192.4821.1313.2423.5842 1.0354 1.2712 1.6875.883.838 1.5911 1.1145 1.8724 1.2457.1014.0474.1858.0698.2595.0698.1011 0 .1821-.0423.2593-.1206.148-.15.5933-.6697.7808-.9087.0981-.1251.1869-.1694.2834-.1694.0772 0 .1593.0284.255.0666.2154.086 1.3659.6972 1.5999.8235.234.1261.3905.1905.4469.2914.0564.1013.0416.5772-.1734 1.1264-.2151.5492-1.2016 1.055-1.6385 1.0812-.1279.0077-.2537.0256-.4176.0256-.3958 0-1.0132-.1043-2.4155-.7082-2.3858-1.0274-3.8347-3.552-3.9487-3.7142-.1137-.1625-.9306-1.3193-.8946-2.4894.0359-1.17.6675-1.7265.8927-1.9578.2158-.2218.4631-.2784.6228-.2784l.0199.0004Z" fill="#fff"/><path d="M46.9736 17.312h1.824c-.056-.496-.192-.936-.408-1.32-.216-.384-.492-.704-.828-.96-.328-.264-.704-.464-1.128-.6-.416-.136-.86-.204-1.332-.204-.656 0-1.248.116-1.776.348-.52.232-.96.552-1.32.96-.36.408-.636.888-.828 1.44-.192.544-.288 1.136-.288 1.776 0 .624.096 1.208.288 1.752.192.536.468 1.004.828 1.404.36.4.8.716 1.32.948.528.224 1.12.336 1.776.336.528 0 1.012-.08 1.452-.24.44-.16.824-.392 1.152-.696.328-.304.592-.672.792-1.104.2-.432.324-.916.372-1.452h-1.824c-.072.576-.272 1.04-.6 1.392-.32.352-.768.528-1.344.528-.424 0-.784-.08-1.08-.24-.296-.168-.536-.388-.72-.66-.184-.272-.32-.576-.408-.912-.08-.344-.12-.696-.12-1.056 0-.376.04-.74.12-1.092.088-.352.224-.664.408-.936.184-.28.424-.5.72-.66.296-.168.656-.252 1.08-.252.232 0 .452.04.66.12.216.072.408.176.576.312.168.136.308.296.42.48.112.176.184.372.216.588Zm3.0025-2.88V23h1.704v-3.252c0-.632.104-1.084.312-1.356.208-.28.544-.42 1.008-.42.408 0 .692.128.852.384.16.248.24.628.24 1.14V23h1.704v-3.816c0-.384-.036-.732-.108-1.044-.064-.32-.18-.588-.348-.804-.168-.224-.4-.396-.696-.516-.288-.128-.66-.192-1.116-.192-.32 0-.648.084-.984.252-.336.16-.612.42-.828.78h-.036v-3.228h-1.704Zm7.0413 4.272c.024-.4.124-.732.3-.996s.4-.476.672-.636c.272-.16.576-.272.912-.336.344-.072.688-.108 1.032-.108.312 0 .628.024.948.072.32.04.612.124.876.252s.48.308.648.54c.168.224.252.524.252.9v3.228c0 .28.016.548.048.804s.088.448.168.576h-1.728c-.032-.096-.06-.192-.084-.288a4.1387 4.1387 0 0 1-.036-.312c-.272.28-.592.476-.96.588-.368.112-.744.168-1.128.168-.296 0-.572-.036-.828-.108-.256-.072-.48-.184-.672-.336-.192-.152-.344-.344-.456-.576-.104-.232-.156-.508-.156-.828 0-.352.06-.64.18-.864.128-.232.288-.416.48-.552.2-.136.424-.236.672-.3.256-.072.512-.128.768-.168.256-.04.508-.072.756-.096.248-.024.468-.06.66-.108s.344-.116.456-.204c.112-.096.164-.232.156-.408 0-.184-.032-.328-.096-.432-.056-.112-.136-.196-.24-.252-.096-.064-.212-.104-.348-.12-.128-.024-.268-.036-.42-.036-.336 0-.6.072-.792.216-.192.144-.304.384-.336.72h-1.704Zm3.936 1.26c-.072.064-.164.116-.276.156-.104.032-.22.06-.348.084-.12.024-.248.044-.384.06s-.272.036-.408.06c-.128.024-.256.056-.384.096-.12.04-.228.096-.324.168-.088.064-.16.148-.216.252-.056.104-.084.236-.084.396 0 .152.028.28.084.384a.692.692 0 0 0 .228.252c.096.056.208.096.336.12.128.024.26.036.396.036.336 0 .596-.056.78-.168.184-.112.32-.244.408-.396.088-.16.14-.32.156-.48.024-.16.036-.288.036-.384v-.636Zm5.1866-3.168v-1.86h-1.704v1.86h-1.032v1.14h1.032v3.66c0 .312.052.564.156.756.104.192.244.34.42.444.184.104.392.172.624.204.24.04.492.06.756.06.168 0 .34-.004.516-.012s.336-.024.48-.048v-1.32c-.08.016-.164.028-.252.036-.088.008-.18.012-.276.012-.288 0-.48-.048-.576-.144-.096-.096-.144-.288-.144-.576v-3.072h1.248v-1.14H66.14Zm6.9106 3.108c0-.248.024-.492.072-.732.048-.24.128-.452.24-.636.12-.184.276-.332.468-.444.192-.12.432-.18.72-.18s.528.06.72.18c.2.112.356.26.468.444.12.184.204.396.252.636.048.24.072.484.072.732s-.024.492-.072.732c-.048.232-.132.444-.252.636-.112.184-.268.332-.468.444-.192.112-.432.168-.72.168s-.528-.056-.72-.168c-.192-.112-.348-.26-.468-.444-.112-.192-.192-.404-.24-.636-.048-.24-.072-.484-.072-.732Zm-1.704 0c0 .496.076.944.228 1.344.152.4.368.744.648 1.032.28.28.616.496 1.008.648.392.152.832.228 1.32.228.488 0 .928-.076 1.32-.228.4-.152.74-.368 1.02-.648.28-.288.496-.632.648-1.032.152-.4.228-.848.228-1.344 0-.496-.076-.944-.228-1.344-.152-.408-.368-.752-.648-1.032-.28-.288-.62-.508-1.02-.66-.392-.16-.832-.24-1.32-.24-.488 0-.928.08-1.32.24-.392.152-.728.372-1.008.66-.28.28-.496.624-.648 1.032-.152.4-.228.848-.228 1.344Zm7.528-3.108V23h1.704v-3.252c0-.632.104-1.084.312-1.356.208-.28.544-.42 1.008-.42.408 0 .692.128.852.384.16.248.24.628.24 1.14V23h1.704v-3.816c0-.384-.036-.732-.108-1.044-.064-.32-.18-.588-.348-.804-.168-.224-.4-.396-.696-.516-.288-.128-.66-.192-1.116-.192-.36 0-.712.084-1.056.252-.344.16-.624.42-.84.78h-.036v-.864h-1.62ZM97.6677 23l2.304-8.568h-1.848l-1.404 5.904h-.024l-1.464-5.904h-1.764l-1.488 5.832h-.024l-1.356-5.832h-1.884L90.9837 23h1.908l1.428-5.832h.024L95.7957 23h1.872Zm2.9923-8.568V23h1.704v-3.252c0-.632.104-1.084.312-1.356.208-.28.544-.42 1.008-.42.408 0 .692.128.852.384.16.248.24.628.24 1.14V23h1.704v-3.816c0-.384-.036-.732-.108-1.044-.064-.32-.18-.588-.348-.804-.168-.224-.4-.396-.696-.516-.288-.128-.66-.192-1.116-.192-.32 0-.648.084-.984.252-.336.16-.612.42-.828.78h-.036v-3.228h-1.704Zm7.041 4.272c.024-.4.124-.732.3-.996s.4-.476.672-.636c.272-.16.576-.272.912-.336.344-.072.688-.108 1.032-.108.312 0 .628.024.948.072.32.04.612.124.876.252s.48.308.648.54c.168.224.252.524.252.9v3.228c0 .28.016.548.048.804s.088.448.168.576h-1.728c-.032-.096-.06-.192-.084-.288a4.1387 4.1387 0 0 1-.036-.312c-.272.28-.592.476-.96.588-.368.112-.744.168-1.128.168-.296 0-.572-.036-.828-.108-.256-.072-.48-.184-.672-.336-.192-.152-.344-.344-.456-.576-.104-.232-.156-.508-.156-.828 0-.352.06-.64.18-.864.128-.232.288-.416.48-.552.2-.136.424-.236.672-.3.256-.072.512-.128.768-.168.256-.04.508-.072.756-.096.248-.024.468-.06.66-.108s.344-.116.456-.204c.112-.096.164-.232.156-.408 0-.184-.032-.328-.096-.432-.056-.112-.136-.196-.24-.252-.096-.064-.212-.104-.348-.12-.128-.024-.268-.036-.42-.036-.336 0-.6.072-.792.216-.192.144-.304.384-.336.72h-1.704Zm3.936 1.26c-.072.064-.164.116-.276.156-.104.032-.22.06-.348.084-.12.024-.248.044-.384.06s-.272.036-.408.06c-.128.024-.256.056-.384.096-.12.04-.228.096-.324.168-.088.064-.16.148-.216.252-.056.104-.084.236-.084.396 0 .152.028.28.084.384a.692.692 0 0 0 .228.252c.096.056.208.096.336.12.128.024.26.036.396.036.336 0 .596-.056.78-.168.184-.112.32-.244.408-.396.088-.16.14-.32.156-.48.024-.16.036-.288.036-.384v-.636Zm5.187-3.168v-1.86h-1.704v1.86h-1.032v1.14h1.032v3.66c0 .312.052.564.156.756.104.192.244.34.42.444.184.104.392.172.624.204.24.04.492.06.756.06.168 0 .34-.004.516-.012s.336-.024.48-.048v-1.32c-.08.016-.164.028-.252.036-.088.008-.18.012-.276.012-.288 0-.48-.048-.576-.144-.096-.096-.144-.288-.144-.576v-3.072h1.248v-1.14h-1.248Zm3.378 4.188h-1.62c.016.416.108.764.276 1.044.176.272.396.492.66.66.272.168.58.288.924.36.344.072.696.108 1.056.108.352 0 .696-.036 1.032-.108.344-.064.648-.18.912-.348.264-.168.476-.388.636-.66.168-.28.252-.624.252-1.032 0-.288-.056-.528-.168-.72-.112-.2-.26-.364-.444-.492-.184-.136-.396-.244-.636-.324-.232-.08-.472-.148-.72-.204-.24-.056-.476-.108-.708-.156-.232-.048-.44-.1-.624-.156-.176-.064-.32-.144-.432-.24-.112-.096-.168-.22-.168-.372 0-.128.032-.228.096-.3.064-.08.14-.14.228-.18.096-.04.2-.064.312-.072.112-.016.216-.024.312-.024.304 0 .568.06.792.18.224.112.348.332.372.66h1.62c-.032-.384-.132-.7-.3-.948-.16-.256-.364-.46-.612-.612-.248-.152-.532-.26-.852-.324-.312-.064-.636-.096-.972-.096-.336 0-.664.032-.984.096-.32.056-.608.16-.864.312-.256.144-.464.344-.624.6-.152.256-.228.584-.228.984 0 .272.056.504.168.696.112.184.26.34.444.468.184.12.392.22.624.3.24.072.484.136.732.192.608.128 1.08.256 1.416.384.344.128.516.32.516.576 0 .152-.036.28-.108.384-.072.096-.164.176-.276.24-.104.056-.224.1-.36.132-.128.024-.252.036-.372.036-.168 0-.332-.02-.492-.06-.152-.04-.288-.1-.408-.18-.12-.088-.22-.196-.3-.324-.072-.136-.108-.296-.108-.48Zm7.466-1.296 1.116-3.144h.024l1.08 3.144h-2.22Zm.18-5.256L124.608 23h1.896l.672-1.908h3.204l.648 1.908h1.956l-3.204-8.568h-1.932Zm8.827 7.452c-.272 0-.504-.056-.696-.168-.192-.112-.348-.256-.468-.432-.112-.184-.196-.396-.252-.636-.048-.24-.072-.484-.072-.732 0-.256.024-.504.072-.744.048-.24.128-.452.24-.636.12-.184.272-.332.456-.444.192-.12.428-.18.708-.18.272 0 .5.06.684.18.192.112.348.264.468.456.12.184.204.396.252.636.056.24.084.484.084.732s-.024.492-.072.732c-.048.24-.132.452-.252.636-.112.176-.264.32-.456.432-.184.112-.416.168-.696.168Zm-3.132-5.088v8.376h1.704v-2.94h.024c.208.304.472.536.792.696.328.152.684.228 1.068.228.456 0 .852-.088 1.188-.264.344-.176.628-.412.852-.708.232-.296.404-.636.516-1.02.112-.384.168-.784.168-1.2 0-.44-.056-.86-.168-1.26-.112-.408-.284-.764-.516-1.068-.232-.304-.524-.548-.876-.732-.352-.184-.772-.276-1.26-.276-.384 0-.736.076-1.056.228-.32.152-.584.396-.792.732h-.024v-.792h-1.62Zm10.467 5.088c-.272 0-.504-.056-.696-.168-.192-.112-.348-.256-.468-.432-.112-.184-.196-.396-.252-.636-.048-.24-.072-.484-.072-.732 0-.256.024-.504.072-.744.048-.24.128-.452.24-.636.12-.184.272-.332.456-.444.192-.12.428-.18.708-.18.272 0 .5.06.684.18.192.112.348.264.468.456.12.184.204.396.252.636.056.24.084.484.084.732s-.024.492-.072.732c-.048.24-.132.452-.252.636-.112.176-.264.32-.456.432-.184.112-.416.168-.696.168Zm-3.132-5.088v8.376h1.704v-2.94h.024c.208.304.472.536.792.696.328.152.684.228 1.068.228.456 0 .852-.088 1.188-.264.344-.176.628-.412.852-.708.232-.296.404-.636.516-1.02.112-.384.168-.784.168-1.2 0-.44-.056-.86-.168-1.26-.112-.408-.284-.764-.516-1.068-.232-.304-.524-.548-.876-.732-.352-.184-.772-.276-1.26-.276-.384 0-.736.076-1.056.228-.32.152-.584.396-.792.732h-.024v-.792h-1.62Z" fill="#fff"/></svg>
      </a>
                  
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