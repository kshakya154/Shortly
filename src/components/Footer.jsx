"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    // Animate footer on scroll into view
    gsap.fromTo(
      footerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const socials = [
    { icon: <Github size={22} />, link: "https://github.com/kshakya154" },
    {
      icon: <Linkedin size={22} />,
      link: "https://www.linkedin.com/in/kamal-kumar-82890727b/",
    },
    {
      icon: <Instagram size={22} />,
      link: "https://www.instagram.com/kshakya154/",
    },
    { icon: <Mail size={22} />, link: "mailto:kshakya154@gmail.com" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-black text-gray-300 py-10 px-6 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Logo / Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl font-bold tracking-wide"
        >
          <span className="text-blue-500">Shortly</span>
        </motion.h2>

        {/* Navigation */}
        <motion.ul
          className="flex gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {["Home", "Analytics", "Contact", "About"].map((item, i) => (
            <li key={i}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Social Icons */}
        <motion.div
          className="flex gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-neutral-800 hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-500 mt-6"
        >
          © {new Date().getFullYear()} Shortly. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
