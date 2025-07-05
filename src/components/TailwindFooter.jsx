import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Heart, 
  ArrowUp,
  Cherry,
  Mountain,
  Code
} from 'lucide-react';

const TailwindFooter = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/arvardy184',
      color: 'hover:text-stone-700',
      kanji: '技'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/arvanardana',
      color: 'hover:text-earth-600',
      kanji: '繋'
    },
    {
      name: 'Portfolio',
      icon: Twitter,
      href: 'https://arvardy.netlify.app',
      color: 'hover:text-gold-600',
      kanji: '作'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/arvard.y',
      color: 'hover:text-copper-600',
      kanji: '美'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:arvanardana1@gmail.com',
      color: 'hover:text-stone-800',
      kanji: '手'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home', kanji: '家' },
    { name: 'Karya', href: '#projects', kanji: '作' },
    { name: 'Keahlian', href: '#skills', kanji: '技' },
    { name: 'Testimoni', href: '#testimonials', kanji: '声' },
    { name: 'Kontak', href: '#contact', kanji: '連' }
  ];

  const skills = ['React', 'Node.js', 'Flutter', 'Next.js', 'TypeScript'];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-washi-pearl border-t border-stone-200 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Zen waves */}
        <motion.svg
          className="absolute bottom-0 left-0 w-full h-32 text-stone-300 opacity-20"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          animate={{ 
            scaleY: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100 L1000,200 L0,200 Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 3 }}
          />
        </motion.svg>

        {/* Floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 200,
            }}
            animate={{
              y: [null, Math.random() * 200],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {i % 3 === 0 ? (
              <Cherry className="text-copper-400" size={Math.random() * 12 + 8} />
            ) : i % 3 === 1 ? (
              <Mountain className="text-earth-400" size={Math.random() * 10 + 6} />
            ) : (
              <Code className="text-gold-400" size={Math.random() * 14 + 10} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-copper-600 rounded-full flex items-center justify-center shadow-lg">
                <motion.span 
                  className="text-white font-bold text-xl font-display"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  道
                </motion.span>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold calligraphy-heading">
                  Arvan.dev
                </h3>
                <p className="text-sm text-stone-500 font-light">
                  アルヴァン • Developer
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-6 max-w-md">
              Menghadirkan solusi digital yang{' '}
              <span className="calligraphy-heading">artistik</span> dan{' '}
              <span className="calligraphy-heading">bermakna</span> dengan 
              menggabungkan teknologi modern dan filosofi tradisional.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-stone-100 text-stone-700 text-xs rounded-full font-medium border border-stone-200 hover:border-earth-300 zen-transition"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              className="border-l-4 border-gold-400 pl-4 italic text-stone-600"
              variants={itemVariants}
            >
              "継続は力なり" - <span className="calligraphy-heading">Kontinuitas adalah kekuatan</span>
            </motion.blockquote>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-display font-semibold calligraphy-heading mb-6">
              Navigasi
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center space-x-3 text-stone-600 hover:text-earth-700 zen-transition"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-display opacity-60 group-hover:opacity-100 zen-transition">
                    {link.kanji}
                  </span>
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-display font-semibold calligraphy-heading mb-6">
              Terhubung
            </h4>
            <div className="space-y-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center space-x-3 text-stone-600 ${social.color} zen-transition`}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <IconComponent className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 text-xs font-display opacity-50 group-hover:opacity-100 zen-transition">
                        {social.kanji}
                      </span>
                    </div>
                    <span className="text-sm">{social.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="bamboo-divider my-12"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Copyright */}
          <motion.div
            className="flex items-center space-x-2 text-stone-600"
            variants={itemVariants}
          >
            <span className="text-sm">
              © {new Date().getFullYear()} Arvan Yudhistia Ardana
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              •
            </motion.span>
            <span className="text-sm flex items-center space-x-1">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-copper-500 fill-current" />
              </motion.div>
              <span>and Zen</span>
            </span>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 zen-card hover:shadow-lg zen-transition"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm text-stone-600 group-hover:text-earth-700 zen-transition">
              Back to Top
            </span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4 text-stone-600 group-hover:text-earth-700 zen-transition" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Final Zen Quote */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="inline-flex items-center space-x-4 zen-card px-6 py-3">
            <Cherry className="w-5 h-5 text-copper-500" />
            <span className="text-stone-600 font-medium text-sm">
              "完璧な不完全" - <span className="calligraphy-heading">Perfect Imperfection</span>
            </span>
            <Cherry className="w-5 h-5 text-copper-500" />
          </div>
        </motion.div>
      </div>

      {/* Brush stroke decoration */}
      <motion.svg
        className="absolute bottom-0 right-20 w-32 h-24 text-gold-300 opacity-20 pointer-events-none"
        viewBox="0 0 150 100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.path
          d="M20,80 Q50,20 80,50 Q110,80 140,20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2, duration: 2 }}
        />
      </motion.svg>
    </footer>
  );
};

export default TailwindFooter;