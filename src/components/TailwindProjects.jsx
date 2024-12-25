import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Maximize2, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Code Assistant',
    description: 'Platform AI untuk membantu developer dalam menulis kode lebih efisien',
    longDescription: 'Menggunakan teknologi machine learning terbaru untuk memberikan saran kode yang akurat dan kontekstual. Dibangun dengan Next.js dan OpenAI API.',
    image: '/api/placeholder/800/600',
    tags: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    github: 'https://github.com/username/project1',
    live: 'https://project1.com',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 2,
    title: 'E-Learning Platform',
    description: 'Platform pembelajaran online dengan fitur interaktif dan gamifikasi',
    longDescription: 'Sistem pembelajaran komprehensif dengan video streaming, quiz interaktif, dan sistem reward. Menggunakan React dan Firebase.',
    image: '/api/placeholder/800/600',
    tags: ['React', 'Firebase', 'Redux', 'Node.js'],
    github: 'https://github.com/username/project2',
    live: 'https://project2.com',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'IoT Dashboard',
    description: 'Dashboard untuk monitoring dan kontrol perangkat IoT secara real-time',
    longDescription: 'Visualisasi data real-time dari sensor IoT dengan grafik interaktif dan sistem notifikasi. Dibuat dengan MERN stack.',
    image: '/api/placeholder/800/600',
    tags: ['React', 'Express', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/username/project3',
    live: 'https://project3.com',
    color: 'from-green-500 to-emerald-500'
  }
];

const TailwindProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);

  return (
    <section id="projects" className="py-20 bg-[#0a0a0f] relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Proyek Terbaru
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Beberapa proyek terbaik yang telah saya kerjakan dengan passion dan dedikasi tinggi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="group h-full rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300 
                        ${hoveredTag === tag ? 'bg-purple-500/20 text-purple-300' : ''}`}
                      onHoverStart={() => setHoveredTag(tag)}
                      onHoverEnd={() => setHoveredTag(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Maximize2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a2f] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Github size={20} />
                  <span>Source Code</span>
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TailwindProjects;