import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FiTarget,
  FiBook,
  FiTrendingUp,
  FiAward,
  FiZap,
  FiUsers,
} from "react-icons/fi";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: <FiTarget className="text-4xl" />,
      title: "AI-Powered Recommendations",
      description:
        "Get personalized job role suggestions based on your skills, experience, and career goals",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiBook className="text-4xl" />,
      title: "Curated Learning Paths",
      description:
        "Access hand-picked courses from top platforms like Udemy, Coursera, and more",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiTrendingUp className="text-4xl" />,
      title: "Skill Gap Analysis",
      description:
        "Identify missing skills and get a clear roadmap to achieve your career goals",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiAward className="text-4xl" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with achievements and milestone tracking",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FiZap className="text-4xl" />,
      title: "Resume Analysis",
      description:
        "Upload your resume and let AI extract your skills and experience automatically",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FiUsers className="text-4xl" />,
      title: "Career Insights",
      description:
        "Get detailed insights about job market trends and in-demand skills",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-7xl md:text-8xl font-black mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                SkillSync
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your AI-Powered Career Companion
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Transform your career with personalized AI recommendations,
              curated learning paths, and real-time skill gap analysis
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
                >
                  Go to Dashboard →
                </motion.button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Get Started Free ✨
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-white/30 hover:border-white/50 transition-all"
                  >
                    Sign In
                  </motion.button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-6 backdrop-blur-lg"
              >
                <div className="text-4xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="card-gradient group cursor-pointer overflow-hidden relative"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div
                  className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div variants={itemVariants} className="mt-32 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Create Profile",
                desc: "Sign up and build your professional profile or upload your resume",
                icon: "📝",
              },
              {
                step: "2",
                title: "AI Analysis",
                desc: "Our AI analyzes your skills and career goals",
                icon: "🤖",
              },
              {
                step: "3",
                title: "Get Recommendations",
                desc: "Receive personalized career paths and learning resources",
                icon: "🎯",
              },
              {
                step: "4",
                title: "Start Learning",
                desc: "Follow your custom roadmap and track your progress",
                icon: "🚀",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="text-6xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <div className="bg-white text-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-32 text-center max-w-4xl mx-auto card-gradient"
        >
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who are already using SkillSync to
            accelerate their career growth
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-xl px-12 py-5"
              >
                Start Your Journey Today 🚀
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
