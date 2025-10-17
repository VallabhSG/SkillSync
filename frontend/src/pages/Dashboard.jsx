import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { profileAPI, careerAPI } from "../services/api";
import ProgressTracker from "../components/ProgressTracker";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiUser,
  FiTarget,
  FiBook,
  FiTrendingUp,
  FiAward,
  FiAlertCircle,
  FiMail,
  FiX,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      try {
        const profileRes = await profileAPI.getProfile(user.userId);
        setProfile(profileRes.data);

        try {
          const recRes = await careerAPI.getLatestRecommendation(user.userId);
          setRecommendation(recRes.data);
        } catch (err) {
          console.log("No recommendations found");
        }
      } catch (err) {
        console.log("No profile found");
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    try {
      const response = await axios.post(`${API_URL}/verification/resend`, {
        email: user.email,
      });

      if (response.data.success) {
        toast.success("Verification email sent! Please check your inbox.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend verification email.",
        {
          position: "top-right",
        },
      );
    } finally {
      setResendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-2">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-xl text-white/80">
            Let's continue your learning journey
          </p>
        </motion.div>

        {/* Email Verification Banner */}
        {!user.emailVerified && showVerificationBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <FiAlertCircle className="text-yellow-600 text-2xl flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Verify Your Email Address
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Please verify your email address (
                    <strong>{user.email}</strong>) to access all features and
                    receive important updates.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResendVerification}
                      disabled={resendingEmail}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-semibold"
                    >
                      {resendingEmail ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiMail />
                          Resend Verification Email
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationBanner(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors ml-2"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </motion.div>
        )}

        {!profile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-gradient text-center py-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🚀
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Get Started with SkillSync
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Create your profile to unlock AI-powered career recommendations
              and personalized learning paths
            </p>
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                ✨ Create Your Profile
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-gradient relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200 to-purple-200 rounded-full filter blur-2xl opacity-30" />

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {profile.fullName || user.username}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiUser className="text-primary-600" />
                    <span className="text-sm">
                      {profile.educationLevel || "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiTrendingUp className="text-primary-600" />
                    <span className="text-sm">
                      {profile.yearsOfExperience || 0} years experience
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiTarget className="text-primary-600" />
                    <span className="text-sm line-clamp-2">
                      {profile.careerGoal || "Set your goal"}
                    </span>
                  </div>
                </div>

                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full btn-outline mt-6"
                  >
                    Edit Profile
                  </motion.button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card-gradient"
              >
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Skills</span>
                    <span className="font-bold text-2xl text-primary-600">
                      {profile.skills?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recommendations</span>
                    <span className="font-bold text-2xl text-purple-600">
                      {recommendation ? 1 : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile Complete</span>
                    <span className="font-bold text-2xl text-green-600">
                      {profile.fullName && profile.skills?.length > 0
                        ? "100"
                        : "50"}
                      %
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Recommendations Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-gradient"
              >
                <h2 className="text-2xl font-bold mb-4 gradient-text flex items-center">
                  <FiAward className="mr-2" />
                  Career Recommendations
                </h2>

                {recommendation ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-primary-200">
                      <p className="text-sm text-gray-600 mb-2">
                        Last updated:{" "}
                        {new Date(
                          recommendation.createdAt,
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-lg font-medium text-gray-900 mb-3">
                        Top Recommended Role:{" "}
                        <span className="text-primary-600">
                          {recommendation.recommendedRoles?.[0]}
                        </span>
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-gray-600">Confidence: </span>
                          <span className="font-bold text-green-600">
                            {(recommendation.confidenceScore * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">
                            Skills to Learn:{" "}
                          </span>
                          <span className="font-bold text-red-600">
                            {recommendation.missingSkills?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link to="/recommendations">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full btn-primary"
                      >
                        View Full Recommendations
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🎯</div>
                    <p className="text-gray-600 mb-6">
                      Generate AI-powered career recommendations based on your
                      profile
                    </p>
                    <Link to="/recommendations">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="btn-primary"
                      >
                        Generate Recommendations
                      </motion.button>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Progress Tracker */}
              {recommendation && (
                <ProgressTracker
                  currentSkills={profile.skills || []}
                  requiredSkills={recommendation.missingSkills || []}
                  recommendations={recommendation}
                />
              )}
            </div>
          </div>
        )}

        {/* Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <Link to="/recommendations">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-gradient hover:shadow-2xl cursor-pointer h-full"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Career Path
              </h3>
              <p className="text-gray-600">
                Get AI-powered career recommendations
              </p>
            </motion.div>
          </Link>

          <Link to="/courses">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-gradient hover:shadow-2xl cursor-pointer h-full"
            >
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Learning Resources
              </h3>
              <p className="text-gray-600">
                Explore curated courses and materials
              </p>
            </motion.div>
          </Link>

          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-gradient hover:shadow-2xl cursor-pointer h-full"
            >
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Update Profile
              </h3>
              <p className="text-gray-600">
                Keep your skills and goals current
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
