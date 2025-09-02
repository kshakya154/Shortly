"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Digital Marketer",
    feedback:
      "This URL shortener is lightning fast and reliable. It has streamlined my campaigns effortlessly!",
  },
  {
    name: "Priya Verma",
    role: "Software Engineer",
    feedback:
      "The analytics feature is a game-changer. I can track every click with ease and confidence.",
  },
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    feedback:
      "Super minimal, super effective. Exactly what I needed for my product launches.",
  },
];

function Testimonials() {
  return (
    <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Loved by Users</h2>
        <p className="text-gray-400 text-lg">
          Here’s what our users say about their experience
        </p>
      </motion.div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`relative`}
          >
            <blockquote className="text-2xl font-light italic text-gray-300 leading-relaxed ml-4">
              “{t.feedback}”
            </blockquote>
            <div className="mt-4 ml-4">
              <h4 className="text-lg font-semibold">{t.name}</h4>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
            {/* Subtle line accent */}
            <span className="absolute left-0 top-2 h-20 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
