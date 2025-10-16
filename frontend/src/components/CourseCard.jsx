import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiStar,
  FiClock,
  FiBookmark,
  FiCheck,
  FiSearch,
} from "react-icons/fi";
import { SiUdemy, SiCoursera, SiYoutube } from "react-icons/si";

const CourseCard = ({ course, index }) => {
  const getProviderIcon = (provider) => {
    const lowerProvider = provider?.toLowerCase() || "";
    if (lowerProvider.includes("udemy")) return <SiUdemy className="text-xl" />;
    if (lowerProvider.includes("coursera"))
      return <SiCoursera className="text-xl" />;
    if (lowerProvider.includes("youtube"))
      return <SiYoutube className="text-xl" />;
    return <FiBookmark className="text-xl" />;
  };

  const getDifficultyColor = (level) => {
    const lowerLevel = level?.toLowerCase() || "";
    if (lowerLevel.includes("beginner")) return "bg-green-100 text-green-700";
    if (lowerLevel.includes("intermediate"))
      return "bg-yellow-100 text-yellow-700";
    if (lowerLevel.includes("advanced")) return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card group cursor-pointer overflow-hidden"
    >
      {/* Header with gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-purple-500" />

      <div className="relative">
        {/* Free Badge */}
        {course.isFree && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            FREE
          </motion.div>
        )}

        {/* Provider Icon */}
        <div className="flex items-center space-x-2 mb-4 text-gray-600">
          {getProviderIcon(course.provider)}
          <span className="text-sm font-medium">{course.provider}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`badge ${getDifficultyColor(course.difficultyLevel)}`}
          >
            {course.difficultyLevel}
          </span>
          {course.category && (
            <span className="badge-primary">{course.category}</span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {course.rating && (
              <div className="flex items-center space-x-1">
                <FiStar className="text-yellow-500 fill-current" />
                <span className="font-medium text-gray-700">
                  {course.rating}
                </span>
              </div>
            )}
            {course.estimatedDuration && (
              <div className="flex items-center space-x-1">
                <FiClock className="text-gray-400" />
                <span>{course.estimatedDuration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {course.courseUrl && course.courseUrl.trim() !== "" ? (
          <a
            href={course.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <span>View Course</span>
              <FiExternalLink />
            </motion.button>
          </a>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Generate search URL based on course title and provider
              const searchQuery = encodeURIComponent(
                `${course.title} ${course.provider || "online course"}`,
              );
              const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
              window.open(searchUrl, "_blank");
            }}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <FiSearch />
            <span>Search Course</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
