import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Copy,
} from "lucide-react";
import { RevealLinks } from "../ui/ContactLinks";

// ContactPage.jsx
// - TailwindCSS + Framer Motion + react-scroll-parallax + lucide-react
// - No form; rich contact info, animated cards, parallax blobs, CTA

export default function ContactPage() {
  const [copied, setCopied] = useState(null);

  const contactItems = [
    {
      id: "email",
      title: "Email",
      Icon: Mail,
      lines: ["kshakya154@gmail.com"],
      action: { type: "mailto", value: "kshakya154@gmail.com" },
    },
    {
      id: "phone",
      title: "Phone",
      Icon: Phone,
      lines: ["+91 7973182512"],
      action: { type: "tel", value: "+917973182512" },
    },
    {
      id: "location",
      title: "Location",
      Icon: MapPin,
      lines: ["Patiala, India"],
      action: null,
    },
  ];

  const socials = [
    { id: "github", Icon: Github, href: "https://github.com/kshakya154" },
    { id: "linkedin", Icon: Linkedin, href: "https://www.linkedin.com/in/kamal-kumar-82890727b/" },
    { id: "instagram", Icon: Instagram, href: "https://www.instagram.com/kshakya154/" },
  ];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  const openAction = (action) => {
    if (!action) return;
    try {
      if (action.type === "mailto") window.location.href = `mailto:${action.value}`;
      else if (action.type === "tel") window.location.href = `tel:${action.value}`;
    } catch (e) {
      // ignore navigation errors
    }
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.03 },
  };

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-900 via-purple-900 to-pink-700 text-white">
        {/* decorative parallax blobs */}
        <Parallax speed={-28}>
          <div className="pointer-events-none absolute -left-28 -top-24 w-96 h-96 rounded-full bg-pink-500/30 blur-3xl mix-blend-screen" />
        </Parallax>
        <Parallax speed={12}>
          <div className="pointer-events-none absolute right-[-6rem] top-32 w-72 h-72 rounded-full bg-cyan-400/25 blur-3xl mix-blend-screen" />
        </Parallax>
        <Parallax speed={8}>
          <div className="pointer-events-none absolute left-1/4 bottom-[-6rem] w-80 h-80 rounded-full bg-amber-400/20 blur-3xl mix-blend-screen" />
        </Parallax>

        {/* main container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          {/* header */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Let’s Connect</h1>
              <p className="mt-3 text-lg md:text-xl text-white/80 max-w-xl">
                We’d love to hear from you. Pick a channel below — whether it’s a quick hello,
                a project brief, or a collaboration idea.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => openAction({ type: "mailto", value: "hello@trippyweb.dev" })}
                className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/15 transition"
              >
                Start a Conversation
              </button>

              <a
                href="mailto:kshakya154@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white underline"
              >
                kshakya154@gmail.com
              </a>
            </div>
          </header>

          {/* contact cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {contactItems.map((c, i) => (
              <motion.div
                key={c.id}
                variants={cardVariant}
                whileHover="hover"
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-white/5 opacity-60 group-hover:opacity-80 transition" />

                <div className="relative p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-md ring-1 ring-white/6 shadow-lg overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/6 rounded-xl p-3 grid place-items-center">
                      <c.Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{c.title}</h3>
                      {c.lines.map((line, idx) => (
                        <p key={idx} className="text-sm text-white/80 truncate">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {c.action?.value && (
                        <button
                          onClick={() => handleCopy(c.action.value)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white/8 rounded-md text-sm hover:bg-white/12 transition"
                        >
                          <Copy className="w-4 h-4" />
                          {copied === c.action.value ? "Copied" : "Copy"}
                        </button>
                      )}
                    </div>

                    <div>
                      {c.action ? (
                        <button
                          onClick={() => openAction(c.action)}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 backdrop-blur-md hover:from-emerald-400/30 hover:to-cyan-400/30 transition"
                        >
                          Open
                        </button>
                      ) : (
                        <span className="text-sm text-white/60">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* info + socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-md ring-1 ring-white/6">
              <h3 className="text-xl font-bold mb-3">Quick Info</h3>
              <ul className="text-white/80 space-y-2">
                <li>
                  <strong>Response time:</strong> Usually within 24–48 hours.
                </li>
                <li>
                  <strong>Office Hours:</strong> Mon — Fri, 10:00 — 18:00 IST
                </li>
                <li>
                  <strong>Timezone:</strong> Asia/Kolkata (IST)
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-md ring-1 ring-white/6">
              <h3 className="text-xl font-bold mb-3">Find us on</h3>
              <div className="flex gap-3 items-center">
                {socials.map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/6 hover:bg-white/10 transition">
                    <s.Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* footer cta */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 text-center">
            <p className="text-white/80 mb-4">Have an idea? Let's make it happen.</p>
            <a href="mailto:hello@trippyweb.dev" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold shadow-lg hover:scale-[1.02] transition">
              Start a Conversation
            </a>
          </motion.div>
        </div>
      </div>
      <div>
        <RevealLinks/>
      </div>
    </ParallaxProvider>
  );
}
