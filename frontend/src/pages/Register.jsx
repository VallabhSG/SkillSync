import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiUser, FiCheck, FiInbox } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (result.success) {
      // Show verification message instead of navigating
      setRegisteredEmail(formData.email);
      toast.success("Account created successfully! Please verify your email.", {
        position: "top-right",
      });
    } else {
      toast.error(result.error || "Registration failed", {
        position: "top-right",
      });
    }

    setLoading(false);
  };

  const handleGoogleSignUp = () => {
    // Redirect to backend OAuth2 endpoint
    const backendUrl = API_URL.replace("/api", "");
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const benefits = [
    "AI-powered career recommendations",
    "Personalized learning paths",
    "Skill gap analysis",
    "Progress tracking & achievements",
    "Access to 500+ courses",
    "Resume analysis tools",
  ];

  // If registration successful, show verification message
  if (registeredEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full card-gradient text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
          >
            <FiInbox className="text-4xl text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold gradient-text mb-4">
            Check Your Email! 📧
          </h2>

          <p className="text-gray-600 mb-6">
            We've sent a verification link to:
          </p>

          <p className="text-lg font-semibold text-primary-600 mb-6 bg-primary-50 py-3 px-4 rounded-lg">
            {registeredEmail}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <FiCheck className="mr-2" />
              Next Steps:
            </h3>
            <ol className="text-sm text-blue-800 space-y-2 ml-6 list-decimal">
              <li>Open your email inbox</li>
              <li>Find the verification email from SkillSync</li>
              <li>Click the verification link</li>
              <li>Start exploring your personalized learning journey!</li>
            </ol>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or{" "}
            <Link
              to="/verify-email"
              className="text-primary-600 font-semibold hover:underline"
            >
              resend verification email
            </Link>
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 btn-primary py-3"
            >
              Go to Login
            </button>
            <button
              onClick={() => {
                setRegisteredEmail("");
                setFormData({
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Register Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="text-white">
            <motion.h2
              className="text-5xl font-bold mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Start Your Journey 🚀
            </motion.h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of professionals transforming their careers
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 text-lg"
                >
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="card-gradient max-w-md mx-auto">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl"
              >
                <span className="text-3xl">✨</span>
              </motion.div>
              <h2 className="text-3xl font-bold gradient-text">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2">
                Sign up to unlock all features
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiUser className="mr-2 text-primary-600" />
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiMail className="mr-2 text-primary-600" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiLock className="mr-2 text-primary-600" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiLock className="mr-2 text-primary-600" />
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Google Sign-Up Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-lg"
              >
                <FcGoogle className="text-2xl" />
                Sign up with Google
              </motion.button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
