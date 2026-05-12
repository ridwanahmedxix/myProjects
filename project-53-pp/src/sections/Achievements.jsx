import { motion } from 'framer-motion';
import { Star, GitFork, Users, Code, Trophy } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { label: 'Stars Earned', value: '150+', icon: Star, color: 'text-yellow-400' },
    { label: 'Repositories', value: '25+', icon: GitFork, color: 'text-purple-400' },
    { label: 'Followers', value: '89+', icon: Users, color: 'text-blue-400' },
    { label: 'Forks Received', value: '45+', icon: GitFork, color: 'text-green-400' },
    { label: 'Languages Used', value: '8+', icon: Code, color: 'text-cyan-400' },
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Unlocked Milestones
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300"
            >
              <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-white mb-2">{achievement.value}</div>
              <div className="text-gray-300 text-sm">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;