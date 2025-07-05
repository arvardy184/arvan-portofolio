import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Star, Zap, Award, Target, Brush } from 'lucide-react';
import skillsData from '../data/skillsData';

const CustomSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillCategory, setSkillCategory] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Categorize skills (you can extend this based on your skillsData)
  const skillCategories = {
    all: 'すべて',
    frontend: 'フロント',
    backend: 'バック', 
    mobile: 'モバイル',
    tools: 'ツール'
  };

  // Enhanced skills data with categories
  const enhancedSkills = skillsData.map((skill, index) => ({
    ...skill,
    category: index < 3 ? 'frontend' : index < 6 ? 'backend' : index < 8 ? 'mobile' : 'tools',
    icon: index % 4 === 0 ? Star : index % 4 === 1 ? Zap : index % 4 === 2 ? Award : Target,
    color: index % 4 === 0 ? 'from-gold-500 to-copper-500' : 
           index % 4 === 1 ? 'from-earth-500 to-stone-600' :
           index % 4 === 2 ? 'from-copper-500 to-gold-600' :
           'from-stone-600 to-earth-700'
  }));

  const filteredSkills = skillCategory === 'all' 
    ? enhancedSkills 
    : enhancedSkills.filter(skill => skill.category === skillCategory);

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

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Ink flow progress bar component
  const ZenProgressBar = ({ skill, delay = 0 }) => {
    const progress = useSpring(0, { stiffness: 100, damping: 30 });
    const width = useTransform(progress, [0, 100], ["0%", "100%"]);

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          progress.set(skill.proficiency);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [skill.proficiency, delay, progress]);

    return (
      <div className="relative">
        {/* Background track */}
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          {/* Animated progress */}
          <motion.div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
            style={{ width }}
          >
            {/* Flowing ink effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Percentage indicator */}
        <motion.div
          className="absolute -top-8 right-0 text-sm font-medium text-stone-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ delay: delay + 0.5 }}
        >
          {skill.proficiency}%
        </motion.div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-24 bg-zen-gradient overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating brush strokes */}
        <motion.svg
          className="absolute top-10 right-20 w-40 h-40 text-gold-300 opacity-20"
          viewBox="0 0 200 200"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <motion.path
            d="M50,50 Q100,20 150,50 Q120,100 150,150 Q100,120 50,150 Q80,100 50,50"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </motion.svg>

        {/* Zen circles */}
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 border border-copper-300 opacity-20 rounded-full"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            <span className="text-4xl font-display calligraphy-heading mr-4">技</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-copper-400 to-transparent"></div>
            <span className="text-4xl font-display calligraphy-heading ml-4">能</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold calligraphy-heading mb-6">
            Keahlian & Kemampuan
          </h2>
          
          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Mengasah kemampuan dengan{' '}
            <span className="calligraphy-heading">dedikasi</span> dan{' '}
            <span className="calligraphy-heading">kesabaran</span> seperti seni kaligrafi tradisional
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex space-x-2 bg-stone-100 p-2 rounded-full">
            {Object.entries(skillCategories).map(([key, label]) => (
              <motion.button
                key={key}
                onClick={() => setSkillCategory(key)}
                className={`px-6 py-2 rounded-full text-sm font-medium zen-transition ${
                  skillCategory === key
                    ? 'bg-gradient-to-r from-earth-500 to-gold-600 text-white shadow-lg'
                    : 'text-stone-600 hover:text-earth-600 hover:bg-stone-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          key={skillCategory} // Re-animate on category change
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={`${skill.id}-${skillCategory}`}
                className="group"
                variants={skillVariants}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill Card */}
                <div className="relative zen-card p-8 h-full overflow-hidden group-hover:shadow-xl zen-transition">
                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Skill Icon */}
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 shadow-lg`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Skill Name */}
                    <h3 className="text-2xl font-display font-semibold calligraphy-heading mb-2 group-hover:text-earth-700 zen-transition">
                      {skill.name}
                    </h3>

                    {/* Skill Level Text */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-stone-600 font-medium">
                        {skill.proficiency >= 90 ? '達人' : 
                         skill.proficiency >= 80 ? '上級' :
                         skill.proficiency >= 70 ? '中級' :
                         skill.proficiency >= 60 ? '初級' : '学習中'}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ 
                              scale: isInView ? 1 : 0, 
                              rotate: isInView ? 0 : -180 
                            }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.1 + 0.8,
                              type: "spring",
                              stiffness: 200 
                            }}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                i < Math.floor(skill.proficiency / 20)
                                  ? 'text-gold-500 fill-current'
                                  : 'text-stone-300'
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <ZenProgressBar 
                      skill={skill} 
                      delay={index * 100 + 600}
                    />
                  </div>

                  {/* Hover effect - Ink splash */}
                  {hoveredSkill === skill.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-full h-full bg-gradient-radial ${skill.color} opacity-20`}></div>
                    </motion.div>
                  )}

                  {/* Decorative brush stroke */}
                  <svg 
                    className="absolute top-4 right-4 w-8 h-8 text-stone-300 opacity-30 pointer-events-none"
                    viewBox="0 0 32 32"
                  >
                    <motion.path
                      d="M4,28 Q16,16 28,4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: hoveredSkill === skill.id ? 1 : 0 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4 zen-card px-8 py-4">
            <Brush className="w-6 h-6 text-copper-500" />
            <span className="text-stone-600 font-medium">
              "千里の道も一歩から" - <span className="calligraphy-heading">Perjalanan seribu mil dimulai dari satu langkah</span>
            </span>
            <Brush className="w-6 h-6 text-copper-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomSkills;