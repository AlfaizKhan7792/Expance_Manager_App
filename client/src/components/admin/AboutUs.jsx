import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-red-800 mb-4"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-600 max-w-3xl text-center mb-8"
      >
        We are a team of passionate developers, designers, and strategists committed to building
        innovative digital solutions. From web applications to user-centric interfaces, we turn
        ideas into impact.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          {
            title: 'Our Mission',
            text: 'To create technology that empowers businesses and delights users.',
          },
          {
            title: 'Our Vision',
            text: 'To be a globally trusted brand for full-stack solutions and digital innovation.',
          },
          {
            title: 'Our Values',
            text: 'Integrity, innovation, collaboration, and user-focused development.',
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 hover:border hover:border-red-800 rounded-2xl shadow hover:shadow-md transition"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold text-red-800 mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
