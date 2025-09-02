"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClipboardPaste, Scissors, Share2 } from "lucide-react";

const steps = [
  {
    title: "Paste Your Long URL",
    description: "Copy and paste any long, messy link into our tool.",
    icon: <ClipboardPaste size={28} />,
  },
  {
    title: "Click Shorten",
    description: "With one click, generate a short and sleek link instantly.",
    icon: <Scissors size={28} />,
  },
  {
    title: "Share & Track Analytics",
    description:
      "Easily share your short link and track clicks, devices, and locations.",
    icon: <Share2 size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-black text-white py-24">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-20"
        >
          How It Works
        </motion.h2>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-500 to-purple-500" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Connector Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full shadow-lg shadow-blue-500/40">
                  {step.icon}
                </div>

                {/* Content Box */}
                <div
                  className={`w-5/12 p-6 rounded-xl bg-gray-900 shadow-md ${
                    i % 2 === 0 ? "mr-auto pr-10" : "ml-auto pl-10"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
