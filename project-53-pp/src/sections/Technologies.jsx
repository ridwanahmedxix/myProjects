import { motion } from 'framer-motion';
import { Code, Database, Server, GitBranch, Palette, Smartphone } from 'lucide-react';

const Technologies = () => {
  const technologies = [
    { name: 'React', icon: Code },
    { name: 'Next.js', icon: Server },
    { name: 'TypeScript', icon: Code },
    { name: 'Node.js', icon: Server },
    { name: 'MongoDB', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Tailwind CSS', icon: Palette },
    { name: 'Git', icon: GitBranch },
    { name: 'Docker', icon: Server },
    { name: 'React Native', icon: Smartphone },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Technologies I worked with
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300"
            >
              <tech.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-white font-semibold">{tech.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;