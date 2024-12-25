import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Layout, Cpu, GitBranch } from 'lucide-react';

const skillsList = [
  {
    name: 'Frontend Development',
    level: 'Advanced',
    icon: <Layout />,
    color: 'from-pink-500 to-rose-500',
    details: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    description: 'Membangun antarmuka yang responsif dan intuitif'
  },
  {
    name: 'Backend Development',
    level: 'Intermediate',
    icon: <Server />,
    color: 'from-purple-500 to-indigo-500',
    details: ['Node.js', 'Express.js', 'REST API', 'GraphQL'],
    description: 'Mengembangkan server dan API yang scalable'
  },
  {
    name: 'Database',
    level: 'Intermediate',
    icon: <Database />,
    color: 'from-cyan-500 to-blue-500',
    details: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
    description: 'Mengelola dan mengoptimasi database'
  },
  {
    name: 'DevOps',
    level: 'Learning',
    icon: <GitBranch />,
    color: 'from-green-500 to-emerald-500',
    details: ['Git', 'Docker', 'CI/CD', 'AWS'],
    description: 'Mengotomatisasi deployment dan maintenance'
  }
];

const CustomSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2f]">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-16" variants={skillVariants}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            variants={skillVariants}
          >
            Keahlian
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            variants={skillVariants}
          >
            Terus belajar dan mengembangkan diri dalam berbagai teknologi modern
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsList.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative"
              variants={skillVariants}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className={`h-full p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden group
                          hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} text-white`}>
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm 
                          ${skill.level === 'Advanced' ? 'bg-green-500/20 text-green-400' :
                            skill.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-purple-500/20 text-purple-400'}`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{skill.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {skill.details.map((detail, i) => (
                      <motion.span
                        key={detail}
                        className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={hoveredSkill === index ? 
                          { opacity: 1, scale: 1, transition: { delay: i * 0.1 } } : 
                          { opacity: 0.8, scale: 1 }}
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CustomSkills;