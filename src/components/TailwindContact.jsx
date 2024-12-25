import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const TailwindContact = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    alert('Terima kasih! Pesan Anda telah terkirim.');
    setFormData({ nama: '', email: '', pesan: '' });
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    unfocused: {
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-purple-900/20">
      <motion.div
        className="max-w-4xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Mari Berkolaborasi
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Punya ide menarik? Atau ingin diskusi tentang proyek? Jangan ragu untuk menghubungi saya.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 relative overflow-hidden"
          variants={containerVariants}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
          
          <motion.div 
            className="relative"
            variants={inputVariants}
            animate={focusedField === 'nama' ? 'focused' : 'unfocused'}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              onFocus={() => setFocusedField('nama')}
              onBlur={() => setFocusedField(null)}
              placeholder="Nama Lengkap"
              className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </motion.div>

          <motion.div 
            className="relative"
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focused' : 'unfocused'}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </motion.div>

          <motion.div 
            className="relative"
            variants={inputVariants}
            animate={focusedField === 'pesan' ? 'focused' : 'unfocused'}
          >
            <div className="absolute left-0 top-3 pl-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              onFocus={() => setFocusedField('pesan')}
              onBlur={() => setFocusedField(null)}
              placeholder="Pesan Anda"
              rows="5"
              className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Kirim Pesan</span>
            <Send className="h-5 w-5" />
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default TailwindContact;