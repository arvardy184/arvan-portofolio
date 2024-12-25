import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonialData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, Tech Innovators',
    message: 'Kolaborasi yang luar biasa! Hasil kerja sangat memuaskan dan proses pengerjaan yang sangat profesional. Rekomendasi tinggi untuk jasa development website.',
    image: '/api/placeholder/100/100',
    rating: 5
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Founder, Creative Studio',
    message: 'Design yang dihasilkan sangat unik dan sesuai dengan brand identity kami. Responsif dalam komunikasi dan delivery tepat waktu.',
    image: '/api/placeholder/100/100',
    rating: 5
  },
  {
    id: 3,
    name: 'David Wilson',
    role: 'CTO, Startup Hub',
    message: 'Kualitas kode yang bersih dan terstruktur. Pemahaman yang baik tentang best practices dan performa aplikasi. Sangat recommended!',
    image: '/api/placeholder/100/100',
    rating: 5
  }
];

const TailwindTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonialData.length) % testimonialData.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2f] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Testimonial
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Apa kata klien tentang hasil kerja dan kolaborasi dengan saya
          </p>
        </motion.div>

        <div className="relative h-[400px] max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Quote className="w-12 h-12 text-purple-400 mb-6" />
                  <p className="text-gray-200 text-lg md:text-xl mb-8 italic">
                    "{testimonialData[currentIndex].message}"
                  </p>
                  <div className="flex items-center flex-col">
                    <img
                      src={testimonialData[currentIndex].image}
                      alt={testimonialData[currentIndex].name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500 mb-4"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-white">
                        {testimonialData[currentIndex].name}
                      </h4>
                      <p className="text-gray-400">
                        {testimonialData[currentIndex].role}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {[...Array(testimonialData[currentIndex].rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-white/20'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TailwindTestimonials;