import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import projectsData from '../data/projectsData';

// Fade in animation component
const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MinimalistPortfolio = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#fafaf9] text-neutral-900 antialiased">

      {/* Minimal Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-neutral-900 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Story Section */}
      <StorySection />

      {/* Medium Articles Section */}
      <MediumSection />

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-neutral-500">© 2024 Arvan Yudhistia. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://github.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:your@email.com" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Floating Minimal Navigation
const FloatingNav = () => {
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center gap-8 px-8 py-4 rounded-full backdrop-blur-xl bg-white/60 border border-white/60 shadow-lg">
        <a href="#about" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
          About
        </a>
        <a href="#experience" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
          Experience
        </a>
        <a href="#projects" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
          Projects
        </a>
        <a href="#story" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
          Story
        </a>
        <a href="#articles" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
          Articles
        </a>
      </div>
    </motion.nav>
  );
};

// Hero Section with Frosted Glass Text
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      style={{ opacity }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100/50" />

      <motion.div style={{ y }} className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Frosted Glass Text Effect - Main Name */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4">
            <span className="frosted-glass-text">Arvan</span>
          </h1>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight">
            <span className="frosted-glass-text">Yudhistia</span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-neutral-600 font-light mb-12 max-w-2xl mx-auto"
        >
          Mobile Developer crafting seamless digital experiences
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all duration-300"
          >
            <span>View Work</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-300 rounded-full hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-300"
          >
            <span>My Story</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border border-neutral-300 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-neutral-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image/Visual */}
          <FadeIn>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-light text-neutral-300">AY</div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Content */}
          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
                About Me
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
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
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-neutral-200">
                <div>
                  <div className="text-3xl font-light mb-2">3+</div>
                  <div className="text-sm text-neutral-500">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-light mb-2">15+</div>
                  <div className="text-sm text-neutral-500">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-light mb-2">100%</div>
                  <div className="text-sm text-neutral-500">Remote</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
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
    <section id="experience" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <h2 className="text-5xl md:text-6xl font-light mb-20 tracking-tight">
            Experience
          </h2>
        </FadeIn>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group border-b border-neutral-200 pb-12 last:border-0">
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
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                    >
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

// Projects Section
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <h2 className="text-5xl md:text-6xl font-light mb-20 tracking-tight">
            Selected Work
          </h2>
        </FadeIn>

        <div className="space-y-24">
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

  return (
    <FadeIn delay={index * 0.1}>
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>

        {/* Image */}
        <div className={!isEven ? 'lg:col-start-2' : ''}>
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Links on hover */}
            <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <div className="text-sm text-neutral-500 mb-3">0{index + 1}</div>
          <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            {project.title}
          </h3>
          <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

// Story Section
const StorySection = () => {
  return (
    <section id="story" className="py-32 px-6 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto text-center">

        <FadeIn>
          <h2 className="text-5xl md:text-6xl font-light mb-12 tracking-tight">
            My Story
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
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
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 pt-16 border-t border-neutral-800">
            <p className="text-neutral-400 mb-8">Let's work together</p>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full hover:bg-neutral-100 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Medium Articles Section
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
    <section id="articles" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">
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
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 border border-neutral-200 rounded-2xl hover:border-neutral-900 transition-all duration-300 hover:shadow-lg"
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

                <div className="flex items-center gap-2 text-sm text-neutral-900 group-hover:gap-3 transition-all">
                  <span>Read more</span>
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center sm:hidden">
            <a
              href="https://medium.com/@yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <span>View all on Medium</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default MinimalistPortfolio;
