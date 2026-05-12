import { motion } from 'framer-motion';
import { Eye, Users, Star, GitFork, Flame, Calendar } from 'lucide-react';

const GitHubStats = () => {
  const stats = [
    { label: 'Repositories', value: '25', icon: GitFork },
    { label: 'Stars', value: '150', icon: Star },
    { label: 'Followers', value: '89', icon: Users },
    { label: 'Forks', value: '45', icon: GitFork },
  ];

  const languages = [
    { name: 'JavaScript', percentage: 70, color: 'bg-yellow-400' },
    { name: 'TypeScript', percentage: 60, color: 'bg-blue-400' },
    { name: 'Python', percentage: 50, color: 'bg-green-400' },
    { name: 'CSS', percentage: 40, color: 'bg-purple-400' },
  ];

  // Generate activity heatmap (simplified)
  const activityDays = Array.from({ length: 365 }, (_, i) => ({
    date: i,
    level: Math.floor(Math.random() * 5), // 0-4
  }));

  return (
    <section id="github-stats" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Code, Commits & Craft
        </motion.h2>

        {/* Top badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            <span className="text-white">1.2K Profile Views</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white">89 Followers</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white">150 Stars</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <stat.icon className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Additional stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-gray-400 text-sm">Total Contributions</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-purple-400 border-t-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">12</div>
                </div>
                <div className="text-gray-400 text-sm">Current Streak</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-gray-400 text-sm">Longest Streak</div>
              </div>
            </motion.div>
          </div>

          {/* GitHub stats card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-white font-semibold mb-4">GitHub Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Most Used Language</span>
                <span className="text-white">JavaScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Commits</span>
                <span className="text-white">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lines of Code</span>
                <span className="text-white">45K+</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity and Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Activity Heatmap */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Contribution Activity
            </h3>
            <div className="grid grid-flow-col auto-cols-[6px] gap-1">
              {activityDays.slice(0, 357).map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    day.level === 0 ? 'bg-gray-700' :
                    day.level === 1 ? 'bg-green-900' :
                    day.level === 2 ? 'bg-green-700' :
                    day.level === 3 ? 'bg-green-500' :
                    'bg-green-300'
                  }`}
                  title={`${day.level} contributions`}
                ></div>
              ))}
            </div>
          </div>

          {/* Top Languages */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">Top Languages</h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 text-sm">{lang.name}</span>
                    <span className="text-gray-400 text-sm">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${lang.color}`}
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;