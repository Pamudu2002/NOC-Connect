import { useState } from "react";
import { api } from "../api/api";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // State for login credentials
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for form error handling
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
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

    api
      .post("/users/login", loginData, { withCredentials: true })
      .then((response) => {
        console.log("Login successful:", response.data);
        setTimeout(() => {
          setLoading(false);
          navigate("/player"); // Redirect to home page after successful login
          // setLoginData({ email: "", password: "" });
        }, 1000);
      })
      .catch((error) => {
        console.error("Login error:", error.response.data.message);
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-sky-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-sky-400 opacity-10 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
  

        {/* Card */}
        <div className="backdrop-blur-sm bg-sky-900 bg-opacity-40 rounded-2xl shadow-2xl border border-sky-800/50 overflow-hidden">
          {/* Header bar */}
          <div className="h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-400"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-sky-200 mt-3 opacity-80">
                Sign in to your NOC Connect account
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/20 backdrop-blur-sm border border-red-800/50 text-red-200 rounded-lg flex items-start"
              >
                <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sky-200 text-sm font-medium mb-1 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-sky-800/50 backdrop-blur-sm border border-sky-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white shadow-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sky-200 text-sm font-medium ml-1">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium"
                  >
                    Forgot Password ?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-sky-800/50 backdrop-blur-sm border border-sky-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-sky-500 bg-sky-800 border-sky-600 rounded focus:ring-sky-500 focus:ring-offset-0"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-sky-200">
                  Remember me for 30 days
                </label>
              </div>

              <motion.button
                type="submit"
                className={`w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg ${
                  loading ? "opacity-90" : ""
                }`}
                disabled={loading}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sky-200">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-sky-400 hover:text-sky-300 font-medium"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>

          {/* Footer bar */}
          <div className="bg-sky-900/70 py-4 px-8 border-t border-sky-800/30">
            <div className="text-center text-sky-400 text-sm">
              NOC Connect © {new Date().getFullYear()} |{" "}
              <a href="#" className="hover:text-sky-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
