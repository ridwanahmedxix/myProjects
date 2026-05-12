import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: 'Frontend Developer Intern',
      company: 'TechNova Labs',
      date: '2023 - 2024',
      description: 'Built UI components and optimized performance for customer-facing dashboards.',
      icon: Briefcase,
    },
    {
      role: 'Open Source Contributor',
      company: 'OpenDev Community',
      date: '2022 - Present',
      description: 'Improved developer tooling, documentation, and contributed fixes across projects.',
      icon: Calendar,
    },
    {
      role: 'Freelance Full Stack Developer',
      company: 'Remote Clients',
      date: '2021 - Present',
      description: 'Delivered scalable web applications with React, Node.js, and cloud services.',
      icon: Award,
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Experience
        </motion.h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {experiences.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:shadow-2xl hover:shadow-violet-500/20 transition-shadow"
            >
              <item.icon className="w-10 h-10 text-purple-400 mb-5" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.role}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.company}</p>
              <div className="text-sm text-gray-300 mb-4">{item.description}</div>
              <div className="text-xs text-purple-300 uppercase tracking-[0.2em]">{item.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;