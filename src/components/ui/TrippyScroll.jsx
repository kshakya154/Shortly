import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";
import React from "react";

const TrippyScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"]);

  return (
    <div ref={targetRef} className="relative z-0 h-[800vh] bg-neutral-200">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
        <Trippy rotate={rotate} />
      </div>
    </div>
  );
};

const NUM_SECTIONS = 6; // fewer sections for text visibility
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const texts = [
  "We Build Creative Solutions",
  "Driven by Innovation and Passion",
  "Turning Ideas into Reality",
  "Design. Develop. Deliver.",
  "Connecting People Through Technology",
  "Your Success is Our Mission",
];

const generateSections = (count, color, rotate) => {
  if (count === NUM_SECTIONS) return null;

  const nextColor = color === "black" ? "white" : "black";

  return (
    <Section rotate={rotate} background={color} text={texts[count]}>
      {generateSections(count + 1, nextColor, rotate)}
    </Section>
  );
};

const Trippy = ({ rotate }) => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden">
      {generateSections(0, "black", rotate)}
    </motion.div>
  );
};

const Section = ({ background, children, rotate, text }) => {
  return (
    <motion.div
      className="relative h-full w-full flex items-center justify-center origin-center"
      style={{
        background,
        rotate,
        padding: PADDING,
      }}
    >
      {text && (
        <motion.h2
          className={`text-4xl md:text-6xl font-bold ${
            background === "black" ? "text-white" : "text-black"
          } text-center`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {text}
        </motion.h2>
      )}
      {children}
    </motion.div>
  );
};

export {TrippyScroll}
