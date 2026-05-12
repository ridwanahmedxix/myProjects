import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://via.placeholder.com/400x400?text=About+Image"
                alt="About"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-white/20"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                2+ Years Experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate full-stack developer with expertise in modern web technologies.
                I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
                With a strong foundation in both frontend and backend development, I bring ideas to life through code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2+</div>
                <div className="text-gray-400 text-sm">Internships</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <GraduationCap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-gray-400 text-sm">Certificates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;