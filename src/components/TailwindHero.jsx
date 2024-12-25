import React from 'react';
import { motion } from 'framer-motion';

const TailwindHero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Gradient + Wave Mask */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* wave mask: gunakan mask-image di Tailwind dengan plugin atau CSS manual */}
        <svg
          className="absolute bottom-0 w-full h-40 text-white"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,90.7C672,75,768,85,864,112C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Konten Hero */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-2xl mx-auto p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400">
            Selamat Datang
          </span>
          <br /> di Portfolio Anti-Mainstream
        </motion.h1>
        <motion.p
          className="text-gray-200 text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Kami menghadirkan desain unik, modern, dan berbeda dari template pasaran.
        </motion.p>
        <motion.a
          href="#projects"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-transform transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Lihat Proyek Kami
        </motion.a>
      </motion.div>
    </section>
  );
};

export default TailwindHero;
