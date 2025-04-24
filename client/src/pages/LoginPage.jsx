import { useState } from "react";
import { api } from "../api/api"; 
export default function LoginForm() {
  // State for login credentials
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // State for form error handling
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // Clear error when user starts typing again
    if (error) setError("");
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }
    console.log("Login data:", loginData);
    
    api.post("/users/login", loginData, { withCredentials: true })
      .then((response) => {
        console.log("Login successful:", response.data);
        setTimeout(() => {
          setLoading(false);
          alert("Login successful!");
          // setLoginData({ email: "", password: "" });
        }, 1000);
      })
      .catch((error) => {
        console.error("Login error:", error.response.data.message);
        setError(error.response.data.message || "Login failed. Please try again.");
        setLoading(false);
      });
    // Simulate API call
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-sky-900 bg-opacity-80 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sky-300">Welcome Back</h1>
            <p className="text-sky-100 mt-2 opacity-80">Sign in to your account</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-40 border border-red-800 text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sky-300 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={loginData.email} 
                onChange={handleChange} 
                className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sky-300">Password</label>
                <a href="#" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input 
                type="password" 
                name="password" 
                value={loginData.password} 
                onChange={handleChange} 
                className="w-full p-3 bg-sky-800 border border-sky-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 text-sky-600 bg-sky-700 border-sky-600 rounded focus:ring-sky-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-sky-200">
                Remember me
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`w-full py-3 px-4 ${loading ? 'bg-sky-800' : 'bg-sky-700 hover:bg-sky-600'} text-white font-medium rounded-md transition-colors flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Sign In"}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sky-200">
              Don't have an account?{" "}
              <a href="/signup" className="text-sky-400 hover:text-sky-300 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}