import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import projectsData from '../data/projectsData';

// Sophisticated text reveal with split animation
const SplitText = ({ children, delay = 0 }) => {
  const text = children;
  const letters = Array.from(text);

  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
          style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Advanced parallax reveal
const ParallaxReveal = ({ children, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
};

// Magnetic element with 3D tilt
const MagneticElement = ({ children }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Reveal on scroll with clip path
const ClipReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 1.2, delay, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Number counter animation
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const MinimalistPortfolio = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* Sophisticated Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-900 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Minimal Floating Nav */}
      <FloatingNav />

      {/* Hero with Advanced Animations */}
      <HeroSection />

      {/* About with Parallax */}
      <AboutSection />

      {/* Experience Timeline */}
      <ExperienceSection />

      {/* Projects with Image Reveals */}
      <ProjectsSection />

      {/* Story Section */}
      <StorySection />

      {/* Medium Articles */}
      <MediumSection />

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-neutral-500">© 2024 Arvan Yudhistia. All rights reserved.</p>
            <div className="flex gap-6">
              <MagneticElement>
                <a href="https://github.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Github size={18} />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a href="https://linkedin.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Linkedin size={18} />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a href="mailto:your@email.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Mail size={18} />
                </a>
              </MagneticElement>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

// Floating Navigation with blur
const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        scrolled ? 'glass-nav shadow-2xl' : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex items-center gap-8 px-8 py-4 rounded-full backdrop-blur-2xl bg-white/70 border border-neutral-200/50">
        {['About', 'Experience', 'Projects', 'Story', 'Articles'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group"
          >
            {item}
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-900 group-hover:w-full transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

// Hero with split text and advanced animations
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div style={{ y }} className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Ultra-large name with split animation */}
        <div className="mb-8 overflow-hidden">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9] mb-2">
            <SplitText delay={0.5}>Arvan</SplitText>
          </h1>
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9]">
            <SplitText delay={0.8}>Yudhistia</SplitText>
          </h1>
        </div>

        {/* Subtitle with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-neutral-600 font-light max-w-2xl mx-auto">
            Mobile Developer crafting seamless digital experiences
          </p>
        </motion.div>

        {/* CTA with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticElement>
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-neutral-900 text-white rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-neutral-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2">
                View Work
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </motion.a>
          </MagneticElement>

          <MagneticElement>
            <motion.a
              href="#story"
              className="px-8 py-4 border-2 border-neutral-300 rounded-full hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Story
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity } }}
        >
          <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2 bg-neutral-600 rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// About with parallax and reveals
const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image with reveal */}
          <ClipReveal delay={0.2}>
            <MagneticElement>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-700 group">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-9xl font-light text-white/20">AY</div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </MagneticElement>
          </ClipReveal>

          {/* Content */}
          <div>
            <ParallaxReveal speed={0.3}>
              <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight leading-tight">
                About Me
              </h2>
            </ParallaxReveal>

            <ClipReveal delay={0.3}>
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  I'm a Mobile Developer with a passion for creating seamless, intuitive digital experiences.
                  Specializing in Flutter and Android development, I transform complex problems into elegant solutions.
                </p>
                <p>
                  With over 3 years of experience, I've worked on diverse projects ranging from super apps
                  to enterprise solutions, always focusing on user-centric design and clean code architecture.
                </p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.4}>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-neutral-200">
                <div>
                  <div className="text-4xl font-light mb-2">
                    <CountUp end={3} />+
                  </div>
                  <div className="text-sm text-neutral-500">Years</div>
                </div>
                <div>
                  <div className="text-4xl font-light mb-2">
                    <CountUp end={15} />+
                  </div>
                  <div className="text-sm text-neutral-500">Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-light mb-2">
                    <CountUp end={100} />%
                  </div>
                  <div className="text-sm text-neutral-500">Remote</div>
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience with line animations
const ExperienceSection = () => {
  const experiences = [
    {
      company: "PT Okejek Kreasi Indonesia",
      role: "Mobile Developer",
      period: "Aug 2024 - Present",
      location: "Remote",
      description: "Leading mobile development for Okejek Super App, integrating multiple services including ride-hailing, food delivery, and marketplace.",
      tech: ["Flutter", "Firebase", "Google Maps API", "REST API"]
    },
    {
      company: "PT Inovasi Solusindo Sukses (INOVASS)",
      role: "Android Developer",
      period: "Sep 2023 - Jul 2024",
      location: "Remote",
      description: "Developed ISO Document Management system, streamlining certification processes and improving team collaboration.",
      tech: ["Kotlin", "Jetpack Compose", "Room Database", "REST API"]
    },
    {
      company: "PT. Putra Kencana",
      role: "Flutter Developer",
      period: "Jul 2023 - Jan 2024",
      location: "Remote",
      description: "Built geolocation-based employee attendance system, reducing manual processing time by 50%.",
      tech: ["Flutter", "Geolocation", "Firebase", "Google Maps"]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">

        <ParallaxReveal speed={0.5}>
          <h2 className="text-5xl md:text-7xl font-light mb-20 tracking-tight">
            Experience
          </h2>
        </ParallaxReveal>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.33, 1, 0.68, 1] }}
      className="group relative border-l-2 border-neutral-200 pl-8 pb-16 last:pb-0"
    >
      {/* Animated dot */}
      <motion.div
        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-900 border-4 border-neutral-50"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
      />

      {/* Line grow animation */}
      <motion.div
        className="absolute left-0 top-4 bottom-0 w-[2px] bg-neutral-900 origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
      />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-2xl font-medium mb-2">{exp.role}</h3>
          <p className="text-lg text-neutral-600">{exp.company}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      <p className="text-neutral-600 mb-6 max-w-3xl">{exp.description}</p>

      <div className="flex flex-wrap gap-2">
        {exp.tech.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 0.6 + i * 0.05 }}
            className="px-4 py-1.5 bg-white border border-neutral-200 text-neutral-700 text-sm rounded-full"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// Projects with advanced image reveals
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <ParallaxReveal speed={0.5}>
          <h2 className="text-5xl md:text-7xl font-light mb-20 tracking-tight">
            Selected Work
          </h2>
        </ParallaxReveal>

        <div className="space-y-32">
          {projectsData.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
    >

      {/* Image with clip reveal */}
      <div className={!isEven ? 'lg:col-start-2' : ''}>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
        >
          <MagneticElement>
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Links */}
              <motion.div
                className="absolute bottom-6 right-6 flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </motion.div>
            </div>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="text-sm text-neutral-400 mb-3 font-mono">0{index + 1}</div>
        <h3 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
          {project.title}
        </h3>
        <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
              className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Story with parallax
const StorySection = () => {
  return (
    <section id="story" className="py-32 px-6 bg-neutral-900 text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <ClipReveal>
          <h2 className="text-5xl md:text-7xl font-light mb-12 tracking-tight">
            My Story
          </h2>
        </ClipReveal>

        <ClipReveal delay={0.2}>
          <div className="space-y-8 text-lg text-neutral-300 leading-relaxed">
            <p>
              My journey in mobile development began with a simple curiosity about how apps work.
              That curiosity evolved into a passion for creating seamless digital experiences that people love to use.
            </p>
            <p>
              Over the years, I've had the privilege of working with amazing teams and clients,
              building everything from super apps serving thousands of users to specialized enterprise solutions.
              Each project has taught me something new and pushed me to grow as a developer.
            </p>
            <p>
              Today, I focus on creating mobile applications that are not just functional,
              but delightful to use. I believe in clean code, thoughtful design, and the power
              of technology to make people's lives easier.
            </p>
          </div>
        </ClipReveal>

        <ClipReveal delay={0.4}>
          <div className="mt-16 pt-16 border-t border-neutral-800">
            <p className="text-neutral-400 mb-8">Let's work together</p>
            <MagneticElement>
              <motion.a
                href="mailto:your@email.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full hover:bg-neutral-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={18} />
              </motion.a>
            </MagneticElement>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
};

// Medium with stagger animations
const MediumSection = () => {
  const articles = [
    {
      title: "Building Scalable Flutter Applications",
      excerpt: "Learn best practices for architecting Flutter apps that can grow with your business needs.",
      date: "Dec 2024",
      readTime: "8 min read",
      link: "https://medium.com/@yourprofile/article1"
    },
    {
      title: "State Management in Modern Mobile Apps",
      excerpt: "A comprehensive guide to choosing the right state management solution for your Flutter project.",
      date: "Nov 2024",
      readTime: "12 min read",
      link: "https://medium.com/@yourprofile/article2"
    },
    {
      title: "Performance Optimization Tips for Android",
      excerpt: "Practical techniques to make your Android apps faster and more responsive.",
      date: "Oct 2024",
      readTime: "10 min read",
      link: "https://medium.com/@yourprofile/article3"
    }
  ];

  return (
    <section id="articles" className="py-32 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">

        <ParallaxReveal speed={0.5}>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight">
              Articles
            </h2>
            <a
              href="https://medium.com/@yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <span>View all on Medium</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </ParallaxReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ArticleCard = ({ article, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
    >
      <MagneticElement>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-8 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-900 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-xl font-medium mb-3 group-hover:text-neutral-600 transition-colors">
            {article.title}
          </h3>

          <p className="text-neutral-600 mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          <motion.div
            className="flex items-center gap-2 text-sm text-neutral-900"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span>Read more</span>
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.div>
        </a>
      </MagneticElement>
    </motion.div>
  );
};

export default MinimalistPortfolio;
