import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">Let’s build something together</p>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to start your next project?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            I’m available for freelance work, collaborations, and product design systems. Reach out and let’s create an exceptional web experience.
          </p>
          <a
            href="mailto:email@example.com"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform"
          >
            <Mail className="w-5 h-5" />
            Email Me
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;