import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Smartphone, Database, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import projectsData from '../data/projectsData';
import skillsData from '../data/skillsData';
import testimonialsData from '../data/testimonialsData';

// Premium Character Reveal with Stagger
const CharacterReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "120%", rotateX: -90 }}
        animate={isInView ? { y: 0, rotateX: 0 } : { y: "120%", rotateX: -90 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
          type: "spring",
          stiffness: 100
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Word Reveal for Premium Typography
const WordReveal = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-4">
          <CharacterReveal delay={i * 0.08}>
            {word}
          </CharacterReveal>
        </span>
      ))}
    </div>
  );
};

// Magnetic 3D Element with Advanced Physics
const MagneticElement = ({ children, strength = 0.4, scale = 1.05 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating Orb with 3D Depth
const FloatingOrb = ({ delay = 0, className = "" }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const AwwwardsPortfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Premium smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom cursor with 3D effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  // Transform values for cursor (must be at top level)
  const cursorCenterX = useTransform(cursorX, (val) => val - 12);
  const cursorCenterY = useTransform(cursorY, (val) => val - 12);
  const cursorTextX = useTransform(cursorX, (val) => val + 20);
  const cursorTextY = useTransform(cursorY, (val) => val + 20);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-stone-50 via-washi-cream to-stone-100 text-stone-900 relative">

      {/* Premium Custom Cursor with Glassmorphism */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorCenterX,
          y: cursorCenterY,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white"
          animate={{
            scale: cursorVariant === "hover" ? 2 : 1,
            opacity: cursorVariant === "hover" ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Cursor Text Follower */}
      {cursorText && (
        <motion.div
          className="fixed pointer-events-none z-50 text-sm font-medium px-4 py-2 bg-stone-900 text-white rounded-full"
          style={{
            x: cursorTextX,
            y: cursorTextY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Ultra-Premium Progress Bar with Gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-600 via-gold-500 to-copper-500 origin-left z-50"
        style={{
          scaleX: smoothProgress,
          boxShadow: "0 0 20px rgba(184, 144, 90, 0.5)"
        }}
      />

      {/* Floating Glassmorphism Navigation */}
      <motion.nav
        className="fixed top-8 right-8 z-40"
        initial={{ opacity: 0, x: 50, rotateY: -30 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl px-8 py-4 border border-white/60 shadow-2xl">
          <div className="flex gap-8">
            <MagneticElement strength={0.3}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursorVariant("hover");
                  setCursorText("GitHub");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
                className="text-stone-700 hover:text-earth-700 transition-all duration-300 hover:scale-110"
              >
                <Github size={22} strokeWidth={1.5} />
              </a>
            </MagneticElement>
            <MagneticElement strength={0.3}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCursorVariant("hover");
                  setCursorText("LinkedIn");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
                className="text-stone-700 hover:text-earth-700 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
            </MagneticElement>
            <MagneticElement strength={0.3}>
              <a
                href="mailto:your@email.com"
                onMouseEnter={() => {
                  setCursorVariant("hover");
                  setCursorText("Email");
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setCursorText("");
                }}
                className="text-stone-700 hover:text-earth-700 transition-all duration-300 hover:scale-110"
              >
                <Mail size={22} strokeWidth={1.5} />
              </a>
            </MagneticElement>
          </div>
        </div>
      </motion.nav>

      {/* Cinematic Hero Section */}
      <CinematicHero setCursorVariant={setCursorVariant} setCursorText={setCursorText} />

      {/* Asymmetric About Section */}
      <AsymmetricAbout />

      {/* Brutalist Projects Grid */}
      <BrutalistProjects setCursorVariant={setCursorVariant} setCursorText={setCursorText} />

      {/* Premium Skills with 3D Cards */}
      <PremiumSkills />

      {/* Floating Testimonials */}
      <FloatingTestimonials />

      {/* Avant-Garde Contact */}
      <AvantGardeContact setCursorVariant={setCursorVariant} setCursorText={setCursorText} />

      {/* Premium Footer */}
      <footer className="relative py-20 border-t border-stone-200/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-100/50" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-stone-500 text-sm font-light tracking-wide">
              © 2024 Arvan Yudhistia Ardana — Crafted with precision & passion
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

// Cinematic Hero Component
const CinematicHero = ({ setCursorVariant, setCursorText }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);

  return (
    <motion.section
      style={{ opacity }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Depth Background with Lighting */}
      <div className="absolute inset-0">
        <FloatingOrb
          delay={0}
          className="top-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-earth-300/40 via-gold-200/30 to-transparent"
        />
        <FloatingOrb
          delay={1.5}
          className="bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-copper-300/40 via-stone-200/30 to-transparent"
        />
        <FloatingOrb
          delay={3}
          className="top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-gold-300/30 via-earth-200/20 to-transparent"
        />
      </div>

      {/* Glassmorphism Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-3xl backdrop-blur-md bg-white/30 border border-white/40 shadow-xl"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div style={{ y, scale }} className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <MagneticElement strength={0.2}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg">
              <Sparkles size={16} className="text-gold-600" />
              <span className="text-sm font-medium text-stone-700 tracking-wide">
                Available for Freelance
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </MagneticElement>
        </motion.div>

        {/* Ultra-Premium Hero Title */}
        <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-display font-bold mb-12 leading-[0.9] tracking-tighter">
          <WordReveal text="Arvan" />
          <br />
          <div className="relative inline-block">
            <WordReveal text="Yudhistia" />
            <motion.div
              className="absolute -right-8 -top-8 w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-copper-500 opacity-60 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </h1>

        {/* Subtitle with Gradient */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-2xl md:text-3xl text-stone-600 max-w-4xl mx-auto mb-16 leading-relaxed font-light tracking-wide"
        >
          Mobile Developer crafting{' '}
          <span className="font-medium bg-gradient-to-r from-earth-600 via-gold-600 to-copper-600 bg-clip-text text-transparent">
            seamless experiences
          </span>
          {' '}through Flutter & Android
        </motion.p>

        {/* Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticElement strength={0.3} scale={1.08}>
            <motion.a
              href="#projects"
              onMouseEnter={() => {
                setCursorVariant("hover");
                setCursorText("View Work");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
              className="group relative px-10 py-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-full font-medium overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-earth-600 to-gold-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </MagneticElement>

          <MagneticElement strength={0.3} scale={1.08}>
            <motion.a
              href="#contact"
              onMouseEnter={() => {
                setCursorVariant("hover");
                setCursorText("Let's Talk");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
              className="px-10 py-5 backdrop-blur-xl bg-white/40 border-2 border-white/60 text-stone-900 rounded-full font-medium hover:bg-white/60 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Scroll Indicator with Animation */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1 h-2 bg-gradient-to-b from-gold-500 to-copper-500 rounded-full"
                animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xs text-stone-500 tracking-widest uppercase">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Asymmetric About Section
const AsymmetricAbout = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={ref} className="py-40 relative overflow-hidden">
      {/* Background Gradient Orb */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gold-200/20 to-transparent rounded-full blur-3xl"
        style={{ x, rotate }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-12 gap-8 items-center">

          {/* Left: Large Number (Brutalist Touch) */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-3"
          >
            <div className="text-[12rem] font-display font-bold text-stone-200 leading-none">
              01
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-white/50 rounded-[3rem] p-12 border border-white/60 shadow-2xl"
            >
              <h2 className="text-6xl md:text-7xl font-display font-bold mb-8 tracking-tight">
                Creating digital
                <br />
                <span className="bg-gradient-to-r from-earth-600 via-gold-600 to-copper-600 bg-clip-text text-transparent">
                  experiences
                </span>
              </h2>

              <div className="space-y-6 text-lg text-stone-600 leading-relaxed max-w-2xl">
                <p>
                  Results-driven Mobile Developer with proven expertise in Flutter & Android development.
                  I transform complex problems into elegant, user-centric solutions.
                </p>

                <p>
                  With a focus on clean code and exceptional user experiences, I bring ideas to life
                  through innovative mobile applications that make a difference.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-stone-200">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-br from-earth-600 to-gold-600 bg-clip-text text-transparent mb-2">
                    3+
                  </div>
                  <div className="text-sm text-stone-500 uppercase tracking-wider">Years Exp</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-br from-gold-600 to-copper-600 bg-clip-text text-transparent mb-2">
                    15+
                  </div>
                  <div className="text-sm text-stone-500 uppercase tracking-wider">Projects</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-br from-copper-600 to-earth-600 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <div className="text-sm text-stone-500 uppercase tracking-wider">Quality</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Brutalist Projects Grid
const BrutalistProjects = ({ setCursorVariant, setCursorText }) => {
  return (
    <section className="py-40 relative" id="projects">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Header - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-8xl md:text-9xl font-display font-bold tracking-tighter leading-none">
                Selected
                <br />
                <span className="text-stone-300">Work</span>
              </h2>
            </div>
            <div className="text-6xl font-display font-bold text-stone-200">02</div>
          </div>
        </motion.div>

        {/* Asymmetric Project Grid */}
        <div className="space-y-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setCursorVariant={setCursorVariant}
              setCursorText={setCursorText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, setCursorVariant, setCursorText }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`grid grid-cols-12 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Section */}
      <div className={`col-span-12 md:col-span-7 ${!isEven ? 'md:col-start-6' : ''}`}>
        <MagneticElement strength={0.15}>
          <motion.div
            className="relative group overflow-hidden rounded-3xl aspect-[16/10]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => {
              setCursorVariant("hover");
              setCursorText("View Project");
            }}
            onMouseLeave={() => {
              setCursorVariant("default");
              setCursorText("");
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Action Buttons */}
            <motion.div
              className="absolute bottom-6 right-6 flex gap-3"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
            >
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 backdrop-blur-xl bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 shadow-xl"
                >
                  <ExternalLink size={20} className="text-stone-900" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 backdrop-blur-xl bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 shadow-xl"
                >
                  <Github size={20} className="text-stone-900" />
                </a>
              )}
            </motion.div>

            {/* Number Badge */}
            <div className="absolute top-6 left-6 text-8xl font-display font-bold text-white/10">
              {String(index + 1).padStart(2, '0')}
            </div>
          </motion.div>
        </MagneticElement>
      </div>

      {/* Content Section */}
      <div className={`col-span-12 md:col-span-5 ${!isEven ? 'md:col-start-1 md:row-start-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            {project.title}
          </h3>

          <p className="text-lg text-stone-600 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 pt-4">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 backdrop-blur-xl bg-white/60 border border-white/80 rounded-full text-sm text-stone-700 font-medium shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Premium Skills with 3D Cards
const PremiumSkills = () => {
  const skillCategories = [
    { icon: Smartphone, title: "Mobile", color: "from-blue-500 to-cyan-500", skills: skillsData.filter(s => s.category === 'mobile') },
    { icon: Code2, title: "Frontend", color: "from-purple-500 to-pink-500", skills: skillsData.filter(s => s.category === 'frontend') },
    { icon: Database, title: "Backend", color: "from-green-500 to-emerald-500", skills: skillsData.filter(s => s.category === 'backend') },
    { icon: Globe, title: "Tools", color: "from-orange-500 to-red-500", skills: skillsData.filter(s => s.category === 'tools') },
  ];

  return (
    <section className="py-40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-100/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 flex items-end justify-between"
        >
          <h2 className="text-8xl md:text-9xl font-display font-bold tracking-tighter">
            Skills &
            <br />
            <span className="text-stone-300">Expertise</span>
          </h2>
          <div className="text-6xl font-display font-bold text-stone-200">03</div>
        </motion.div>

        {/* 3D Card Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ category, index }) => {
  const Icon = category.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* 3D Card with Glassmorphism */}
      <motion.div
        className="relative backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-10 border border-white/80 shadow-2xl overflow-hidden"
        whileHover={{
          y: -8,
          rotateX: 2,
          rotateY: -2,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient Background on Hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Icon with Gradient */}
        <div className={`mb-8 relative inline-block`}>
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className={`w-16 h-16 bg-gradient-to-br ${category.color} bg-clip-text text-transparent`} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-8 tracking-tight">{category.title}</h3>

        {/* Skills List */}
        <div className="space-y-5">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-stone-700">{skill.name}</span>
                <span className="text-xs text-stone-500 font-mono">{skill.proficiency}%</span>
              </div>

              {/* Premium Progress Bar */}
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Depth Shadow */}
        <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-stone-900/5 to-stone-900/10 rounded-[2.5rem] -z-10" />
      </motion.div>
    </motion.div>
  );
};

// Floating Testimonials
const FloatingTestimonials = () => {
  return (
    <section className="py-40 relative">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 flex items-end justify-between"
        >
          <h2 className="text-8xl md:text-9xl font-display font-bold tracking-tighter">
            Client
            <br />
            <span className="text-stone-300">Testimonials</span>
          </h2>
          <div className="text-6xl font-display font-bold text-stone-200">04</div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={index === 0 ? "md:col-span-2" : ""}
    >
      <MagneticElement strength={0.1}>
        <motion.div
          className="h-full backdrop-blur-2xl bg-white/50 rounded-3xl p-8 border border-white/70 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ y: -4 }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-gold-500 text-xl"
              >
                ★
              </motion.span>
            ))}
          </div>

          {/* Quote */}
          <p className="text-lg text-stone-700 leading-relaxed mb-6 italic">
            "{testimonial.message}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-earth-400 to-gold-400" />
            <div>
              <p className="font-semibold text-stone-900">{testimonial.author}</p>
              <p className="text-sm text-stone-500">Client</p>
            </div>
          </div>
        </motion.div>
      </MagneticElement>
    </motion.div>
  );
};

// Avant-Garde Contact
const AvantGardeContact = ({ setCursorVariant, setCursorText }) => {
  return (
    <section className="py-40 relative overflow-hidden" id="contact">

      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-earth-900">
        <FloatingOrb className="top-20 left-20 w-96 h-96 bg-gradient-to-br from-gold-500/30 to-copper-500/20" />
        <FloatingOrb className="bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-earth-500/30 to-gold-500/20" delay={2} />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10 text-center">

        {/* Massive CTA Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-white mb-12 leading-[0.9] tracking-tighter"
        >
          Let's Create
          <br />
          <span className="bg-gradient-to-r from-gold-400 via-copper-400 to-earth-400 bg-clip-text text-transparent">
            Together
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-stone-300 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Have a project in mind? Let's build something extraordinary that makes an impact.
        </motion.p>

        {/* Giant CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <MagneticElement strength={0.5} scale={1.1}>
            <motion.a
              href="mailto:your@email.com"
              onMouseEnter={() => {
                setCursorVariant("hover");
                setCursorText("Send Email");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorText("");
              }}
              className="group inline-flex items-center gap-4 px-16 py-8 bg-gradient-to-r from-white to-stone-100 text-stone-900 rounded-full font-bold text-xl shadow-2xl hover:shadow-gold-500/20 transition-all duration-500 overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowUpRight size={24} className="relative z-10 group-hover:rotate-45 transition-transform duration-300" />

              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-400 to-copper-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Subtle Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-stone-400 text-sm tracking-widest uppercase"
        >
          Available for Freelance · Remote Work · Collaborations
        </motion.p>
      </div>
    </section>
  );
};

export default AwwwardsPortfolio;
