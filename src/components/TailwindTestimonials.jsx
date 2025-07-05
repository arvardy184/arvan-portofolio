import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, Cherry, ChevronLeft, ChevronRight } from 'lucide-react';
import testimonialsData from '../data/testimonialsData';

const TailwindTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Navigate testimonials
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateY: -15,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const quoteVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="relative py-24 bg-washi-pearl overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating cherry blossoms */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <Cherry className="text-copper-400" size={Math.random() * 16 + 12} />
          </motion.div>
        ))}

        {/* Traditional brush stroke */}
        <motion.svg
          className="absolute top-20 left-10 w-48 h-24 text-earth-400 opacity-10"
          viewBox="0 0 200 100"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <motion.path
            d="M20,50 Q60,20 100,50 Q140,80 180,50"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </motion.svg>
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
            <span className="text-4xl font-display calligraphy-heading mr-4">声</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <span className="text-4xl font-display calligraphy-heading ml-4">響</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold calligraphy-heading mb-6">
            Testimoni Klien
          </h2>
          
          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Suara-suara yang mengalir seperti{' '}
            <span className="calligraphy-heading">angin musim semi</span>, 
            menceritakan perjalanan kolaborasi yang bermakna
          </motion.p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="zen-card p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative quote marks */}
            <motion.div
              className="absolute top-8 left-8"
              variants={quoteVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              <Quote className="w-12 h-12 text-gold-400 opacity-30" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-8 right-8 rotate-180"
              variants={quoteVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 1 }}
            >
              <Quote className="w-12 h-12 text-copper-400 opacity-30" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                {/* Testimonial text */}
                <blockquote className="text-2xl md:text-3xl font-light text-stone-700 mb-8 leading-relaxed max-w-4xl mx-auto">
                  "{testimonialsData[activeTestimonial]?.message || ''}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-copper-500 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-white font-bold text-lg">
                      {testimonialsData[activeTestimonial]?.author?.charAt(0) || 'A'}
                    </span>
                  </motion.div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-display font-semibold calligraphy-heading">
                      {testimonialsData[activeTestimonial]?.author || 'Anonymous'}
                    </h4>
                    <p className="text-stone-600">
                      Satisfied Client • Portfolio Project
                    </p>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex justify-center space-x-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 1.2 + i * 0.1,
                        type: "spring",
                        stiffness: 200 
                      }}
                    >
                      <Star className="w-5 h-5 text-gold-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <motion.button
                onClick={prevTestimonial}
                className="p-3 rounded-full backdrop-paper border border-stone-300 text-stone-600 hover:text-earth-600 zen-transition"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.button
                onClick={nextTestimonial}
                className="p-3 rounded-full backdrop-paper border border-stone-300 text-stone-600 hover:text-earth-600 zen-transition"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonialsData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full zen-transition ${
                    index === activeTestimonial
                      ? 'bg-gradient-to-r from-gold-500 to-copper-500'
                      : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group"
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Testimonial Card */}
              <div className="relative zen-card p-6 h-full overflow-hidden group-hover:shadow-xl zen-transition">
                {/* Card content */}
                <div className="relative z-10">
                  {/* Quote icon */}
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    <Quote className="w-8 h-8 text-gold-400 opacity-60" />
                  </motion.div>

                  {/* Testimonial text */}
                  <blockquote className="text-stone-700 mb-6 leading-relaxed">
                    "{testimonial.message || ''}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-gold-500 fill-current"
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-earth-400 to-gold-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.author?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold calligraphy-heading text-sm">
                        {testimonial.author || 'Anonymous'}
                      </h4>
                      <p className="text-stone-600 text-xs">
                        Satisfied Client
                      </p>
                      <p className="text-stone-500 text-xs">
                        Portfolio Project
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover effect - Ink splash */}
                {hoveredCard === testimonial.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full bg-gradient-radial from-gold-500/30 to-transparent"></div>
                  </motion.div>
                )}

                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Cherry className="w-6 h-6 text-copper-400" />
                </div>

                {/* Paper fold effect */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-stone-200 to-transparent opacity-30"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4 zen-card px-8 py-4">
            <Cherry className="w-6 h-6 text-copper-500" />
            <span className="text-stone-600 font-medium text-lg">
              "心を込めて" - <span className="calligraphy-heading">Dengan sepenuh hati</span>
            </span>
            <Cherry className="w-6 h-6 text-copper-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TailwindTestimonials;