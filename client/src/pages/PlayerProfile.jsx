import { useState } from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Award, 
  Edit2, 
  Save, 
  X, 
  Mail, 
  Globe, 
  Plus,
  Trophy,
  Gamepad,
  Twitter,
  Twitch,
  Youtube,
  Heart,
  Users,
  Star
} from 'lucide-react';

export default function PlayerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Professional Gamer | Team Captain",
    location: "Seattle, WA",
    about: "Competitive gamer with 5+ years of professional experience. Specializing in strategic team play with exceptional communication skills.",
    stats: {
      followers: "21.4K",
      tournaments: 127,
      winRate: "68%",
      favGame: "Valorant"
    },
    experience: [
      { title: "Team Captain", company: "Seattle Surge", period: "2022 - Present", description: "Lead a team of 5 professional players in international tournaments with strategic planning and in-game decision making." },
      { title: "Professional Player", company: "Northwest Gaming", period: "2020 - 2022", description: "Competed in over 45 tournaments representing the organization across North America." }
    ],
    education: [
      { school: "University of Washington", degree: "B.S. Computer Science", period: "2018 - 2022", focus: "Game Development & AI" }
    ],
    achievements: [
      { title: "World Championship Finalist", description: "2023 Global Gaming Tournament", date: "Dec 2023", icon: "Trophy" },
      { title: "Regional MVP", description: "West Coast Gaming League", date: "Aug 2023", icon: "Star" },
      { title: "Most Improved Player", description: "Team Recognition Award", date: "Feb 2022", icon: "Award" }
    ],
    socialMedia: {
      twitter: "@alexjgaming",
      twitch: "alexjgaming",
      youtube: "AlexJohnsonGaming"
    },
    email: "alex.johnson@email.com",
    website: "alexjgaming.com",
    sponsors: ["RazerGear", "Monster Energy", "HyperX"]
  });

  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
    icon: "Award"
  });

  const handleProfileChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setProfile({
      ...profile,
      experience: updatedExperience
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setProfile({
      ...profile,
      education: updatedEducation
    });
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...profile.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value
    };
    setProfile({
      ...profile,
      achievements: updatedAchievements
    });
  };

  const handleNewAchievementChange = (field, value) => {
    setNewAchievement({
      ...newAchievement,
      [field]: value
    });
  };

  const addNewAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setProfile({
        ...profile,
        achievements: [...profile.achievements, newAchievement]
      });
      setNewAchievement({
        title: "",
        description: "",
        date: "",
        icon: "Award"
      });
    }
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "Trophy": return <Trophy size={20} className="text-yellow-500" />;
      case "Star": return <Star size={20} className="text-yellow-500" />;
      case "Award": return <Award size={20} className="text-sky-600" />;
      default: return <Award size={20} className="text-sky-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header / Controls */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-800 flex items-center">
            <Gamepad size={28} className="mr-2 text-sky-600" />
            Player Profile
          </h1>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${isEditing ? 'bg-sky-100 text-sky-800 hover:bg-sky-200' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
          >
            {isEditing ? (
              <>
                <X size={16} className="mr-2" /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={16} className="mr-2" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Main Profile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl">
          {/* Banner with pattern overlay instead of background image */}
          <div className="h-48 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {/* Pattern overlay made with CSS */}
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6 h-32 w-32 rounded-full border-4 border-white bg-sky-100 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <User size={64} className="text-sky-500" />
            </div>
            
            <div className="ml-40 pt-4">
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="text-3xl font-bold w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                />
              ) : (
                <h2 className="text-3xl font-bold text-sky-900">{profile.name}</h2>
              )}
              
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.title} 
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  className="text-lg text-gray-600 w-full mb-2 px-2 py-1 border border-sky-300 rounded"
                />
              ) : (
                <p className="text-lg text-gray-600">{profile.title}</p>
              )}
              
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin size={16} className="mr-1 text-sky-500" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.location} 
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="px-2 py-1 border border-sky-300 rounded w-full"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-sky-700">
                  <Mail size={16} className="mr-1" />
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="px-2 py-1 border border-sky-300 rounded"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center text-sky-700">
                  <Globe size={16} className="mr-1" />
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profile.website} 
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      className="px-2 py-1 border border-sky-300 rounded"
                    />
                  ) : (
                    <span>{profile.website}</span>
                  )}
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-sky-600 hover:text-sky-800 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                  <Twitch size={20} />
                </a>
                <a href="#" className="text-red-600 hover:text-red-800 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 flex items-center">
            <div className="p-3 rounded-full bg-sky-100 mr-4">
              <Users size={20} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-xl font-bold text-sky-800">{profile.stats.followers}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 flex items-center">
            <div className="p-3 rounded-full bg-sky-100 mr-4">
              <Trophy size={20} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tournaments</p>
              <p className="text-xl font-bold text-sky-800">{profile.stats.tournaments}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 flex items-center">
            <div className="p-3 rounded-full bg-sky-100 mr-4">
              <Star size={20} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Win Rate</p>
              <p className="text-xl font-bold text-sky-800">{profile.stats.winRate}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300 flex items-center">
            <div className="p-3 rounded-full bg-sky-100 mr-4">
              <Gamepad size={20} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Favorite Game</p>
              <p className="text-xl font-bold text-sky-800">{profile.stats.favGame}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-800 mb-4 flex items-center">
            <User size={20} className="mr-2 text-sky-600" />
            About
          </h3>
          {isEditing ? (
            <textarea 
              value={profile.about} 
              onChange={(e) => handleProfileChange('about', e.target.value)}
              className="w-full px-3 py-2 border border-sky-300 rounded h-32"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.about}</p>
          )}
        </div>
        
        {/* Sponsors */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-sky-800 mb-4 flex items-center">
            <Heart size={20} className="mr-2 text-sky-600" />
            Sponsors
          </h3>
          <div className="flex flex-wrap gap-3">
            {profile.sponsors.map((sponsor, index) => (
              <span key={index} className="px-4 py-2 bg-sky-50 text-sky-700 rounded-full border border-sky-200">
                {sponsor}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-800 mb-4 flex items-center">
            <Briefcase size={20} className="mr-2 text-sky-600" />
            Experience
          </h3>
          {profile.experience.map((exp, index) => (
            <div key={index} className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className="mt-1 mr-4 p-3 bg-sky-100 rounded-lg shadow-sm">
                  <Briefcase size={24} className="text-sky-600" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input 
                        type="text" 
                        value={exp.title} 
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                        className="font-medium text-lg w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                      />
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="text-sky-600 w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                      />
                      <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <input 
                          type="text" 
                          value={exp.period} 
                          onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                          className="px-2 py-1 border border-sky-300 rounded"
                        />
                      </div>
                      <textarea
                        value={exp.description} 
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-sky-300 rounded h-20"
                        placeholder="Job description"
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium text-lg">{exp.title}</h4>
                      <p className="text-sky-600 font-medium">{exp.company}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-gray-600">{exp.description}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-800 mb-4 flex items-center">
            <GraduationCap size={20} className="mr-2 text-sky-600" />
            Education
          </h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className="mt-1 mr-4 p-3 bg-sky-100 rounded-lg shadow-sm">
                  <GraduationCap size={24} className="text-sky-600" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input 
                        type="text" 
                        value={edu.school} 
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="font-medium text-lg w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                      />
                      <input 
                        type="text" 
                        value={edu.degree} 
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="text-gray-600 w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                      />
                      <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <input 
                          type="text" 
                          value={edu.period} 
                          onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                          className="px-2 py-1 border border-sky-300 rounded"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={edu.focus || ""} 
                        onChange={(e) => handleEducationChange(index, 'focus', e.target.value)}
                        className="text-gray-600 w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                        placeholder="Focus or specialization"
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium text-lg">{edu.school}</h4>
                      <p className="text-gray-600">{edu.degree}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{edu.period}</span>
                      </div>
                      {edu.focus && (
                        <p className="mt-2 text-sky-700 bg-sky-50 inline-block px-3 py-1 rounded-full text-sm">
                          Focus: {edu.focus}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-800 mb-4 flex items-center">
            <Trophy size={20} className="mr-2 text-sky-600" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300 bg-sky-50">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-3 bg-white rounded-lg shadow-sm">
                    {getIconComponent(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <input 
                          type="text" 
                          value={achievement.title} 
                          onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                          className="font-medium w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                        />
                        <input 
                          type="text" 
                          value={achievement.description} 
                          onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                          className="text-gray-600 w-full mb-1 px-2 py-1 border border-sky-300 rounded"
                        />
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <input 
                            type="text" 
                            value={achievement.date} 
                            onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                            className="px-2 py-1 border border-sky-300 rounded"
                          />
                        </div>
                        <select
                          value={achievement.icon || "Award"}
                          onChange={(e) => handleAchievementChange(index, 'icon', e.target.value)}
                          className="mt-2 px-2 py-1 border border-sky-300 rounded bg-white"
                        >
                          <option value="Trophy">Trophy</option>
                          <option value="Star">Star</option>
                          <option value="Award">Award</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-gray-600">{achievement.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <span>{achievement.date}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add new achievement form (only visible in edit mode) */}
          {isEditing && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-sky-700 mb-3">Add New Achievement</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={newAchievement.title} 
                    onChange={(e) => handleNewAchievementChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-sky-300 rounded"
                    placeholder="Achievement title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Description</label>
                  <input 
                    type="text" 
                    value={newAchievement.description} 
                    onChange={(e) => handleNewAchievementChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-sky-300 rounded"
                    placeholder="Achievement description"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date</label>
                  <input 
                    type="text" 
                    value={newAchievement.date} 
                    onChange={(e) => handleNewAchievementChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-sky-300 rounded"
                    placeholder="Achievement date"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Icon</label>
                  <select
                    value={newAchievement.icon}
                    onChange={(e) => handleNewAchievementChange('icon', e.target.value)}
                    className="w-full px-3 py-2 border border-sky-300 rounded bg-white"
                  >
                    <option value="Trophy">Trophy</option>
                    <option value="Star">Star</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button 
                    onClick={addNewAchievement}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-300 shadow w-full flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" /> Add Achievement
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Save button (only visible in edit mode) */}
        {isEditing && (
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 transition-colors duration-300 shadow-lg flex items-center"
            >
              <Save size={18} className="mr-2" /> Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}