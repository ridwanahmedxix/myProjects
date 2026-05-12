import { motion } from 'framer-motion';
import { ChevronRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Ankit Jha</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Full Stack Developer passionate about creating amazing web experiences.
          </p>
          <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">React</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Node.js</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">TypeScript</span>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform flex items-center">
              Read My Story <ChevronRight className="ml-2" size={20} />
            </button>
            <button className="px-6 py-3 border border-white/20 text-white rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors flex items-center">
              <Download className="mr-2" size={20} /> Resume
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse"></div>
            <img src="https://via.placeholder.com/320x320?text=Profile" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white/20" />
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-spin" style={{ animationDuration: '10s' }}></div>
            <div className="absolute inset-4 rounded-full border border-blue-400/50 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          </div>
          {/* Floating dots */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;