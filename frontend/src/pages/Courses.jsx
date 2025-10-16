import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { courseAPI } from "../services/api";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";
import { FiFilter, FiSearch } from "react-icons/fi";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = [
    "All",
    "Programming",
    "Web Development",
    "Backend",
    "Frontend",
    "Full Stack",
    "Database",
    "DevOps",
    "Cloud",
    "AI/ML",
    "Tools",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const loadCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (err) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) =>
          course.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (selectedLevel !== "All") {
      filtered = filtered.filter(
        (course) =>
          course.difficultyLevel?.toLowerCase() === selectedLevel.toLowerCase(),
      );
    }

    setFilteredCourses(filtered);
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
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Curated courses from top platforms to accelerate your learning
            journey
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-gradient mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FiFilter className="mr-2" />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLevel === level
                        ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing{" "}
            <span className="font-bold text-primary-600">
              {filteredCourses.length}
            </span>{" "}
            of {courses.length} courses
          </div>
        </motion.div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-gradient text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Courses Found
            </h2>
            <p className="text-gray-600">
              Try adjusting your filters or search term
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
        >
          <div className="card-gradient text-center">
            <div className="text-4xl font-bold text-primary-600">
              {courses.length}
            </div>
            <p className="text-gray-600 mt-2">Total Courses</p>
          </div>
          <div className="card-gradient text-center">
            <div className="text-4xl font-bold text-green-600">
              {courses.filter((c) => c.isFree).length}
            </div>
            <p className="text-gray-600 mt-2">Free Courses</p>
          </div>
          <div className="card-gradient text-center">
            <div className="text-4xl font-bold text-purple-600">
              {new Set(courses.map((c) => c.provider)).size}
            </div>
            <p className="text-gray-600 mt-2">Platforms</p>
          </div>
          <div className="card-gradient text-center">
            <div className="text-4xl font-bold text-orange-600">4.7</div>
            <p className="text-gray-600 mt-2">Avg Rating</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
