import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Smartphone, Database, Globe } from 'lucide-react';
import projectsData from '../data/projectsData';
import skillsData from '../data/skillsData';
import testimonialsData from '../data/testimonialsData';

// Character reveal animation component
const CharacterReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Word reveal for headings
const WordReveal = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3">
          <CharacterReveal delay={i * 0.05}>
            {word}
          </CharacterReveal>
        </span>
      ))}
    </div>
  );
};

// Magnetic element component
const MagneticElement = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

const AwwwardsPortfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom cursor
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div ref={containerRef} className="bg-washi-cream text-stone-900">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-earth-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          scale: cursorVariant === "hover" ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-500 via-gold-500 to-copper-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Navigation */}
      <motion.nav
        className="fixed top-8 right-8 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="backdrop-blur-md bg-washi-pearl/80 rounded-full px-6 py-3 border border-stone-200/50 shadow-lg">
          <div className="flex gap-6">
            <MagneticElement>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="text-stone-600 hover:text-earth-700 transition-colors">
                <Github size={20} />
              </a>
            </MagneticElement>
            <MagneticElement>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="text-stone-600 hover:text-earth-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </MagneticElement>
            <MagneticElement>
              <a href="mailto:your@email.com"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="text-stone-600 hover:text-earth-700 transition-colors">
                <Mail size={20} />
              </a>
            </MagneticElement>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Continuous Flow */}
      <HeroSection cursorVariant={cursorVariant} setCursorVariant={setCursorVariant} />

      {/* About Flow */}
      <AboutSection />

      {/* Projects - Horizontal Scroll */}
      <ProjectsHorizontalScroll setCursorVariant={setCursorVariant} />

      {/* Skills - Grid Reveal */}
      <SkillsSection />

      {/* Testimonials Flow */}
      <TestimonialsSection />

      {/* Contact - Minimal */}
      <ContactSection setCursorVariant={setCursorVariant} />

      {/* Footer */}
      <footer className="py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-stone-500 text-sm"
          >
            © 2024 Arvan Yudhistia. Crafted with passion.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ setCursorVariant }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section
      style={{ opacity }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-earth-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gold-200/30 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-stone-100 rounded-full text-sm text-stone-600 font-medium">
            Available for freelance
          </span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-display font-bold mb-8 leading-none">
          <WordReveal text="Arvan Yudhistia" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Mobile Developer crafting seamless experiences through Flutter & Android development
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-6 justify-center"
        >
          <MagneticElement>
            <motion.a
              href="#projects"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-earth-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </MagneticElement>

          <MagneticElement>
            <motion.a
              href="#contact"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="px-8 py-4 border-2 border-stone-900 text-stone-900 rounded-full font-medium hover:bg-stone-900 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-stone-600 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          style={{ y }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-display font-bold mb-8"
            >
              Creating digital experiences that matter
            </motion.h2>
          </div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-stone-600 leading-relaxed"
            >
              Results-driven Mobile Developer with proven expertise in Flutter & Android development.
              I transform complex problems into elegant, user-centric solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-stone-600 leading-relaxed"
            >
              With a focus on clean code and exceptional user experiences, I bring ideas to life
              through innovative mobile applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-8 pt-8"
            >
              <div>
                <div className="text-4xl font-bold text-earth-600 mb-2">3+</div>
                <div className="text-stone-600">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-earth-600 mb-2">15+</div>
                <div className="text-stone-600">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Horizontal Scroll Projects
const ProjectsHorizontalScroll = ({ setCursorVariant }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-bold writing-mode-vertical"
          >
            Projects
          </motion.h2>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-8 pl-64"
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setCursorVariant={setCursorVariant}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, setCursorVariant }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      className="flex-shrink-0 w-[500px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group"
    >
      <div className="relative h-2/3 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <motion.div
          className="absolute bottom-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full hover:bg-earth-100 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full hover:bg-earth-100 transition-colors"
            >
              <Github size={20} />
            </a>
          )}
        </motion.div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
        <p className="text-stone-600 mb-4 line-clamp-2">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Skills Section
const SkillsSection = () => {
  const skillCategories = [
    { icon: Smartphone, title: "Mobile", skills: skillsData.filter(s => s.category === 'mobile') },
    { icon: Code2, title: "Frontend", skills: skillsData.filter(s => s.category === 'frontend') },
    { icon: Database, title: "Backend", skills: skillsData.filter(s => s.category === 'backend') },
    { icon: Globe, title: "Tools", skills: skillsData.filter(s => s.category === 'tools') },
  ];

  return (
    <section className="py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold mb-20 text-center"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category, index }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="mb-6">
        <Icon className="w-12 h-12 text-earth-600" />
      </div>

      <h3 className="text-2xl font-bold mb-6">{category.title}</h3>

      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.id}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-stone-500">{skill.proficiency}%</span>
            </div>
            <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-earth-500 to-gold-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold mb-20 text-center"
        >
          What Clients Say
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold-500 text-xl">★</span>
                ))}
              </div>

              <p className="text-stone-600 mb-6 leading-relaxed">
                "{testimonial.message}"
              </p>

              <p className="font-semibold text-stone-900">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ setCursorVariant }) => {
  return (
    <section className="py-32 bg-stone-900 text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold mb-8"
        >
          Let's Work Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-stone-300 mb-12"
        >
          Have a project in mind? Let's create something amazing together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <MagneticElement strength={0.5}>
            <motion.a
              href="mailto:your@email.com"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="inline-block px-12 py-5 bg-white text-stone-900 rounded-full font-medium text-lg hover:bg-earth-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
};

export default AwwwardsPortfolio;
