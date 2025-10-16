import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const SkillGapChart = ({ currentSkills = [], requiredSkills = [] }) => {
  // Combine and create data for radar chart
  const allSkills = [...new Set([...currentSkills, ...requiredSkills])];

  const data = allSkills.slice(0, 8).map(skill => ({
    skill: skill,
    current: currentSkills.includes(skill) ? 100 : 0,
    required: requiredSkills.includes(skill) ? 100 : 0,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card-gradient"
    >
      <h3 className="text-2xl font-bold mb-6 gradient-text">Skill Gap Analysis</h3>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
          <Radar
            name="Your Skills"
            dataKey="current"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.6}
          />
          <Radar
            name="Required Skills"
            dataKey="required"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>

      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Your Skills</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Required Skills</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillGapChart;
