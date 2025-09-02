"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link2, BarChart3, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Instant Link Shortening",
    description: "Turn long, messy URLs into clean and shareable links in seconds.",
    icon: <Link2 size={32} className="text-blue-400" />,
  },
  {
    title: "Advanced Analytics",
    description: "Track clicks, locations, and devices to understand your audience.",
    icon: <BarChart3 size={32} className="text-green-400" />,
  },
  {
    title: "Secure & Reliable",
    description: "Every link is encrypted and backed by enterprise-grade security.",
    icon: <ShieldCheck size={32} className="text-yellow-400" />,
  },
  {
    title: "Lightning Fast",
    description: "Built for speed with optimized performance for global access.",
    icon: <Zap size={32} className="text-pink-400" />,
  },
];

const Features = () => {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.05, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-blue-500 blur-3xl opacity-20"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.05, 0.15] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500 blur-3xl opacity-20"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
