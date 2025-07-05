import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle, User, Brush, Cherry } from 'lucide-react';

const TailwindContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'arvanardana1@gmail.com',
      href: 'mailto:arvanardana1@gmail.com',
      kanji: '手',
      color: 'from-gold-500 to-copper-500'
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: '+62 851-5365-36353',
      href: 'tel:+6285153653635',
      kanji: '話',
      color: 'from-earth-500 to-gold-600'
    },
    {
      icon: MapPin,
      label: 'Lokasi',
      value: 'Malang, Indonesia',
      href: '#',
      kanji: '所',
      color: 'from-copper-500 to-earth-600'
    }
  ];

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

  const itemVariants = {
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

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 bg-zen-gradient overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating brush strokes */}
        <motion.svg
          className="absolute top-10 right-20 w-40 h-32 text-copper-300 opacity-10"
          viewBox="0 0 200 150"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <motion.path
            d="M30,75 Q70,30 110,75 Q150,120 190,75"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 4, delay: 0.5 }}
          />
        </motion.svg>

        {/* Zen circles */}
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 border-2 border-gold-300 opacity-20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360] 
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Cherry blossoms */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Cherry className="text-copper-400" size={Math.random() * 12 + 8} />
          </motion.div>
        ))}
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
            <span className="text-4xl font-display calligraphy-heading mr-4">連</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-copper-400 to-transparent"></div>
            <span className="text-4xl font-display calligraphy-heading ml-4">絡</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold calligraphy-heading mb-6">
            Mari Berkolaborasi
          </h2>
          
          <motion.p
            className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Seperti{' '}
            <span className="calligraphy-heading">tinta yang mengalir</span> di atas kertas, 
            mari wujudkan ide-ide kreatif menjadi karya yang bermakna
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-display font-semibold calligraphy-heading mb-8">
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center space-x-4 zen-card p-6 hover:shadow-lg zen-transition"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Icon with Japanese character */}
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl zen-transition`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Kanji overlay */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-xs font-display text-stone-600 border-2 border-white shadow-sm">
                          {item.kanji}
                        </div>
                      </div>
                      
                      {/* Contact details */}
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-stone-700 group-hover:text-earth-700 zen-transition">
                          {item.label}
                        </h4>
                        <p className="text-stone-600 group-hover:text-stone-700 zen-transition">
                          {item.value}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div
                        className="text-stone-400 group-hover:text-earth-600 zen-transition"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Additional info with quote */}
            <motion.div
              className="zen-card p-8 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <Brush className="w-6 h-6 text-copper-500" />
                  <span className="font-display font-semibold calligraphy-heading">
                    Philosophy
                  </span>
                </div>
                <blockquote className="text-stone-600 italic leading-relaxed">
                  "一期一会" - <span className="calligraphy-heading">Ichigo Ichie</span>
                  <br />
                  <span className="text-sm">
                    Setiap pertemuan adalah satu-satunya dalam hidup, jadi mari kita ciptakan sesuatu yang istimewa bersama.
                  </span>
                </blockquote>
              </div>
              
              {/* Decorative brush stroke */}
              <svg className="absolute bottom-4 right-4 w-16 h-16 text-copper-300 opacity-20">
                <motion.path
                  d="M4,12 Q8,4 12,12 T20,12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="zen-card p-8 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-semibold calligraphy-heading mb-8">
                  Kirim Pesan
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <motion.div
                    className="relative"
                    variants={itemVariants}
                  >
                    <label className="block text-stone-700 font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-earth-400 zen-transition bg-white/50 backdrop-blur-sm"
                        placeholder="Masukkan nama Anda"
                        required
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-gold-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Email field */}
                  <motion.div
                    className="relative"
                    variants={itemVariants}
                  >
                    <label className="block text-stone-700 font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-earth-400 zen-transition bg-white/50 backdrop-blur-sm"
                        placeholder="email@example.com"
                        required
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-copper-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Subject field */}
                  <motion.div
                    className="relative"
                    variants={itemVariants}
                  >
                    <label className="block text-stone-700 font-medium mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Subjek
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-earth-400 zen-transition bg-white/50 backdrop-blur-sm"
                        placeholder="Topik diskusi"
                        required
                      />
                      {focusedField === 'subject' && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-earth-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Message field */}
                  <motion.div
                    className="relative"
                    variants={itemVariants}
                  >
                    <label className="block text-stone-700 font-medium mb-2">
                      Pesan
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-earth-400 zen-transition bg-white/50 backdrop-blur-sm resize-none"
                        placeholder="Ceritakan proyek atau kolaborasi yang Anda inginkan..."
                        required
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-stone-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full brush-btn relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <div className="zen-loading" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Kirim Pesan</span>
                        </>
                      )}
                    </span>
                    
                    {/* Flowing ink effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-copper-400 to-gold-400 opacity-0"
                      animate={{ opacity: isSubmitting ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </form>
              </div>

              {/* Decorative elements */}
              <svg className="absolute top-4 right-4 w-12 h-12 text-gold-300 opacity-20">
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section with quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4 zen-card px-8 py-4">
            <Cherry className="w-6 h-6 text-copper-500" />
            <span className="text-stone-600 font-medium text-lg">
              "始まりは半分" - <span className="calligraphy-heading">Memulai adalah setengah dari kesuksesan</span>
            </span>
            <Cherry className="w-6 h-6 text-copper-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TailwindContact;