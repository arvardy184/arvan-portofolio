import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import projectsData from '../data/projectsData';

// Smooth reveal animation
const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Glass text component for hero
const GlassText = ({ children, className = "" }) => {
  return (
    <span className={`glass-text ${className}`} data-text={children}>
      {children}
    </span>
  );
};

// Magnetic hover effect
const Magnetic = ({ children, strength = 0.2 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const PremiumPortfolio = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#0a0a0a] text-white">

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Nav />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* Story */}
      <Story />

      {/* Medium Articles */}
      <Articles />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/40">© 2024 Arvan Yudhistia</p>
            <div className="flex gap-6">
              <Magnetic strength={0.3}>
                <a href="https://github.com" className="text-white/40 hover:text-white transition-colors duration-300">
                  <Github size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="https://linkedin.com" className="text-white/40 hover:text-white transition-colors duration-300">
                  <Linkedin size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="mailto:your@email.com" className="text-white/40 hover:text-white transition-colors duration-300">
                  <Mail size={18} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Navigation
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${scrolled ? 'glass-nav' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex items-center gap-8 px-8 py-3 rounded-full backdrop-blur-2xl bg-white/5 border border-white/10">
        {['About', 'Experience', 'Projects', 'Story', 'Articles'].map((item) => (
          <Magnetic key={item} strength={0.15}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </a>
          </Magnetic>
        ))}
      </div>
    </motion.nav>
  );
};

// Hero section
const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Main title with glass text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl lg:text-[11rem] font-light tracking-tighter leading-[0.9]">
            <GlassText>Arvan</GlassText>
          </h1>
          <h1 className="text-8xl md:text-9xl lg:text-[11rem] font-light tracking-tighter leading-[0.9]">
            <GlassText>Yudhistia</GlassText>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12"
        >
          Mobile Developer crafting seamless experiences
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Magnetic>
            <motion.a
              href="#projects"
              className="group px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </Magnetic>

          <Magnetic>
            <motion.a
              href="#story"
              className="px-8 py-4 border border-white/20 rounded-full font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Story
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity }
          }}
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white/40 rounded-full"
              animate={{ y: [0, 14, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// About section
const About = () => {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Visual */}
          <FadeIn>
            <Magnetic strength={0.1}>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-9xl font-light text-white/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    AY
                  </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Magnetic>
          </FadeIn>

          {/* Content */}
          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-6xl md:text-7xl font-light mb-8 tracking-tight">
                About Me
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  Mobile Developer with expertise in Flutter and Android development.
                  I transform complex problems into elegant, user-centric solutions.
                </p>
                <p>
                  With 3+ years of experience, I've built everything from super apps
                  to enterprise solutions, always focusing on clean code and exceptional UX.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
                {[
                  { num: '3+', label: 'Years' },
                  { num: '15+', label: 'Projects' },
                  { num: '100%', label: 'Remote' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-light mb-2 text-gradient">{stat.num}</div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience section
const Experience = () => {
  const experiences = [
    {
      company: "PT Okejek Kreasi Indonesia",
      role: "Mobile Developer",
      period: "Aug 2024 - Present",
      location: "Remote",
      description: "Leading mobile development for Okejek Super App with Flutter, integrating ride-hailing, food delivery, and marketplace services.",
      tech: ["Flutter", "Firebase", "Google Maps", "REST API"]
    },
    {
      company: "PT Inovasi Solusindo Sukses",
      role: "Android Developer",
      period: "Sep 2023 - Jul 2024",
      location: "Remote",
      description: "Developed ISO Document Management system with Kotlin, streamlining certification processes.",
      tech: ["Kotlin", "Jetpack Compose", "Room DB", "REST API"]
    },
    {
      company: "PT. Putra Kencana",
      role: "Flutter Developer",
      period: "Jul 2023 - Jan 2024",
      location: "Remote",
      description: "Built geolocation-based attendance system, reducing manual processing by 50%.",
      tech: ["Flutter", "Geolocation", "Firebase", "Google Maps"]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-light mb-20 tracking-tight">
            Experience
          </h2>
        </FadeIn>

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group glass-card rounded-3xl p-8 md:p-12 hover:bg-white/5 transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{exp.role}</h3>
                    <p className="text-lg text-white/60">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/40">
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

                <p className="text-white/60 mb-6 leading-relaxed">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, j) => (
                    <span key={j} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects section
const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-light mb-20 tracking-tight">
            Selected Work
          </h2>
        </FadeIn>

        <div className="space-y-24">
          {projectsData.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>

        {/* Image */}
        <div className={!isEven ? 'lg:col-start-2' : ''}>
          <Magnetic strength={0.1}>
            <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Links */}
              <motion.div
                className="absolute bottom-6 right-6 flex gap-3"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {project.liveDemo && (
                  <a href={project.liveDemo} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                    <Github size={18} />
                  </a>
                )}
              </motion.div>
            </div>
          </Magnetic>
        </div>

        {/* Content */}
        <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <div className="text-sm text-white/40 mb-3 font-mono">0{index + 1}</div>
          <h3 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            {project.title}
          </h3>
          <p className="text-lg text-white/60 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

// Story section
const Story = () => {
  return (
    <section id="story" className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-light mb-12 tracking-tight">
            My Story
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-8 text-lg text-white/60 leading-relaxed">
            <p>
              My journey began with curiosity about mobile apps. That curiosity
              evolved into a passion for creating seamless experiences.
            </p>
            <p>
              Over the years, I've worked with amazing teams, building super apps
              and enterprise solutions. Each project taught me something new.
            </p>
            <p>
              Today, I create mobile applications that are functional and delightful.
              I believe in clean code, thoughtful design, and making lives easier.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 pt-16 border-t border-white/10">
            <p className="text-white/40 mb-8">Let's work together</p>
            <Magnetic>
              <motion.a
                href="mailto:your@email.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowUpRight size={18} />
              </motion.a>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Articles section
const Articles = () => {
  const articles = [
    {
      title: "Building Scalable Flutter Applications",
      excerpt: "Best practices for architecting Flutter apps that grow with your business.",
      date: "Dec 2024",
      readTime: "8 min",
      link: "https://medium.com/@yourprofile/article1"
    },
    {
      title: "State Management in Modern Mobile Apps",
      excerpt: "Comprehensive guide to choosing the right state management solution.",
      date: "Nov 2024",
      readTime: "12 min",
      link: "https://medium.com/@yourprofile/article2"
    },
    {
      title: "Performance Optimization for Android",
      excerpt: "Practical techniques to make your Android apps faster and responsive.",
      date: "Oct 2024",
      readTime: "10 min",
      link: "https://medium.com/@yourprofile/article3"
    }
  ];

  return (
    <section id="articles" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-6xl md:text-7xl font-light tracking-tight">
              Articles
            </h2>
            <a
              href="https://medium.com/@yourprofile"
              className="hidden sm:flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <span>View all</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Magnetic strength={0.1}>
                <a
                  href={article.link}
                  className="group block glass-card rounded-3xl p-8 hover:bg-white/5 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 text-sm text-white/40 mb-4">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-medium mb-3 group-hover:text-white/80 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-white/60 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <span>Read more</span>
                    <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </Magnetic>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumPortfolio;
