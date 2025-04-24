import { useState } from "react";
import { api } from "../api/api"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  // States for form navigation
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("athlete");
    const navigate = useNavigate();
  // States for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

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
    },
  ]);

  // Handle user data changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle athlete data changes
  const handleAthleteChange = (e) => {
    const { name, value } = e.target;
    setAthleteData({
      ...athleteData,
      [name]: value,
    });
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

  // Handle sponsor data changes
  const handleSponsorChange = (e) => {
    const { name, value } = e.target;
    setSponsorData({
      ...sponsorData,
      [name]: value,
    });
  };

  // Handle interests changes
  const handleInterestsChange = (e) => {
    const value = e.target.value;
    setSponsorData({
      ...sponsorData,
      interests: value.split(",").map((item) => item.trim()),
    });
  };

  // Handle achievement changes
  const handleAchievementChange = (index, e) => {
    const { name, value } = e.target;
    const newAchievements = [...achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [name]: value,
    };
    setAchievements(newAchievements);
  };

  // Add more achievement fields
  const addAchievement = () => {
    setAchievements([
      ...achievements,
      { title: "", subtitle: "", description: "", date: "", icon: "", image: "" },
    ]);
  };

  // Toggle between athlete and sponsor
  const toggleRole = () => {
    setRole(role === "athlete" ? "sponsor" : "athlete");
  };

  // Move to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      user: { ...userData, role },
      profile: role === "athlete" ? athleteData : sponsorData,
      achievements: role === "athlete" ? achievements : [],
    });
    api
      .post("/users/register", {
        user: { ...userData, role },
        profile: role === "athlete" ? athleteData : sponsorData,
        achievements: role === "athlete" ? achievements : [],
      })
      .then((response) => {
        console.log(response.data);
        navigate("/signin"); // Redirect to login page after successful signup
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("Signup failed. Please try again.");
      });
  };

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
                  className={`w-48 h-12 flex items-center bg-blue-700 rounded-full p-1 duration-300 ease-in-out ${
                    role === "sponsor" ? "bg-opacity-50" : "bg-opacity-50"
                  }`}
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
                <label className="block text-sky-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleUserChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleUserChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleUserChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  name="profilePicture"
                  value={userData.profilePicture}
                  onChange={handleUserChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
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
                <label className="block text-sky-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={athleteData.title}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={athleteData.location}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Sport</label>
                <input
                  type="text"
                  name="sport"
                  value={athleteData.sport}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={athleteData.dateOfBirth}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Gender</label>
                <select
                  name="gender"
                  value={athleteData.gender}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Birth Place</label>
                <input
                  type="text"
                  name="birthPlace"
                  value={athleteData.birthPlace}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Birth Country</label>
                <input
                  type="text"
                  name="birthCountry"
                  value={athleteData.birthCountry}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={athleteData.nationality}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={athleteData.height}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={athleteData.weight}
                  onChange={handleAthleteChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sky-300 mb-1">Bio</label>
              <textarea
                name="bio"
                value={athleteData.bio}
                onChange={handleAthleteChange}
                className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 h-32"
                required
              ></textarea>
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
                  className="p-4 bg-sky-800 bg-opacity-50 rounded-lg space-y-3"
                >
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 text-sm"
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 text-sm"
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 text-sm"
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 text-sm"
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
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
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
                <label className="block text-sky-300 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={sponsorData.companyName}
                  onChange={handleSponsorChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">
                  Sponsorship Budget ($)
                </label>
                <input
                  type="number"
                  name="sponsorshipBudget"
                  value={sponsorData.sponsorshipBudget}
                  onChange={handleSponsorChange}
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                />
              </div>

              <div>
                <label className="block text-sky-300 mb-1">
                  Interests (comma-separated)
                </label>
                <textarea
                  name="interests"
                  value={sponsorData.interests.join(", ")}
                  onChange={handleInterestsChange}
                  placeholder="e.g. Football, Basketball, Swimming"
                  className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 h-32"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-sky-100 font-medium rounded-md transition-colors"
              >
                Complete Signup
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-sky-300 mb-6">
              Achievements (Optional)
            </h2>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-sky-800 bg-opacity-50 rounded-lg space-y-3"
                >
                  <h3 className="text-lg font-medium text-sky-300">
                    Achievement #{index + 1}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={achievement.title}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
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
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sky-300 text-sm mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={achievement.description}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 h-20"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Icon
                      </label>
                      <input
                        type="text"
                        name="icon"
                        value={achievement.icon}
                        onChange={(e) => handleAchievementChange(index, e)}
                        placeholder="e.g. trophy, medal, star"
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100 placeholder:text-sky-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sky-300 text-sm mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={achievement.image}
                        onChange={(e) => handleAchievementChange(index, e)}
                        className="w-full p-2 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-1000 text-sky-100"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addAchievement}
                className="w-full p-2 bg-sky-800 hover:bg-sky-700 text-sky-100 font-medium rounded-md transition-colors"
              >
                + Add Another Achievement
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-600 text-sky-100 font-medium rounded-md transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-sky-100 font-medium rounded-md transition-colors"
              >
                Complete Signup
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-sky-900 bg-opacity-80 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <form>{renderStep()}</form>
        </div>
      </div>
    </div>
  );
}
