// import React from 'react';
// import { motion } from 'framer-motion';

// const skillsData = [
//   { name: 'ReactJS', level: 90 },
//   { name: 'Tailwind CSS', level: 85 },
//   { name: 'Node.js', level: 80 },
//   { name: 'Express.js', level: 75 },
//   { name: 'MongoDB', level: 70 },
// ];

// const TailwindSkills = () => {
//   return (
//     <section id="skills" className="py-16 bg-[#0F0F1A] text-white">
//       <div className="max-w-6xl mx-auto px-8 text-center">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           Keahlian Saya
//         </motion.h2>
//         <motion.p
//           className="text-gray-300 max-w-xl mx-auto mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Berikut adalah beberapa teknologi yang saya gunakan untuk mengembangkan proyek modern.
//         </motion.p>

//         {/* Grid skills */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skillsData.map((skill, idx) => (
//             <motion.div
//               key={skill.name}
//               className="p-6 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10 flex flex-col items-center"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//             >
//               <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text mb-2">
//                 {skill.name}
//               </h3>

//               {/* Progress bar */}
//               <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-3">
//                 <motion.div
//                   className="bg-gradient-to-r from-pink-500 to-indigo-500 h-4"
//                   style={{ width: 0 }}
//                   animate={{ width: `${skill.level}%` }}
//                   transition={{ duration: 1.2 }}
//                 />
//               </div>
//               <span className="text-sm text-gray-300">
//                 Proficiency: {skill.level}%
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TailwindSkills;
