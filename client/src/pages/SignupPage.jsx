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

  // Progress indicator
  const renderProgressBar = () => {
    const totalSteps = role === "athlete" ? 3 : 2;
    return (
      <div className="w-full mb-8">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? "bg-sky-500 text-white"
                    : step === index + 1
                    ? "bg-sky-600 text-white ring-4 ring-sky-300"
                    : "bg-sky-200 text-sky-700"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-2 text-sky-200 font-medium">
                {index === 0 ? "Account" : index === 1 ? "Profile" : "Achievements"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-sky-200 w-full rounded-full"></div>
          <div
            className="absolute top-0 h-1 bg-sky-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Common input field component
  const FormInput = ({ label, name, type = "text", value, onChange, required = false, placeholder = "", className = "" }) => (
    <div className={className}>
      <label className="block text-sky-100 font-medium mb-1 text-sm">{label} {required && <span className="text-sky-300">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 bg-sky-800/60 border border-sky-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sky-50 placeholder-sky-300/60 shadow-sm transition-all duration-200"
      />
    </div>
  );

  // Common textarea component
  const FormTextarea = ({ label, name, value, onChange, required = false, placeholder = "", className = "", rows = 4 }) => (
    <div className={className}>
      <label className="block text-sky-100 font-medium mb-1 text-sm">{label} {required && <span className="text-sky-300">*</span>}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full p-3 bg-sky-800/60 border border-sky-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sky-50 placeholder-sky-300/60 shadow-sm transition-all duration-200"
      />
    </div>
  );

  // Common select component
  const FormSelect = ({ label, name, value, onChange, required = false, options, className = "" }) => (
    <div className={className}>
      <label className="block text-sky-100 font-medium mb-1 text-sm">{label} {required && <span className="text-sky-300">*</span>}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-sky-800/60 border border-sky-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sky-50 shadow-sm transition-all duration-200 appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );

  // Button component
  const Button = ({ onClick, type = "button", variant = "primary", children, className = "" }) => {
    const variants = {
      primary: "bg-sky-600 hover:bg-sky-500 text-white",
      secondary: "bg-sky-700 hover:bg-sky-600 text-sky-100",
      outline: "bg-transparent border border-sky-500 text-sky-500 hover:bg-sky-500/10",
    };

    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Section title component
  const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-sky-100 mb-6 border-b border-sky-700 pb-2">{children}</h2>
  );

  // Card component for groups of inputs
  const Card = ({ children, title = "", className = "" }) => (
    <div className={`bg-sky-800/30 rounded-xl p-6 shadow-lg border border-sky-700/50 backdrop-blur-sm ${className}`}>
      {title && <h3 className="text-lg font-semibold text-sky-300 mb-4">{title}</h3>}
      {children}
    </div>
  );

  // Render different steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <SectionTitle>Create Your Account</SectionTitle>

            {/* Role Toggle */}
            <div className="flex flex-col items-center justify-center mb-8">
              <p className="text-sky-200 mb-3 text-sm font-medium">I am signing up as:</p>
              <div className="relative inline-flex">
                <div
                  className="w-64 h-12 flex items-center bg-sky-800/60 rounded-full p-1 border border-sky-700/60 shadow-inner"
                >
                  <div
                    className={`bg-sky-500 w-32 h-10 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${
                      role === "sponsor" ? "translate-x-32" : ""
                    }`}
                  ></div>
                </div>
                <div className="absolute inset-0 flex text-sm font-medium">
                  <div
                    className={`w-32 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                      role === "athlete"
                        ? "text-white"
                        : "text-sky-200"
                    }`}
                    onClick={() => setRole("athlete")}
                  >
                    Athlete
                  </div>
                  <div
                    className={`w-32 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                      role === "sponsor"
                        ? "text-white"
                        : "text-sky-200"
                    }`}
                    onClick={() => setRole("sponsor")}
                  >
                    Sponsor
                  </div>
                </div>
              </div>
            </div>

            {/* Basic User Info Form */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserChange}
                  required
                  className="md:col-span-2"
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  required
                  className="md:col-span-2"
                />

                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleUserChange}
                  required
                />

                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password" 
                  value={userData.confirmPassword}
                  onChange={handleUserChange}
                  required
                />

                <FormInput
                  label="Profile Picture URL"
                  name="profilePicture"
                  value={userData.profilePicture}
                  onChange={handleUserChange}
                  placeholder="https://example.com/image.jpg"
                  className="md:col-span-2"
                />
              </div>
            </Card>

            <div className="flex justify-end pt-4">
              <Button onClick={nextStep} variant="primary">
                Continue to Profile <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        );

      case 2:
        return role === "athlete" ? (
          // Athlete Profile Form
          <div className="space-y-6">
            <SectionTitle>Athlete Profile</SectionTitle>

            <Card title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Title"
                  name="title"
                  value={athleteData.title}
                  onChange={handleAthleteChange}
                  required
                  placeholder="Professional Tennis Player"
                />

                <FormInput
                  label="Location"
                  name="location"
                  value={athleteData.location}
                  onChange={handleAthleteChange}
                  required
                  placeholder="New York, USA"
                />

                <FormInput
                  label="Sport"
                  name="sport"
                  value={athleteData.sport}
                  onChange={handleAthleteChange}
                  required
                />

                <FormInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={athleteData.dateOfBirth}
                  onChange={handleAthleteChange}
                  required
                />

                <FormSelect
                  label="Gender"
                  name="gender"
                  value={athleteData.gender}
                  onChange={handleAthleteChange}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />

                <FormInput
                  label="Nationality"
                  name="nationality"
                  value={athleteData.nationality}
                  onChange={handleAthleteChange}
                />

                <FormInput
                  label="Birth Place"
                  name="birthPlace"
                  value={athleteData.birthPlace}
                  onChange={handleAthleteChange}
                />

                <FormInput
                  label="Birth Country"
                  name="birthCountry"
                  value={athleteData.birthCountry}
                  onChange={handleAthleteChange}
                />

                <FormInput
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={athleteData.height}
                  onChange={handleAthleteChange}
                />

                <FormInput
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={athleteData.weight}
                  onChange={handleAthleteChange}
                />

                <FormTextarea
                  label="Bio"
                  name="bio"
                  value={athleteData.bio}
                  onChange={handleAthleteChange}
                  required
                  placeholder="Tell sponsors about yourself, your achievements, and goals..."
                  className="md:col-span-2"
                  rows={5}
                />
              </div>
            </Card>

            <Card title="Education" className="space-y-6">
              {athleteData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-sky-700/40 rounded-lg space-y-4 border border-sky-600/30"
                >
                  <h4 className="text-sm font-medium text-sky-200 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                    </svg>
                    Education #{index + 1}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="School"
                      name="school"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="University name"
                    />

                    <FormInput
                      label="Degree"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Bachelor of Science"
                    />

                    <FormInput
                      label="Period"
                      name="period"
                      value={edu.period}
                      placeholder="e.g. 2018-2022"
                      onChange={(e) => handleEducationChange(index, e)}
                    />

                    <FormInput
                      label="Focus/Major"
                      name="focus"
                      value={edu.focus}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Sports Management"
                    />
                  </div>
                </div>
              ))}

              <Button 
                onClick={addEducation} 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Education
              </Button>
            </Card>

            <div className="flex justify-between pt-4">
              <Button onClick={prevStep} variant="secondary">
                <span className="mr-1">←</span> Back
              </Button>
              <Button onClick={nextStep} variant="primary">
                Continue to Achievements <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        ) : (
          // Sponsor Profile Form
          <div className="space-y-6">
            <SectionTitle>Sponsor Profile</SectionTitle>

            <Card>
              <div className="space-y-6">
                <FormInput
                  label="Company Name"
                  name="companyName"
                  value={sponsorData.companyName}
                  onChange={handleSponsorChange}
                  required
                  placeholder="Your company name"
                />

                <FormInput
                  label="Sponsorship Budget ($)"
                  name="sponsorshipBudget"
                  type="number"
                  value={sponsorData.sponsorshipBudget}
                  onChange={handleSponsorChange}
                  placeholder="Annual budget for sponsorships"
                />

                <FormTextarea
                  label="Interests (comma-separated)"
                  name="interests"
                  value={sponsorData.interests.join(", ")}
                  onChange={handleInterestsChange}
                  placeholder="e.g. Football, Basketball, Swimming"
                  rows={4}
                />
              </div>
            </Card>

            <div className="flex justify-between pt-4">
              <Button onClick={prevStep} variant="secondary">
                <span className="mr-1">←</span> Back
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                Complete Registration
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <SectionTitle>Achievements</SectionTitle>
            <p className="text-sky-200 mb-6">Showcase your accomplishments to attract potential sponsors. These are optional but highly recommended.</p>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={index} 
                  className="border border-sky-600/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-sky-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Achievement #{index + 1}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Title"
                      name="title"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, e)}
                      placeholder="e.g. National Championship"
                    />

                    <FormInput
                      label="Subtitle"
                      name="subtitle"
                      value={achievement.subtitle}
                      onChange={(e) => handleAchievementChange(index, e)}
                      placeholder="e.g. First Place"
                    />

                    <FormInput
                      label="Date"
                      name="date"
                      type="date"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />

                    <FormInput
                      label="Icon"
                      name="icon"
                      value={achievement.icon}
                      onChange={(e) => handleAchievementChange(index, e)}
                      placeholder="e.g. trophy, medal, star"
                    />

                    <FormInput
                      label="Image URL"
                      name="image"
                      value={achievement.image}
                      onChange={(e) => handleAchievementChange(index, e)}
                      placeholder="https://example.com/trophy.jpg"
                    />

                    <FormTextarea
                      label="Description"
                      name="description"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, e)}
                      placeholder="Describe your achievement..."
                      className="md:col-span-2"
                    />
                  </div>
                </Card>
              ))}

              <Button 
                onClick={addAchievement} 
                variant="outline" 
                className="w-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Achievement
              </Button>
            </div>

            <div className="flex justify-between pt-4">
              <Button onClick={prevStep} variant="secondary">
                <span className="mr-1">←</span> Back
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                Complete Registration
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-sky-900/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-sky-700/50">
        <div className="p-8 md:p-10">
          {renderProgressBar()}
          <form>{renderStep()}</form>
        </div>
      </div>
    </div>
  );
}