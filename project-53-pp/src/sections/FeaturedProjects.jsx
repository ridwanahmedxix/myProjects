import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink } from 'lucide-react';

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB.',
      tags: ['React', 'Node.js', 'MongoDB'],
      stars: 45,
      forks: 12,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates.',
      tags: ['Next.js', 'TypeScript', 'Socket.io'],
      stars: 32,
      forks: 8,
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts.',
      tags: ['React', 'Tailwind', 'API'],
      stars: 28,
      forks: 15,
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations and responsive design.',
      tags: ['React', 'Framer Motion', 'Tailwind'],
      stars: 67,
      forks: 23,
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform">
            View Full GitHub Profile
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;