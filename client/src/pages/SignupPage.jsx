import { useState } from "react";
import { api } from "../api/api"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  // States for form navigation
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("athlete");
  const navigate = useNavigate();
  
  // States for user data with proper validation tracking
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    profilePictureUrl: "", // For preview purposes
  });

  // States for form validation
  const [errors, setErrors] = useState({});

  // States for athlete data
  const [athleteData, setAthleteData] = useState({
    title: "",
    location: "",
    sport: "",
    bio: "",
    dateOfBirth: "",
    education: [
      {
        school: "",
        degree: "",
        period: "",
        focus: "",
      },
    ],
    gender: "male",
    birthPlace: "",
    birthCountry: "",
    nationality: "",
    height: "",
    weight: "",
  });

  // States for sponsor data
  const [sponsorData, setSponsorData] = useState({
    companyName: "",
    sponsorshipBudget: "",
    interests: [],
  });

  // States for achievements
  const [achievements, setAchievements] = useState([
    {
      title: "",
      subtitle: "",
      description: "",
      date: "",
      icon: "",
      image: "",
      certificateUrl: "",
      certificateFile: null,
    },
  ]);

  // Form validation
  const validateStep = (stepNum) => {
    const newErrors = {};
    
    if (stepNum === 1) {
      if (!userData.name) newErrors.name = "Name is required";
      if (!userData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        newErrors.email = "Email is invalid";
      }
      
      if (!userData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
      
      if (!userData.password) {
        newErrors.password = "Password is required";
      } else if (userData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      
      if (userData.password !== userData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }
    
    if (stepNum === 2 && role === "athlete") {
      if (!athleteData.title) newErrors.title = "Title is required";
      if (!athleteData.location) newErrors.location = "Location is required";
      if (!athleteData.sport) newErrors.sport = "Sport is required";
      if (!athleteData.bio) newErrors.bio = "Bio is required";
    }
    
    if (stepNum === 2 && role === "sponsor") {
      if (!sponsorData.companyName) newErrors.companyName = "Company name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle user data changes
  const handleUserChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];
      setUserData({
        ...userData,
        profilePicture: file,
        profilePictureUrl: URL.createObjectURL(file),
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle athlete data changes
  const handleAthleteChange = (e) => {
    const { name, value } = e.target;
    setAthleteData({
      ...athleteData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle education changes
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...athleteData.education];
    newEducation[index] = {
      ...newEducation[index],
      [name]: value,
    };
    setAthleteData({
      ...athleteData,
      education: newEducation,
    });
  };

  // Upload image to Cloudinary service
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_PRESET || "spiritX"
      );
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME || "dbtbvwtpw");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env.REACT_APP_CLOUD_NAME || "dbtbvwtpw"
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const urls = await res.json();
      return urls.url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  // Add more education fields
  const addEducation = () => {
    setAthleteData({
      ...athleteData,
      education: [
        ...athleteData.education,
        { school: "", degree: "", period: "", focus: "" },
      ],
    });
  };

  // Remove education field
  const removeEducation = (index) => {
    if (athleteData.education.length > 1) {
      const newEducation = [...athleteData.education];
      newEducation.splice(index, 1);
      setAthleteData({
        ...athleteData,
        education: newEducation,
      });
    }
  };

  // Handle sponsor data changes
  const handleSponsorChange = (e) => {
    const { name, value } = e.target;
    setSponsorData({
      ...sponsorData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle interests changes
  const handleInterestsChange = (e) => {
    const value = e.target.value;
    setSponsorData({
      ...sponsorData,
      interests: value.split(",").map((item) => item.trim()).filter(item => item),
    });
  };

  // Handle achievement changes
  const handleAchievementChange = (index, e) => {
    const { name, value, files } = e.target;
    const newAchievements = [...achievements];
    
    if (name === "certificateFile" && files && files[0]) {
      newAchievements[index] = {
        ...newAchievements[index],
        certificateFile: files[0],
        certificateUrl: URL.createObjectURL(files[0]),
      };
    } else {
      newAchievements[index] = {
        ...newAchievements[index],
        [name]: value,
      };
    }
    
    setAchievements(newAchievements);
  };

  // Add more achievement fields
  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        title: "",
        subtitle: "",
        description: "",
        date: "",
        icon: "",
        image: "",
        certificateUrl: "",
        certificateFile: null,
      },
    ]);
  };

  // Remove achievement
  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      const newAchievements = [...achievements];
      newAchievements.splice(index, 1);
      setAchievements(newAchievements);
    }
  };

  // Move to next step
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  // Move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }
    
    try {
      // Show loading state
      setIsLoading(true);
      
      // Upload profile picture to Cloudinary
      let profilePictureUrl = userData.profilePictureUrl;
      if (userData.profilePicture && !(userData.profilePictureUrl.startsWith('http'))) {
        profilePictureUrl = await uploadToCloudinary(userData.profilePicture);
      }
      
      // Process achievements with certificate uploads
      const processedAchievements = await Promise.all(
        achievements.map(async (achievement) => {
          let certificateUrl = achievement.certificateUrl;
          if (achievement.certificateFile) {
            certificateUrl = await uploadToCloudinary(achievement.certificateFile);
          }
          
          return {
            ...achievement,
            certificateUrl,
            certificateFile: undefined, // Remove file object before sending to API
          };
        })
      );
      
      // Prepare final data for submission
      const registrationData = {
        user: { 
          ...userData, 
          profilePicture: profilePictureUrl,
          profilePictureUrl: undefined, // Remove URL before sending to API
          role 
        },
        profile: role === "athlete" ? athleteData : sponsorData,
        achievements: role === "athlete" ? processedAchievements : [],
      };

      // Send data to backend
      const response = await api.post("/users/register", registrationData);
      
      // Handle successful registration
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect after a brief success message
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Error during signup:", error);
      
      // Set global error message
      setErrors({
        ...errors,
        global: error.response?.data?.message || "Registration failed. Please try again."
      });
    }
  };

  // Loading and success states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Render different steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sky-300 mb-6">
              Create Your Account
            </h2>

            {/* Role Toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative inline-flex">
                <div
                  className={`w-48 h-12 flex items-center bg-blue-700 rounded-full p-1 duration-300 ease-in-out bg-opacity-50`}
                >
                  <div
                    className={`bg-blue-900 w-24 h-10 rounded-full shadow-md transform duration-300 ease-in-out ${
                      role === "sponsor" ? "translate-x-24" : ""
                    }`}
                  ></div>
                </div>
                <div className="absolute inset-0 flex text-sm">
                  <div
                    className={`w-24 flex items-center justify-center cursor-pointer ${
                      role === "athlete"
                        ? "text-sky-300 font-medium"
                        : "text-sky-300"
                    }`}
                    onClick={() => setRole("athlete")}
                  >
                    Athlete
                  </div>
                  <div
                    className={`w-24 flex items-center justify-center cursor-pointer ${
                      role === "sponsor"
                        ? "text-sky-300 font-medium"
                        : "text-sky-300"
                    }`}
                    onClick={() => setRole("sponsor")}
                  >
                    Sponsor
                  </div>
                </div>
              </div>
            </div>

            {/* Basic User Info Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sky-300 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleUserChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.name ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sky-300 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.email ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sky-300 mb-1">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleUserChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.phoneNumber ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sky-300 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleUserChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.password ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sky-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleUserChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.confirmPassword ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sky-300 mb-2 text-sm font-medium">
                  Profile Picture
                </label>

                <div className="flex items-center space-x-4">
                  {/* Avatar or Preview */}
                  {userData.profilePictureUrl ? (
                    <img
                      src={userData.profilePictureUrl}
                      alt="Profile Preview"
                      className="w-16 h-16 object-cover rounded-full border-2 border-sky-500"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-sky-900 flex items-center justify-center rounded-full border-2 border-sky-700">
                      {/* SVG Placeholder */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Upload Button */}
                  <label
                    htmlFor="profilePicture"
                    className="cursor-pointer bg-sky-700 hover:bg-sky-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                  >
                    {userData.profilePictureUrl ? "Change" : "Upload"} Image
                  </label>

                  {/* Hidden File Input */}
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUserChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return role === "athlete" ? (
          // Athlete Profile Form
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sky-300 mb-6">
              Athlete Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sky-300 mb-1">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={athleteData.title}
                  onChange={handleAthleteChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.title ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sky-300 mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={athleteData.location}
                  onChange={handleAthleteChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.location ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="sport" className="block text-sky-300 mb-1">Sport</label>
                <input
                  id="sport"
                  type="text"
                  name="sport"
                  value={athleteData.sport}
                  onChange={handleAthleteChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.sport ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.sport && <p className="text-red-500 text-sm mt-1">{errors.sport}</p>}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sky-300 mb-1">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={athleteData.dateOfBirth}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sky-300 mb-1">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={athleteData.gender}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="birthPlace" className="block text-sky-300 mb-1">Birth Place</label>
                <input
                  id="birthPlace"
                  type="text"
                  name="birthPlace"
                  value={athleteData.birthPlace}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                />
              </div>

              <div>
                <label htmlFor="birthCountry" className="block text-sky-300 mb-1">Birth Country</label>
                <input
                  id="birthCountry"
                  type="text"
                  name="birthCountry"
                  value={athleteData.birthCountry}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                />
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sky-300 mb-1">Nationality</label>
                <input
                  id="nationality"
                  type="text"
                  name="nationality"
                  value={athleteData.nationality}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sky-300 mb-1">Height (cm)</label>
                <input
                  id="height"
                  type="number"
                  name="height"
                  value={athleteData.height}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sky-300 mb-1">Weight (kg)</label>
                <input
                  id="weight"
                  type="number"
                  name="weight"
                  value={athleteData.weight}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="bio" className="block text-sky-300 mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={athleteData.bio}
                onChange={handleAthleteChange}
                className={`w-full p-3 bg-sky-800 border ${
                  errors.bio ? "border-red-500" : "border-sky-700"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 h-32`}
                required
              ></textarea>
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-sky-300">
                  Education
                </h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-3 py-1 bg-sky-800 hover:bg-sky-700 text-sky-100 text-sm rounded"
                >
                  + Add Education
                </button>
              </div>

              {athleteData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-sky-800 bg-opacity-50 rounded-lg space-y-3 relative"
                >
                  {athleteData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="absolute top-2 right-2 text-sky-300 hover:text-sky-100"
                      aria-label="Remove education"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        School
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        name="period"
                        value={edu.period}
                        placeholder="e.g. 2018-2022"
                        onChange={(e) => handleEducationChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Focus
                      </label>
                      <input
                        type="text"
                        name="focus"
                        value={edu.focus}
                        onChange={(e) => handleEducationChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                Back              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          // Sponsor Profile Form
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sky-300 mb-6">
              Sponsor Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sky-300 mb-1">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={sponsorData.companyName}
                  onChange={handleSponsorChange}
                  className={`w-full p-3 bg-sky-800 border ${
                    errors.companyName ? "border-red-500" : "border-sky-700"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100`}
                  required
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="sponsorshipBudget" className="block text-sky-300 mb-1">
                  Sponsorship Budget ($)
                </label>
                <input
                  id="sponsorshipBudget"
                  type="number"
                  name="sponsorshipBudget"
                  value={sponsorData.sponsorshipBudget}
                  onChange={handleSponsorChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100"
                  placeholder="Annual budget"
                />
              </div>

              <div>
                <label htmlFor="interests" className="block text-sky-300 mb-1">
                  Interests (comma separated)
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  value={sponsorData.interests.join(", ")}
                  onChange={handleInterestsChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 h-24"
                  placeholder="e.g. Football, Basketball, Swimming"
                ></textarea>
                <p className="text-sky-400 text-xs mt-1">
                  List sports or categories you're interested in sponsoring
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Complete Signup"
                )}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          // Achievements Form (for athletes only)
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sky-300 mb-6">
              Your Achievements
            </h2>
            <p className="text-sky-300 mb-6">
              Showcase your accomplishments (optional)
            </p>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-sky-800 bg-opacity-50 rounded-lg space-y-3 relative"
                >
                  {achievements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="absolute top-2 right-2 text-sky-300 hover:text-sky-100"
                      aria-label="Remove achievement"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={achievement.title}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                        placeholder="e.g. Gold Medal"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={achievement.subtitle}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                        placeholder="e.g. Olympic Games 2024"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={achievement.date}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sky-300 text-sm mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={achievement.description}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 text-sm h-20"
                        placeholder="Describe your achievement..."
                      ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sky-300 text-sm mb-1">
                        Certificate/Proof
                      </label>
                      <div className="flex items-center space-x-4">
                        {achievement.certificateUrl ? (
                          <img
                            src={achievement.certificateUrl}
                            alt="Certificate preview"
                            className="w-16 h-16 object-cover rounded border border-sky-700"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-sky-900 flex items-center justify-center rounded border border-sky-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-sky-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <label className="cursor-pointer bg-sky-700 hover:bg-sky-600 text-sky-100 py-1 px-3 rounded text-sm">
                          {achievement.certificateUrl ? "Change" : "Upload"} File
                          <input
                            type="file"
                            name="certificateFile"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={(e) => handleAchievementChange(index, e)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addAchievement}
                className="w-full py-2 bg-sky-800 hover:bg-sky-700 text-sky-300 rounded-md border border-dashed border-sky-600 transition-colors"
              >
                + Add Another Achievement
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Complete Signup"
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Success Message
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 flex items-center justify-center p-4">
        <div className="bg-sky-800 rounded-lg shadow-xl w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Registration Successful!
          </h2>
          <p className="text-sky-200 mb-6">
            Your account has been created successfully. You'll be redirected to the login page shortly.
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Main Form Container
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 flex items-center justify-center p-4">
      <div className="bg-sky-800 rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              {[1, 2, role === "athlete" ? 3 : null].filter(Boolean).map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= stepNum ? "bg-sky-500 text-white" : "bg-sky-900 text-sky-400"
                  }`}
                >
                  {stepNum}
                </div>
              ))}
            </div>
            <div className="text-sky-400">
              Step {step} of {role === "athlete" ? 3 : 2}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6">
          {errors.global && (
            <div className="mb-4 p-3 bg-red-900 text-red-100 rounded-md">
              {errors.global}
            </div>
          )}
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="bg-sky-900 p-4 text-center text-sm text-sky-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-sky-300 hover:text-white font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}