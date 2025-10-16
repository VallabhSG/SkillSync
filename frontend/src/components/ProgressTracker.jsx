import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';

const ProgressTracker = ({ currentSkills = [], requiredSkills = [], recommendations }) => {
  const totalRequired = requiredSkills.length;
  const acquired = currentSkills.filter(skill => requiredSkills.includes(skill)).length;
  const progressPercentage = totalRequired > 0 ? Math.round((acquired / totalRequired) * 100) : 0;

  const achievements = [
    { id: 1, title: 'Profile Created', icon: '✓', earned: true, color: 'text-green-500' },
    { id: 2, title: 'First Recommendation', icon: '🎯', earned: !!recommendations, color: 'text-blue-500' },
    { id: 3, title: 'Skill Master', icon: '🏆', earned: currentSkills.length >= 5, color: 'text-yellow-500' },
    { id: 4, title: 'Career Ready', icon: '🚀', earned: progressPercentage >= 70, color: 'text-purple-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Progress Circle */}
      <div className="card-gradient">
        <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center">
          <FiTrendingUp className="mr-2" />
          Career Progress
        </h3>

        <div className="flex justify-center mb-6">
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
              value={progressPercentage}
              text={`${progressPercentage}%`}
              styles={buildStyles({
                textColor: '#667eea',
                pathColor: '#667eea',
                trailColor: '#e5e7eb',
                textSize: '24px',
                pathTransitionDuration: 1.5,
              })}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-blue-600">{currentSkills.length}</p>
            <p className="text-sm text-gray-600 mt-1">Current Skills</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-purple-600">{requiredSkills.length}</p>
            <p className="text-sm text-gray-600 mt-1">Required Skills</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-3xl font-bold text-green-600">{acquired}</p>
            <p className="text-sm text-gray-600 mt-1">Acquired</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card-gradient">
        <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center">
          <FiAward className="mr-2" />
          Achievements
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-40'}`}>
                  {achievement.icon}
                </span>
                <div>
                  <p className={`font-medium ${achievement.earned ? achievement.color : 'text-gray-400'}`}>
                    {achievement.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {achievement.earned ? 'Unlocked!' : 'Locked'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="card-gradient">
        <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center">
          <FiTarget className="mr-2" />
          Next Steps
        </h3>

        <div className="space-y-3">
          {progressPercentage < 100 && requiredSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-medium text-blue-900">Learn Missing Skills</p>
                <p className="text-sm text-blue-700">
                  Focus on {requiredSkills.length - acquired} remaining skills to reach your goal
                </p>
              </div>
            </motion.div>
          )}

          {!recommendations && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg"
            >
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-medium text-purple-900">Get AI Recommendations</p>
                <p className="text-sm text-purple-700">
                  Generate personalized career path recommendations
                </p>
              </div>
            </motion.div>
          )}

          {currentSkills.length < 5 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"
            >
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-medium text-green-900">Update Your Profile</p>
                <p className="text-sm text-green-700">
                  Add more skills to get better recommendations
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
