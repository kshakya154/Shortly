import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { FiTarget, FiCoffee, FiUsers } from "react-icons/fi";
import {Link} from "react-router-dom"
const taglines = [
  "We Craft Digital Experiences",
  "Innovation with Passion",
  "Your Success, Our Mission",
];

const shapes = [
  { size: 80, x: "10%", y: "20%", color: "#ff4d6d" },
  { size: 50, x: "70%", y: "40%", color: "#6a0dad" },
  { size: 100, x: "50%", y: "70%", color: "#00f5d4" },
  { size: 60, x: "30%", y: "80%", color: "#ffd700" },
  { size: 40, x: "80%", y: "10%", color: "#00ffff" },
];

const testimonials = [
  {
    quote: "TrippyWeb transformed our business online. Highly recommended!",
    author: "John Doe, CEO, ExampleCorp",
  },
  {
    quote: "The team is creative, fast, and easy to work with.",
    author: "Sarah Parker, Founder, CreativeStudio",
  },
];

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const xTransform = useTransform(cursorX, [0, window.innerWidth], [-50, 50]);
  const yTransform = useTransform(cursorY, [0, window.innerHeight], [-50, 50]);
  const shapeRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "360deg"]);
  const shapeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.3, 0.8]
  );

  return (
    <ParallaxProvider>
      <div
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden"
        style={{
          minHeight: "400vh",
          background: "linear-gradient(to bottom, #6a0dad, #ff4d6d, #00f5d4)",
        }}
      >
        {/* Floating shapes */}
        {shapes.map((shape, idx) => (
          <motion.div
            key={idx}
            style={{
              rotate: shapeRotate,
              scale: shapeScale,
              x: xTransform,
              y: yTransform,
              width: shape.size,
              height: shape.size,
              top: shape.y,
              left: shape.x,
              backgroundColor: shape.color,
              opacity: 0.6,
            }}
            className="absolute rounded-full"
          />
        ))}

        {/* Taglines */}
        {taglines.map((text, idx) => (
          <Parallax key={idx} speed={(idx + 1) * 20}>
            <motion.h1
              className="absolute top-[20%] left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl text-center"
              initial={{ opacity: 0, y: 100, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: idx * 0.3,
                type: "spring",
                stiffness: 80,
              }}
            >
              {text}
            </motion.h1>
          </Parallax>
        ))}

        {/* Glow layers */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-white/20 top-[20%] left-[30%] blur-3xl"
          style={{ scale: shapeScale }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-white/10 top-[50%] left-[60%] blur-2xl"
          style={{ scale: shapeScale }}
        />

        {/* Content Section */}
        <div className="relative z-10 px-6 md:px-20 py-40 space-y-40 text-white">
          {/* Our Story */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              Our Story
            </h2>
            <p className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed">
              At TrippyWeb, we combine creativity and technology to build
              unforgettable digital experiences. Our mission is to bring your
              vision to life while making the journey exciting and meaningful.
            </p>
          </motion.section>

          {/* Our Values */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
          >
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md shadow-lg">
              <FiTarget className="mx-auto text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Focus</h3>
              <p>
                We always stay focused on delivering the best results for our
                clients.
              </p>
            </div>
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md shadow-lg">
              <FiCoffee className="mx-auto text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p>Our team works passionately to turn ideas into reality.</p>
            </div>
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md shadow-lg">
              <FiUsers className="mx-auto text-5xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p>We value teamwork and open communication with clients.</p>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-20 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.3 }}
                >
                  <p className="italic text-lg">"{t.quote}"</p>
                  <p className="mt-4 font-bold">{t.author}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <Link to="/contact" className="px-10 py-4 text-lg font-semibold rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition">
              Contact Us
            </Link>
          </motion.section>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default AboutPage;
