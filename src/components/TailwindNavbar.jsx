import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Testimoni', href: '#testimonials' },
  { name: 'Kontak', href: '#contact' },
];

const TailwindNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }
      });

      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center space-x-2"
          whileHover={{
            rotateX: 10,
            rotateY: 10,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-extrabold">A</span>
          </motion.div>
          <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Arvan.dev
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`relative uppercase tracking-wide text-sm ${
                activeSection === link.href.substring(1)
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ y: -2 }}
            >
              {link.name}
              <motion.span
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 ${
                  activeSection === link.href.substring(1) ? 'scale-x-100' : ''
                }`}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Tombol Close di atas */}
            <motion.button
              className="absolute top-5 right-5 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Links Menu */}
            <motion.div
              className="flex flex-col space-y-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`text-lg uppercase tracking-wider ${
                    activeSection === link.href.substring(1)
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsOpen(false)}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TailwindNavbar;
