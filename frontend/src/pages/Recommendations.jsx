import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { careerAPI, profileAPI } from "../services/api";
import { toast } from "react-toastify";
import {
  FiRefreshCw,
  FiTrendingUp,
  FiBook,
  FiCode,
  FiBriefcase,
  FiZap,
} from "react-icons/fi";
import SkillGapChart from "../components/SkillGapChart";
import LearningPathTimeline from "../components/LearningPathTimeline";

const Recommendations = () => {
  const { user } = useAuth();
  const [recommendation, setRecommendation] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load profile
      const profileRes = await profileAPI.getProfile(user.userId);
      setProfile(profileRes.data);

      // Load latest recommendation
      try {
        const recRes = await careerAPI.getLatestRecommendation(user.userId);
        setRecommendation(recRes.data);
      } catch (err) {
        console.log("No recommendations found");
      }
    } catch (err) {
      toast.error("Please create your profile first");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);

    try {
      const response = await careerAPI.generateRecommendation(user.userId);
      setRecommendation(response.data);
      toast.success("🎉 New recommendations generated!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Please create your profile first");
      } else {
        toast.error("Failed to generate recommendations");
      }
    } finally {
      setGenerating(false);
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              AI Career Recommendations
            </h1>
            <p className="text-white/80">
              Personalized insights powered by artificial intelligence
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary mt-4 md:mt-0 flex items-center space-x-2"
          >
            <FiRefreshCw className={generating ? "animate-spin" : ""} />
            <span>{generating ? "Generating..." : "Generate New"}</span>
          </motion.button>
        </motion.div>

        {!recommendation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-gradient text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🎯
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              No Recommendations Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Generate your first AI-powered career recommendation based on your
              profile, skills, and goals
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary text-lg"
            >
              {generating ? "Generating..." : "✨ Generate Recommendations"}
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* AI Insights Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-gradient relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200 to-purple-200 rounded-full filter blur-3xl opacity-20 -z-10" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    AI Insights
                  </h2>
                  <p className="text-sm text-gray-500">
                    Generated on{" "}
                    {new Date(recommendation.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">
                    {(recommendation.confidenceScore * 100).toFixed(0)}%
                  </div>
                  <p className="text-xs text-gray-500">Confidence</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {recommendation.aiInsights}
              </p>

              <div className="flex items-center space-x-2 text-sm text-primary-600">
                <FiZap className="text-xl" />
                <span className="font-medium">Powered by Advanced AI</span>
              </div>
            </motion.div>

            {/* Recommended Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-gradient"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <FiBriefcase className="mr-3" />
                Recommended Job Roles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendation.recommendedRoles?.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-primary-200 text-center cursor-pointer"
                  >
                    <div className="text-4xl mb-3">💼</div>
                    <h4 className="font-bold text-gray-900 text-lg">{role}</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Perfect match for your skills
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Gap Visualization */}
            {profile && (
              <SkillGapChart
                currentSkills={profile.skills || []}
                requiredSkills={recommendation.missingSkills || []}
              />
            )}

            {/* Skills to Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-gradient"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <FiTrendingUp className="mr-3" />
                Skills to Master
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recommendation.missingSkills?.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 rounded-lg border border-red-200 text-center font-medium text-red-700 cursor-pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-gradient"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <FiBook className="mr-3" />
                Recommended Learning Path
              </h3>

              <div className="space-y-4">
                {recommendation.recommendedCourses?.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                  >
                    <div className="text-3xl">📚</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{course}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Click to explore this course
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Ideas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-gradient"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <FiCode className="mr-3" />
                Project Ideas to Build
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.projectIdeas?.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-3xl">💡</span>
                      <div>
                        <p className="font-medium text-gray-900">{project}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Build this to strengthen your portfolio
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Path Timeline */}
            <LearningPathTimeline recommendations={recommendation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
