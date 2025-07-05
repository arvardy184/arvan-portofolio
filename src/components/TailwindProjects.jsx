import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Layers, Code2, Sparkles } from 'lucide-react';
import projectsData from '../data/projectsData';

const TailwindProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Card animation variants with origami-inspired fold
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  // Ink brush stroke animation
  const brushStrokeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.6,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative py-24 bg-washi-pearl overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating brush strokes */}
        <motion.div
          className="absolute top-20 left-10 opacity-10"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <svg width="200" height="100" viewBox="0 0 200 100" className="text-earth-600">
            <motion.path
              d="M20,50 Q50,20 100,50 T180,50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              variants={brushStrokeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </svg>
        </motion.div>

        {/* Zen circle */}
        <motion.div
          className="absolute bottom-20 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-copper-500">
            <motion.circle
              cx="75"
              cy="75"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              variants={brushStrokeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Japanese character decoration */}
          <motion.div
            className="inline-flex items-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-4xl font-display calligraphy-heading mr-4">作</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <span className="text-4xl font-display calligraphy-heading ml-4">品</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold calligraphy-heading mb-6">
            Portfolio Karya
          </h2>
          
          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Setiap proyek adalah cerminan dari dedikasi, kreativitas, dan{' '}
            <span className="calligraphy-heading">keahlian teknis</span> yang terus berkembang
          </motion.p>

          {/* Bamboo divider */}
          <div className="bamboo-divider mt-12"></div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="group perspective-1000"
              variants={cardVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className="relative zen-card h-full overflow-hidden preserve-3d zen-transition group-hover:shadow-2xl">
                {/* Card Inner for 3D effect */}
                <div className="paper-fold-inner h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover zen-transition group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Overlay with floating icons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 zen-transition">
                      <div className="absolute bottom-4 left-4 flex space-x-3">
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 zen-transition"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                        <motion.a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 zen-transition"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={16} />
                        </motion.a>
                      </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-copper-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    >
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      Featured
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold calligraphy-heading mb-3 group-hover:text-earth-700 zen-transition">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-stone-100 text-stone-700 text-xs rounded-full font-medium border border-stone-200 hover:border-earth-300 zen-transition"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + techIndex * 0.1 + 0.8 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-earth-100 to-gold-100 text-earth-700 text-xs rounded-full font-medium">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-auto">
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 brush-btn text-center text-sm py-2 px-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <ExternalLink size={14} />
                          <span>Demo</span>
                        </span>
                      </motion.a>
                      
                      <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-stone-300 text-stone-700 rounded-full text-sm font-medium zen-transition hover:border-earth-400 hover:text-earth-700 hover-lift"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Code2 size={14} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Decorative corner brush stroke */}
                  <svg 
                    className="absolute bottom-0 right-0 w-16 h-16 text-gold-200 opacity-20 pointer-events-none"
                    viewBox="0 0 64 64"
                  >
                    <motion.path
                      d="M0,64 Q32,32 64,0"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: hoveredProject === project.id ? 1 : 0 
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                </div>

                {/* Ink drop effect on hover */}
                {hoveredProject === project.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full bg-gradient-radial from-earth-500/20 to-transparent"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="group brush-btn relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Layers className="w-5 h-5" />
              <span>Lihat Semua Karya</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
            
            {/* Flowing background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-copper-400 to-gold-400 opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TailwindProjects;