import { useState, useEffect } from "react";
import {
  Edit2,
  MapPin,
  Building,
  DollarSign,
  Tag,
  Save,
  Globe,
  Mail,
  ExternalLink,
  Camera,
  Plus,
  X,
    Phone,
  Briefcase,
  Users,
  Target
} from "lucide-react";
import { api } from "../api/api";
import ChatButton from '../components/Chat-bot';

export default function SponsorProfile() {
  // Initial state for sponsor data
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    location: "",
    companyName: "",
    sponsorshipBudget: 0,
    interests: [],
    bio: "",
    industry: "",
    foundedYear: "",
    companySize: "",
    website: "",
    socialMedia: {
      twitter: "",
      linkedin: "",
      instagram: ""
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    setIsLoading(true);
    // Mock API call to load sponsor data
    // In a real app, you would fetch from your API endpoint
    api
      .get("/users/logged", { withCredentials: true })
      .then((response) => {
        api
          .post("/users/details", { userId: response.data._id })
          .then((response) => {
            setUser(response.data);
            setEditableUser(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
            setError("Failed to load sponsor profile");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        // Simulate data for development
        const mockData = {
          name: "Global Sports Inc.",
          email: "contact@globalsports.com",
          phoneNumber: "+1 (555) 123-4567",
          profilePicture: "",
          location: "New York, NY",
          companyName: "Global Sports Inc.",
          sponsorshipBudget: 250000,
          interests: ["Football", "Basketball", "Swimming", "Athletics"],
          bio: "Global Sports Inc. is a leading sports equipment manufacturer dedicated to supporting emerging athletes across multiple disciplines. We believe in the power of sports to transform lives and communities.",
          industry: "Sports Equipment Manufacturing",
          foundedYear: "1998",
          companySize: "501-1000",
          website: "www.globalsportsinc.com",
          socialMedia: {
            twitter: "twitter.com/globalsports",
            linkedin: "linkedin.com/company/globalsports",
            instagram: "instagram.com/globalsports"
          }
        };
        setUser(mockData);
        setEditableUser(mockData);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields for social media
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditableUser({
        ...editableUser,
        [parent]: {
          ...editableUser[parent],
          [child]: value,
        },
      });
    } else {
      setEditableUser({
        ...editableUser,
        [name]: value,
      });
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() !== "") {
      setEditableUser({
        ...editableUser,
        interests: [...(editableUser.interests || []), newInterest.trim()]
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = [...editableUser.interests];
    updatedInterests.splice(index, 1);
    setEditableUser({
      ...editableUser,
      interests: updatedInterests
    });
  };

  const handleEdit = () => {
    setEditing(true);
    setEditableUser(user);
  };

  const handleSave = () => {
    // In a real app, you would make an API call here to save the data
    api
      .post("/users/update", { user: editableUser })
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-950 flex items-center justify-center">
        <div className="animate-pulse text-sky-400 text-xl">
          Loading profile...
        </div>
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
    <div className="min-h-screen bg-sky-950 text-sky-100 mt-16">
      <ChatButton currentPage={"Sponsor profile"}/>
      {/* Header/Navigation */}
      <header className="pb-2 pt-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-300"></h1>
          {!editing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-sky-800 hover:bg-sky-700 rounded-md flex items-center transition-all duration-300 text-sky-100"
            >
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md flex items-center transition-all duration-300"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-sky-800 hover:bg-sky-700 rounded-md flex items-center transition-all duration-300"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-sky-900 to-sky-950 rounded-xl shadow-2xl overflow-hidden mb-8 border border-sky-800">
          {/* Cover Photo */}
          <div className="h-64 bg-gradient-to-r from-indigo-800 via-blue-900 to-sky-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950 to-transparent opacity-70"></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 py-6 relative">
            {/* Company Logo */}
            <div className="absolute -top-20 left-8">
              <div className="rounded-full border-4 border-sky-950 overflow-hidden shadow-xl">
                <img
                  src={user.profilePicture || "/api/placeholder/144/144"}
                  alt={user.companyName}
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
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1">
                      {user.companyName}
                    </h2>
                    {user.location && (
                      <span className="ml-4 text-sky-400 flex items-center">
                        <Globe size={14} className="mr-1" />
                        {user.location}
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-sky-300 font-medium">
                    {user.industry}
                  </p>
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
                      <label className="block text-sm font-medium mb-1 text-sky-300">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={editableUser.companyName}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={editableUser.industry}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={editableUser.location}
                        onChange={handleChange}
                        className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-sky-300">
                        Website
                      </label>
                      <input
                        type="text"
                        name="website"
                        value={editableUser.website}
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
                <p className="text-sky-100 leading-relaxed">
                  {user.bio || "No company description available."}
                </p>
              ) : (
                <div>
                  <textarea
                    name="bio"
                    value={editableUser.bio}
                    onChange={handleChange}
                    placeholder="Share your company story, mission, and sponsorship philosophy..."
                    className="w-full bg-sky-900 border border-sky-700 rounded-md p-3 text-white h-32 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Sponsorship Interests */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sky-200">Sponsorship Interests</h3>
              </div>

              {editing && (
                <div className="mb-6 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="flex-grow bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                  />
                  <button
                    onClick={handleAddInterest}
                    className="px-4 py-2 bg-sky-800 hover:bg-sky-700 rounded-md flex items-center transition-all duration-300"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {editableUser.interests && editableUser.interests.length > 0 ? (
                  editableUser.interests.map((interest, index) => (
                    <div key={index} className="bg-sky-800/60 text-sky-200 px-3 py-1 rounded-full flex items-center">
                      <Tag size={14} className="mr-2" />
                      <span>{interest}</span>
                      {editing && (
                        <button
                          className="ml-2 text-sky-400 hover:text-sky-200"
                          onClick={() => handleRemoveInterest(index)}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sky-500">No interests specified</div>
                )}
              </div>
            </div>

            {/* Sponsorship Opportunities */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-sky-200">What We Offer</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sky-800/30 p-5 rounded-lg border border-sky-700/50">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-700 p-2 rounded-lg mr-3">
                      <DollarSign size={20} className="text-sky-200" />
                    </div>
                    <h4 className="text-lg font-semibold text-sky-200">Financial Support</h4>
                  </div>
                  <p className="text-sky-100">
                    Direct financial sponsorship to help athletes cover training, competition, and equipment costs.
                  </p>
                </div>

                <div className="bg-sky-800/30 p-5 rounded-lg border border-sky-700/50">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-700 p-2 rounded-lg mr-3">
                      <Briefcase size={20} className="text-sky-200" />
                    </div>
                    <h4 className="text-lg font-semibold text-sky-200">Equipment & Gear</h4>
                  </div>
                  <p className="text-sky-100">
                    Access to professional-grade equipment, performance gear, and exclusive product testing opportunities.
                  </p>
                </div>

                <div className="bg-sky-800/30 p-5 rounded-lg border border-sky-700/50">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-700 p-2 rounded-lg mr-3">
                      <Users size={20} className="text-sky-200" />
                    </div>
                    <h4 className="text-lg font-semibold text-sky-200">Networking & Exposure</h4>
                  </div>
                  <p className="text-sky-100">
                    Opportunities to connect with industry professionals, media coverage, and social media promotion.
                  </p>
                </div>

                <div className="bg-sky-800/30 p-5 rounded-lg border border-sky-700/50">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-700 p-2 rounded-lg mr-3">
                      <Target size={20} className="text-sky-200" />
                    </div>
                    <h4 className="text-lg font-semibold text-sky-200">Career Development</h4>
                  </div>
                  <p className="text-sky-100">
                    Mentorship programs, career guidance, and post-athletic career opportunities within our company.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">
                Company Information
              </h3>

              {!editing ? (
                <div className="space-y-4">
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <Building size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">
                      Founded:
                    </span>
                    <span className="text-white">
                      {user.foundedYear || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <Users size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">
                      Company Size:
                    </span>
                    <span className="text-white">
                      {user.companySize || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center p-2 border-b border-sky-800/50">
                    <Globe size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">
                      Website:
                    </span>
                    <span className="text-white">
                      {user.website ? (
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-100">
                          {user.website}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center p-2">
                    <MapPin size={18} className="mr-3 text-sky-400" />
                    <span className="font-medium text-sky-300 w-32">
                      Location:
                    </span>
                    <span className="text-white">
                      {user.location || "Not specified"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Founded Year
                    </label>
                    <input
                      type="text"
                      name="foundedYear"
                      value={editableUser.foundedYear}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={editableUser.companySize}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001+">1001+ employees</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Sponsorship Budget */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">
                Sponsorship Budget
              </h3>

              {!editing ? (
                <div className="bg-sky-800/30 rounded-lg p-6 text-center">
                  <div className="text-sky-400 text-sm mb-2">ANNUAL BUDGET</div>
                  <div className="text-3xl font-bold text-white">
                    {user.sponsorshipBudget ? formatCurrency(user.sponsorshipBudget) : "Not specified"}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1 text-sky-300">
                    Annual Sponsorship Budget (USD)
                  </label>
                  <input
                    type="number"
                    name="sponsorshipBudget"
                    value={editableUser.sponsorshipBudget}
                    onChange={handleChange}
                    className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Contact & Social */}
            <div className="bg-sky-900/40 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-sky-800/50">
              <h3 className="text-xl font-bold text-sky-200 mb-6">
                Contact Information
              </h3>

              {!editing ? (
                <div className="space-y-4">
                  {user.email && (
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-sky-400" />
                      <a
                        href={`mailto:${user.email}`}
                        className="text-sky-300 hover:text-sky-100 transition-colors duration-300"
                      >
                        {user.email}
                      </a>
                    </div>
                  )}
                  
                  {user.phoneNumber && (
                    <div className="flex items-center">
                      <Phone size={18} className="mr-3 text-sky-400" />
                      <span className="text-white">{user.phoneNumber}</span>
                    </div>
                  )}

                  {/* Social Media Links */}
                  {user.socialMedia &&
                    Object.entries(user.socialMedia).map(([platform, url]) => {
                      if (!url) return null;
                      return (
                        <div key={platform} className="flex items-center">
                          <ExternalLink
                            size={18}
                            className="mr-3 text-sky-400"
                          />
                          <a
                            href={
                              url.startsWith("http") ? url : `https://${url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-300 hover:text-sky-100 transition-colors duration-300 flex items-center"
                          >
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                          </a>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editableUser.email}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editableUser.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>

                  {/* Social Media Inputs */}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Twitter
                    </label>
                    <input
                      type="text"
                      name="socialMedia.twitter"
                      value={editableUser.socialMedia?.twitter || ""}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="socialMedia.linkedin"
                      value={editableUser.socialMedia?.linkedin || ""}
                      onChange={handleChange}
                      className="w-full bg-sky-900 border border-sky-700 rounded-md p-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-sky-300">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="socialMedia.instagram"
                      value={editableUser.socialMedia?.instagram || ""}
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
    </div>
  );
}