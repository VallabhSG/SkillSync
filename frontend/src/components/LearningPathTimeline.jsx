import { motion } from 'framer-motion';
import { FiCheckCircle, FiCircle, FiArrowRight } from 'react-icons/fi';

const LearningPathTimeline = ({ recommendations }) => {
  if (!recommendations) return null;

  const timelineSteps = [
    {
      phase: 'Foundation',
      duration: '1-2 months',
      skills: recommendations.missingSkills?.slice(0, 2) || [],
      courses: recommendations.recommendedCourses?.slice(0, 1) || [],
      status: 'current'
    },
    {
      phase: 'Intermediate',
      duration: '2-3 months',
      skills: recommendations.missingSkills?.slice(2, 4) || [],
      courses: recommendations.recommendedCourses?.slice(1, 2) || [],
      status: 'upcoming'
    },
    {
      phase: 'Advanced',
      duration: '3-4 months',
      skills: recommendations.missingSkills?.slice(4) || [],
      courses: recommendations.recommendedCourses?.slice(2) || [],
      status: 'upcoming'
    },
    {
      phase: 'Job Ready',
      duration: 'Ongoing',
      skills: ['Portfolio Projects', 'Interview Prep'],
      courses: recommendations.projectIdeas?.slice(0, 2) || [],
      status: 'future'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-purple-500';
      case 'future':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-gradient"
    >
      <h3 className="text-2xl font-bold mb-8 gradient-text">Your Learning Path</h3>

      <div className="space-y-8">
        {timelineSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Timeline line */}
            {index < timelineSteps.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary-400 to-purple-400 -z-10" />
            )}

            <div className="flex items-start space-x-4">
              {/* Timeline dot */}
              <div className={`w-12 h-12 rounded-full ${getStatusColor(step.status)} flex items-center justify-center flex-shrink-0`}>
                {step.status === 'current' ? (
                  <FiArrowRight className="text-white text-xl" />
                ) : step.status === 'completed' ? (
                  <FiCheckCircle className="text-white text-xl" />
                ) : (
                  <FiCircle className="text-white text-xl" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-gray-900">{step.phase}</h4>
                  <span className="badge-primary">{step.duration}</span>
                </div>

                {step.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Skills to Learn:</p>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill, idx) => (
                        <span key={idx} className="badge-success">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {step.courses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Recommended:</p>
                    <ul className="space-y-1">
                      {step.courses.map((course, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-primary-500 mr-2">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningPathTimeline;
