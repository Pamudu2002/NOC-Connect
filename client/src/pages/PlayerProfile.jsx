import { useState , useEffect } from "react";
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
  Star,
} from "lucide-react";
import { api } from "../api/api";

export default function PlayerProfile() {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
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

  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
    icon: "Award",
  });

  useEffect(() => {
    if (!isEditing) {
    api.post("/users/details", { userId: "680a275d45f32c33d9e6e7db" }).then((response) => {
      setProfile({
        name: response.data.name || "",
        title: response.data.title || "",
        location: response.data.location || "",
        bio: response.data.bio || "",
        sport: response.data.sport || "",
        dateOfBirth: response.data.dateOfBirth || "",
        nationality: response.data.nationality || "",
        birthPlace: response.data.birthPlace || "",
        birthCountry: response.data.birthCountry || "",
        gender: response.data.gender || "",
        height: response.data.height || "",
        weight: response.data.weight || "",
        education: response.data.education || [],
        achievements: response.data.achievements || [],
        socialMedia: {
          twitter: response.data.socialMedia?.twitter || "",
          twitch: response.data.socialMedia?.twitch || "",
          youtube: response.data.socialMedia?.youtube || "",
        },
        email: response.data.email || "",
        profilePicture: response.data.profilePicture || "",
      });
      
    }).catch((error) => {
      console.error("Error fetching user details:", error);
    });
  }
  }, []);

  // Event handlers
  const handleProfileChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      education: updatedEducation,
    });
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...profile.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      achievements: updatedAchievements,
    });
  };

  const handleNewAchievementChange = (field, value) => {
    setNewAchievement({
      ...newAchievement,
      [field]: value,
    });
  };

  const addNewAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setProfile({
        ...profile,
        achievements: [...profile.achievements, newAchievement],
      });
    }
  };

  // Helper functions
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy size={20} className="text-yellow-500" />;
      case "Star":
        return <Star size={20} className="text-yellow-500" />;
      case "Award":
        return <Award size={20} className="text-sky-400" />;
      default:
        return <Award size={20} className="text-sky-400" />;
    }
  };

  // UI Components
  const ProfileHeader = () => (
    <div className="bg-sky-800 rounded-xl shadow-lg overflow-auto mb-8 transition-all duration-300 hover:shadow-xl">
      {/* Banner with pattern overlay */}
      <div className="h-56 bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Pattern overlay made with CSS */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Edit Profile Button */}
        {true && <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md ${
              isEditing
                ? "bg-sky-700 text-sky-200 hover:bg-sky-600"
                : "bg-sky-600 text-white hover:bg-sky-500"
            }`}
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
        </div>}
      </div>

      {/* Profile Info */}
      <div className="relative px-8 pb-8">
        <div className="absolute -top-24 left-8 h-40 w-40 rounded-full border-4 border-sky-800 bg-gradient-to-r from-sky-800 to-sky-800 flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
          <img
            src={profile.profilePicture}
            alt=""
            className="rounded-full h-36 w-36 object-cover"
          />
        </div>

        <div className="ml-48 pt-6">
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="text-4xl font-bold w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 outline-none bg-sky-700 text-sky-100"
            />
          ) : (
            <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
              {profile.name}
            </h2>
          )}

          {isEditing ? (
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleProfileChange("title", e.target.value)}
              className="text-xl text-sky-300 w-full mb-3 px-3 py-2 border-2 border-sky-500 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none bg-sky-700"
            />
          ) : (
            <p className="text-xl text-sky-300 font-medium tracking-wide">
              {profile.title}
            </p>
          )}

          <div className="flex items-center text-base text-sky-400 mt-4">
            <MapPin size={18} className="mr-2 text-sky-400" />
            {isEditing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  handleProfileChange("location", e.target.value)
                }
                className="px-3 py-2 border-2 border-sky-500 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none w-full bg-sky-700 text-sky-300"
              />
            ) : (
              <span className="font-medium">{profile.location}</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center text-sky-200 bg-sky-700 px-4 py-2 rounded-lg shadow-sm hover:bg-sky-600 transition-all duration-300">
              <Mail size={18} className="mr-2 text-sky-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="px-3 py-1 border-2 border-sky-500 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none bg-sky-600 text-sky-200"
                />
              ) : (
                <span className="font-medium">{profile.email}</span>
              )}
            </div>
          </div>

          {/* Social Media */}
          {/* <div className="mt-6 flex space-x-4">
            <a
              href="#"
              className="p-3 bg-sky-700 rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-sm"
              aria-label="Twitter"
            >
              <Twitter size={22} className="text-blue-400" />
            </a>
            <a
              href="#"
              className="p-3 bg-sky-700 rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-sm"
              aria-label="Twitch"
            >
              <Twitch size={22} className="text-sky-400" />
            </a>
            <a
              href="#"
              className="p-3 bg-sky-700 rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-sm"
              aria-label="YouTube"
            >
              <Youtube size={22} className="text-red-400" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );

  const PlayerDetails = () => (
    <div className="bg-sky-800 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-600">
      <h3 className="text-2xl font-semibold text-sky-300 mb-6 flex items-center">
        <Gamepad size={22} className="mr-3 text-sky-400" />
        Player Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <Gamepad size={24} className="text-sky-400 mr-3" />
            <div>
              <p className="text-sm text-sky-300 font-medium">Sport</p>
              <p className="text-sky-200 font-semibold">{profile.sport}</p>
            </div>
          </div>
        </div>

        <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center">
            <Calendar size={24} className="text-sky-400 mr-3" />
            <div>
              <p className="text-sm text-sky-300 font-medium">Date of Birth</p>
              <p className="text-sky-200 font-semibold">
                {new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {profile.birthPlace && (
          <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center">
              <MapPin size={24} className="text-sky-400 mr-3" />
              <div>
                <p className="text-sm text-sky-300 font-medium">Birth Place</p>
                <p className="text-sky-200 font-semibold">
                  {profile.birthPlace}, {profile.birthCountry}
                </p>
              </div>
            </div>
          </div>
        )}

        {profile.nationality && (
          <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center">
              <Globe size={24} className="text-sky-400 mr-3" />
              <div>
                <p className="text-sm text-sky-300 font-medium">Nationality</p>
                <p className="text-sky-200 font-semibold">
                  {profile.nationality}
                </p>
              </div>
            </div>
          </div>
        )}

        {profile.height && profile.weight && (
          <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center">
              <User size={24} className="text-sky-400 mr-3" />
              <div>
                <p className="text-sm text-sky-300 font-medium">
                  Physical Info
                </p>
                <p className="text-sky-200 font-semibold">
                  {profile.height}cm • {profile.weight}kg
                </p>
              </div>
            </div>
          </div>
        )}

        {profile.gender && (
          <div className="bg-sky-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center">
              <User size={24} className="text-sky-400 mr-3" />
              <div>
                <p className="text-sm text-sky-300 font-medium">Gender</p>
                <p className="text-sky-200 font-semibold">{profile.gender}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const AboutSection = () => (
    <div className="bg-sky-800 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-600">
      <h3 className="text-2xl font-semibold text-sky-300 mb-4 flex items-center">
        <User size={22} className="mr-3 text-sky-400" />
        About
      </h3>
      {isEditing ? (
        <textarea
          value={profile.bio}
          onChange={(e) => handleProfileChange("bio", e.target.value)}
          className="w-full px-4 py-3 border-2 border-sky-500 rounded-lg h-36 bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
        />
      ) : (
        <p className="text-sky-300 leading-relaxed text-lg tracking-wide">
          {profile.bio}
        </p>
      )}
    </div>
  );

  const EducationSection = () => (
    <div className="bg-sky-800 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-600">
      <h3 className="text-2xl font-semibold text-sky-300 mb-6 flex items-center">
        <GraduationCap size={22} className="mr-3 text-sky-400" />
        Education
      </h3>
      {profile.education.map((edu, index) => (
        <div
          key={index}
          className="mb-6 border-b border-sky-700 pb-6 last:border-0 last:pb-0"
        >
          <div className="flex items-start">
            <div className="mt-1 mr-4 p-4 bg-sky-700 rounded-lg shadow-sm">
              <GraduationCap size={26} className="text-sky-400" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                    className="font-medium text-xl w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                    className="text-sky-300 w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-700 focus:ring-2 focus:ring-sky-400 outline-none"
                  />
                  <div className="flex items-center text-sm text-sky-400 mt-2 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) =>
                        handleEducationChange(index, "period", e.target.value)
                      }
                      className="px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={edu.focus || ""}
                    onChange={(e) =>
                      handleEducationChange(index, "focus", e.target.value)
                    }
                    className="text-sky-300 w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-700 focus:ring-2 focus:ring-sky-400 outline-none"
                    placeholder="Focus or specialization"
                  />
                </>
              ) : (
                <>
                  <h4 className="font-medium text-xl text-sky-200">
                    {edu.school}
                  </h4>
                  <p className="text-sky-300 text-lg">{edu.degree}</p>
                  <div className="flex items-center text-sky-400 mt-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{edu.period}</span>
                  </div>
                  {edu.focus && (
                    <p className="mt-3 text-sky-300 bg-sky-700 inline-block px-4 py-1 rounded-full text-sm font-medium">
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
  );

  const AchievementsSection = () => (
    <div className="bg-sky-800 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300 border-l-4 border-sky-600">
      <h3 className="text-2xl font-semibold text-sky-300 mb-6 flex items-center">
        <Trophy size={22} className="mr-3 text-sky-400" />
        Achievements
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {profile.achievements.map((achievement, index) => (
          <div
            key={index}
            className="border border-sky-700 rounded-lg p-5 hover:shadow-md transition-all duration-300 bg-sky-700"
          >
            <div className="flex items-start">
              <div className="mt-1 mr-4 p-4 bg-sky-800 rounded-lg shadow-sm">
                {getIconComponent(achievement.icon)}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) =>
                        handleAchievementChange(index, "title", e.target.value)
                      }
                      className="font-medium w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-600 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                    <input
                      type="text"
                      value={achievement.description}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="text-sky-300 w-full mb-2 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-600 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                    <div className="flex items-center text-sky-400 mt-2">
                      <Calendar size={16} className="mr-2" />
                      <input
                        type="text"
                        value={achievement.date}
                        onChange={(e) =>
                          handleAchievementChange(index, "date", e.target.value)
                        }
                        className="px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-600 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                      />
                    </div>
                    <select
                      value={achievement.icon || "Award"}
                      onChange={(e) =>
                        handleAchievementChange(index, "icon", e.target.value)
                      }
                      className="mt-3 px-3 py-2 border-2 border-sky-500 rounded-lg bg-sky-600 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                    >
                      <option value="Trophy">Trophy</option>
                      <option value="Star">Star</option>
                      <option value="Award">Award</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h4 className="font-medium text-xl text-sky-200">
                      {achievement.title}
                    </h4>
                    <p className="text-sky-300 text-lg mt-1">
                      {achievement.description}
                    </p>
                    <div className="flex items-center text-sky-400 mt-2">
                      <Calendar size={16} className="mr-2" />
                      <span>{achievement.date}</span>
                    </div>
                  </>
                )}
              </div>
              {achievement.image && (
                <div>
                  <img
                    src={achievement.image || "https://via.placeholder.com/150"}
                    alt={achievement.title}
                    className="rounded-lg shadow-sm w-40 object-cover"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add new achievement form (only visible in edit mode) */}
      {isEditing && (
        <div className="mt-8 pt-6 border-t border-sky-700">
          <h4 className="font-medium text-xl text-sky-300 mb-4">
            Add New Achievement
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-sky-400 mb-2 font-medium">
                Title
              </label>
              <input
                type="text"
                value={newAchievement.title}
                onChange={(e) =>
                  handleNewAchievementChange("title", e.target.value)
                }
                className="w-full px-4 py-3 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Achievement title"
              />
            </div>
            <div>
              <label className="block text-sm text-sky-400 mb-2 font-medium">
                Description
              </label>
              <input
                type="text"
                value={newAchievement.description}
                onChange={(e) =>
                  handleNewAchievementChange("description", e.target.value)
                }
                className="w-full px-4 py-3 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Achievement description"
              />
            </div>
            <div>
              <label className="block text-sm text-sky-400 mb-2 font-medium">
                Date
              </label>
              <input
                type="text"
                value={newAchievement.date}
                onChange={(e) =>
                  handleNewAchievementChange("date", e.target.value)
                }
                className="w-full px-4 py-3 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Achievement date"
              />
            </div>
            <div>
              <label className="block text-sm text-sky-400 mb-2 font-medium">
                Icon
              </label>
              <select
                value={newAchievement.icon}
                onChange={(e) =>
                  handleNewAchievementChange("icon", e.target.value)
                }
                className="w-full px-4 py-3 border-2 border-sky-500 rounded-lg bg-sky-700 text-sky-200 focus:ring-2 focus:ring-sky-400 outline-none"
              >
                <option value="Trophy">Trophy</option>
                <option value="Star">Star</option>
                <option value="Award">Award</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                onClick={addNewAchievement}
                className="bg-sky-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-sky-500 transition-colors duration-300 shadow-md w-full flex items-center justify-center mt-2"
              >
                <Plus size={18} className="mr-2" /> Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SaveButton = () =>
    isEditing && (
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsEditing(false)}
          className="bg-sky-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-sky-500 transition-colors duration-300 shadow-lg flex items-center text-lg"
        >
          <Save size={20} className="mr-3" /> Save Profile
        </button>
      </div>
    );

  // Main render
  return (
    <div className="bg-gradient-to-b from-sky-900 to-sky-800 min-h-screen p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader />
        <PlayerDetails />
        <AboutSection />
        <EducationSection />
        <AchievementsSection />
        <SaveButton />
      </div>
    </div>
  );
}
