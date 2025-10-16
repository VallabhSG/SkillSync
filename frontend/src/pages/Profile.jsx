import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../services/api";
import ResumeUploader from "../components/ResumeUploader";
import { toast } from "react-toastify";
import { FiUser, FiBriefcase, FiTarget, FiStar } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    educationLevel: "",
    careerGoal: "",
    interests: "",
    yearsOfExperience: 0,
    skills: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await profileAPI.getProfile(user.userId);
      const profile = response.data;
      setFormData({
        fullName: profile.fullName || "",
        educationLevel: profile.educationLevel || "",
        careerGoal: profile.careerGoal || "",
        interests: profile.interests || "",
        yearsOfExperience: profile.yearsOfExperience || 0,
        skills: profile.skills?.join(", ") || "",
      });
    } catch (error) {
      console.log("No profile found, creating new one");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeExtracted = (extractedData) => {
    const updates = {};

    if (extractedData.name && extractedData.name.trim()) {
      updates.fullName = extractedData.name.trim();
    }

    if (extractedData.skills && extractedData.skills.length > 0) {
      updates.skills = extractedData.skills.join(", ");
    }

    if (extractedData.yearsOfExperience > 0) {
      updates.yearsOfExperience = extractedData.yearsOfExperience;
    }

    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));

    if (Object.keys(updates).length > 0) {
      toast.success(
        `Extracted ${Object.keys(updates).length} field(s) from resume!`,
        {
          position: "top-right",
        },
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const profileData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      };

      await profileAPI.createOrUpdateProfile(user.userId, profileData);
      toast.success("Profile saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save profile", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            Build Your Profile
          </h1>
          <p className="text-white/80 text-center mb-8">
            Upload your resume or fill in the details manually
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card-gradient sticky top-8">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                <FiUser className="mr-2 text-primary-600" />
                Quick Start
              </h2>
              <ResumeUploader onResumeExtracted={handleResumeExtracted} />

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  💡 Pro Tips:
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Upload your latest resume</li>
                  <li>• Add all your technical skills</li>
                  <li>• Be specific about your goals</li>
                  <li>• Keep your profile updated</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Profile Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="card-gradient space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiUser className="mr-2 text-primary-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="input-field"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="educationLevel"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Education Level
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    className="input-field"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Bootcamp/Certificate">
                      Bootcamp/Certificate
                    </option>
                    <option value="Self-Taught">Self-Taught</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="yearsOfExperience"
                    className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  >
                    <FiBriefcase className="mr-2 text-primary-600" />
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    className="input-field"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="careerGoal"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiTarget className="mr-2 text-primary-600" />
                  Career Goal
                </label>
                <textarea
                  id="careerGoal"
                  name="careerGoal"
                  rows="3"
                  className="input-field"
                  value={formData.careerGoal}
                  onChange={handleChange}
                  placeholder="e.g., Become a Full Stack Developer at a leading tech company"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="interests"
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                >
                  <FiStar className="mr-2 text-primary-600" />
                  Interests
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  rows="3"
                  className="input-field"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g., Web Development, Cloud Computing, Machine Learning, Mobile Development"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Current Skills (comma-separated)
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows="4"
                  className="input-field"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., Java, Python, JavaScript, React, Spring Boot, SQL, Docker, Git"
                  required
                />
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  💡 Add as many skills as you have - this helps generate better
                  recommendations
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                {saving ? (
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
                    Saving Profile...
                  </span>
                ) : (
                  "💾 Save Profile"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
