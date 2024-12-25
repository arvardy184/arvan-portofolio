import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Sparkles, Star } from 'lucide-react';

const NAMA_VARIASI = [
  'Arvan Yudhistia Ardana',
  'アルヴァン ユディスティア',
  '阿尔凡 尤迪斯提亚',
  '아르반 유디스티아'
];

// Kecepatan mengetik dan menghapus (ms)
const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
// Waktu berhenti sejenak setelah menulis atau menghapus (ms)
const PAUSE_TIME = 1000;

const CustomHero = () => {
  // ---------------------------
  // STATE UNTUK TYPEWRITER
  // ---------------------------
  const [currentIndex, setCurrentIndex] = useState(0); // Indeks string yang sedang ditampilkan
  const [typedName, setTypedName] = useState('');      // Teks yang tampil seolah-olah sedang diketik
  const [phase, setPhase] = useState('typing');        // typing | pausing | deleting

  // ---------------------------
  // STATE EFEK MOUSE & SCROLL
  // ---------------------------
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // -------------------------------------------------------------------
  // LOGIC TYPEWRITER (GANTI TEKS SETIAP KALI SELESAI KETIK/HAPUS)
  // -------------------------------------------------------------------
  useEffect(() => {
    const handleType = () => {
      const currentString = NAMA_VARIASI[currentIndex];

      if (phase === 'typing') {
        // Apakah masih ada karakter yang perlu ditambahkan?
        const nextChar = currentString.slice(0, typedName.length + 1);
        if (nextChar === typedName) {
          // Sudah selesai ketik kata lengkap => pause sejenak
          setPhase('pausing');
          return;
        }
        // Jika belum selesai, tambahkan satu karakter
        setTypedName(nextChar);
      } else if (phase === 'deleting') {
        // Apakah masih ada karakter yang perlu dihapus?
        if (typedName.length > 0) {
          setTypedName((prev) => prev.slice(0, -1));
        } else {
          // Sudah selesai menghapus => pindah ke string berikutnya
          setCurrentIndex((prev) => (prev + 1) % NAMA_VARIASI.length);
          setPhase('typing');
        }
      }
    };

    // Tentukan kecepatan sesuai fase
    let activeSpeed = phase === 'typing' ? TYPING_SPEED : DELETING_SPEED;

    // Jika phase = pausing, kita jeda sejenak (PAUSE_TIME), lalu hapus
    if (phase === 'pausing') {
      activeSpeed = PAUSE_TIME;
    }

    const timeout = setTimeout(() => {
      // Jika phase = pausing, habis jeda langsung masuk fase deleting
      if (phase === 'pausing') {
        setPhase('deleting');
      } else {
        handleType();
      }
    }, activeSpeed);

    return () => clearTimeout(timeout);
  }, [typedName, phase, currentIndex]);

  // -------------------------------------------------------------------
  // LOGIC MOUSE MOVE (PARALLAX)
  // -------------------------------------------------------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // -------------------------------------------------------------------
  // RANDOM BINTANG (BACKGROUND)
  // -------------------------------------------------------------------
  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Star className="text-purple-400" size={Math.random() * 4 + 2} />
      </motion.div>
    ));
  };

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
      style={{ opacity }}
    >
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {generateStars(50)}
      </div>

      {/* Parallax Background Shapes */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm text-gray-300">Mobile Developer</span>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-500 to-indigo-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {typedName}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Saya mengubah ide menjadi realitas digital dengan sentuhan kreativitas yang unik
          dan inovatif.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-medium hover:opacity-90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Lihat Proyek</span>
            <motion.div
              className="w-5 h-5"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-5 h-5" />
            </motion.div>
          </motion.a>

          <motion.a
            href="#contact"
            className="group px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hubungi Saya
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CustomHero;
