import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cherry } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', kanji: '家' },
  { name: 'Karya', href: '#projects', kanji: '作' },
  { name: 'Keahlian', href: '#skills', kanji: '技' },
  { name: 'Testimoni', href: '#testimonials', kanji: '声' },
  { name: 'Kontak', href: '#contact', kanji: '連' },
];

const TailwindNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 zen-transition ${
        scrolled
          ? 'backdrop-paper border-b border-stone-300/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 sm:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo dengan Japanese influence */}
        <motion.a
          href="#home"
          className="flex items-center space-x-3 group"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative"
            animate={{
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-copper-600 rounded-full flex items-center justify-center shadow-lg zen-card">
              <motion.span 
                className="text-white font-bold text-lg font-display"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                道
              </motion.span>
            </div>
            
            {/* Decorative ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold-400/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ scale: 1.2 }}
            />
          </motion.div>
          
          <div className="flex flex-col">
            <span className="text-lg font-display font-semibold calligraphy-heading">
              Arvan.dev
            </span>
            <span className="text-xs text-stone-500 font-light tracking-wider">
              アルヴァン
            </span>
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`relative group flex flex-col items-center zen-transition ${
                activeSection === link.href.substring(1)
                  ? 'text-earth-700'
                  : 'text-stone-600 hover:text-earth-600'
              }`}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {/* Kanji character */}
              <span className="text-sm font-display mb-1 opacity-60 group-hover:opacity-100 zen-transition">
                {link.kanji}
              </span>
              
              {/* Link text */}
              <span className="text-sm font-medium tracking-wide uppercase">
                {link.name}
              </span>

              {/* Active indicator */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={false}
                animate={{
                  scale: activeSection === link.href.substring(1) ? 1 : 0,
                  opacity: activeSection === link.href.substring(1) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1 h-1 bg-gradient-to-r from-gold-500 to-copper-500 rounded-full" />
              </motion.div>

              {/* Hover effect */}
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400/50 to-copper-500/50 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative zen-card p-3 text-stone-600 hover:text-earth-600"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 backdrop-paper backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-gold-200/20 to-copper-200/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-earth-200/20 to-stone-200/20 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Close button */}
            <motion.button
              className="absolute top-8 right-8 zen-card p-3 text-stone-600 hover:text-earth-600"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X size={20} />
            </motion.button>

            {/* Menu Items */}
            <motion.div
              className="flex flex-col space-y-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`group flex flex-col items-center zen-transition ${
                    activeSection === link.href.substring(1)
                      ? 'text-earth-700'
                      : 'text-stone-600'
                  }`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {/* Large kanji for mobile */}
                  <motion.span 
                    className="text-3xl font-display mb-2 calligraphy-heading"
                    whileHover={{ scale: 1.2 }}
                  >
                    {link.kanji}
                  </motion.span>
                  
                  {/* Link text */}
                  <span className="text-lg font-medium tracking-wider uppercase">
                    {link.name}
                  </span>
                  
                  {/* Decorative line */}
                  <motion.div
                    className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              className="absolute bottom-8 flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Cherry className="w-4 h-4 text-copper-400" />
              <span className="text-xs text-stone-500 font-light">
                道を究める • Mastering the Way
              </span>
              <Cherry className="w-4 h-4 text-copper-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TailwindNavbar;
