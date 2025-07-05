import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Brush, Cherry, Mountain } from 'lucide-react';

const NAMA_VARIASI = [
  { text: 'Arvan Yudhistia Ardana', lang: 'ID', meaning: 'Developer' },
  { text: 'アルヴァン ユディスティア', lang: 'JP', meaning: 'デベロッパー' },
  { text: '阿尔凡 尤迪斯提亚', lang: 'CN', meaning: '开发者' },
  { text: '아르반 유디스티아', lang: 'KR', meaning: '개발자' }
];

// Kecepatan mengetik dan menghapus yang lebih natural
const TYPING_SPEED = 150;
const DELETING_SPEED = 100;
const PAUSE_TIME = 2000;

const CustomHero = () => {
  // ---------------------------
  // STATE MANAGEMENT
  // ---------------------------
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedName, setTypedName] = useState('');
  const [phase, setPhase] = useState('typing');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inkDrops, setInkDrops] = useState([]);
  
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);
  
  // Smooth spring animation untuk parallax
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  // ---------------------------
  // TYPEWRITER EFFECT
  // ---------------------------
  useEffect(() => {
    const handleType = () => {
      const currentString = NAMA_VARIASI[currentIndex];

      if (phase === 'typing') {
        const nextChar = currentString.text.slice(0, typedName.length + 1);
        if (nextChar === typedName) {
          setPhase('pausing');
          return;
        }
        setTypedName(nextChar);
      } else if (phase === 'deleting') {
        if (typedName.length > 0) {
          setTypedName((prev) => prev.slice(0, -1));
        } else {
          setCurrentIndex((prev) => (prev + 1) % NAMA_VARIASI.length);
          setPhase('typing');
        }
      }
    };

    let activeSpeed = phase === 'typing' ? TYPING_SPEED : DELETING_SPEED;
    if (phase === 'pausing') activeSpeed = PAUSE_TIME;

    const timeout = setTimeout(() => {
      if (phase === 'pausing') {
        setPhase('deleting');
      } else {
        handleType();
      }
    }, activeSpeed);

    return () => clearTimeout(timeout);
  }, [typedName, phase, currentIndex]);

  // ---------------------------
  // MOUSE INTERACTIONS
  // ---------------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
        springX.set(x * 30);
        springY.set(y * 30);
      }
    };

    const handleMouseClick = (e) => {
      // Create ink drop effect on click
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const newDrop = {
          id: Date.now(),
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setInkDrops(prev => [...prev, newDrop]);
        
        // Remove ink drop after animation
        setTimeout(() => {
          setInkDrops(prev => prev.filter(drop => drop.id !== newDrop.id));
        }, 3000);
      }
    };

    const node = heroRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('click', handleMouseClick);
    }

    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('click', handleMouseClick);
      }
    };
  }, [springX, springY]);

  // ---------------------------
  // FLOATING ELEMENTS GENERATOR
  // ---------------------------
  const generateFloatingElements = () => {
    const elements = [];
    for (let i = 0; i < 8; i++) {
      elements.push(
        <motion.div
          key={i}
          className="absolute opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            x: springX,
            y: springY,
          }}
        >
          {i % 3 === 0 ? (
            <Cherry className="text-copper-400" size={Math.random() * 20 + 15} />
          ) : i % 3 === 1 ? (
            <Mountain className="text-earth-500" size={Math.random() * 15 + 10} />
          ) : (
            <Brush className="text-gold-500" size={Math.random() * 18 + 12} />
          )}
        </motion.div>
      );
    }
    return elements;
  };

  const currentLanguage = NAMA_VARIASI[currentIndex];

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-crosshair"
      style={{ opacity, scale }}
    >
      {/* Washi Paper Background with Texture */}
      <div className="absolute inset-0 bg-zen-gradient">
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 bg-washi-texture opacity-30" />
        
        {/* Gradient Orbs with Parallax */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-earth-200/40 to-gold-200/30 rounded-full blur-3xl"
          style={{
            x: springX,
            y: springY,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-copper-200/40 to-stone-200/30 rounded-full blur-3xl"
          style={{
            x: useTransform(springX, x => x * -0.5),
            y: useTransform(springY, y => y * -0.5),
          }}
        />
      </div>

      {/* Floating Zen Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {generateFloatingElements()}
      </div>

      {/* Ink Drops */}
      {inkDrops.map(drop => (
        <motion.div
          key={drop.id}
          className="ink-drop pointer-events-none"
          style={{
            left: drop.x - 20,
            top: drop.y - 20,
            width: 40,
            height: 40,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Language Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full backdrop-paper border border-stone-300/50 mb-8 zen-card"
            whileHover={{ scale: 1.05 }}
            layout
          >
            <span className="w-2 h-2 bg-gradient-to-r from-gold-400 to-copper-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-medium text-stone-600 mr-2">{currentLanguage.lang}</span>
            <span className="text-xs text-stone-500 border-l border-stone-300 pl-2 ml-2">
              {currentLanguage.meaning}
            </span>
          </motion.div>
        </motion.div>

        {/* Main Title with Magnetic Effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 calligraphy-heading text-shadow-warm leading-tight">
            <motion.span
              className="magnetic-text inline-block"
              animate={{
                x: mousePosition.x * 5,
                y: mousePosition.y * 5,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              {typedName}
            </motion.span>
            <motion.span
              className="inline-block w-1 bg-gold-500 ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              style={{ height: '0.8em' }}
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Results-driven{' '}
          <span className="calligraphy-heading">Mobile Developer</span> with proven expertise in{' '}
          <span className="calligraphy-heading">Flutter & Android</span> development. 
          Creating user-centric solutions that combine innovation with seamless experience
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="group brush-btn relative z-10"
            whileHover={{ 
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Brush className="w-5 h-5" />
              <span>Lihat Karya</span>
            </span>
          </motion.a>
          
          <motion.a
            href="#contact"
            className="group flex items-center space-x-2 px-8 py-4 border-2 border-stone-400 text-stone-700 font-medium rounded-full zen-transition hover:border-earth-500 hover:text-earth-700 hover-lift"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Berkolaborasi</span>
            <motion.div
              className="w-5 h-5"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-gold-500 to-copper-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Brush Strokes */}
      <svg
        className="absolute top-20 right-20 w-32 h-32 text-gold-400 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <motion.path
          d="M10,50 Q30,20 50,50 T90,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="animate-calligraphy"
        />
      </svg>
      
      <svg
        className="absolute bottom-20 left-20 w-24 h-24 text-copper-400 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="animate-calligraphy"
        />
      </svg>
    </motion.section>
  );
};

export default CustomHero;
