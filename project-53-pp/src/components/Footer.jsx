import { motion } from 'framer-motion';
import { GitBranch, Briefcase, MessageSquare, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
    { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: MessageSquare, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:email@example.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Ankit Jha</h3>
          <p className="text-gray-400 mb-8">Building the future, one line of code at a time.</p>

          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <div className="text-gray-500 text-sm mb-4">
            © 2024 Ankit Jha. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>using React & Vite</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;