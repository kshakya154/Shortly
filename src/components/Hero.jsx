import React from "react";
import Threads from "./ui/Threads";
import BlurText from "./ui/BlurText";
import Example from "./ui/EncryptedButton";
import { Link } from "react-router";

function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "black",
        color: "white",
        overflow: "hidden", 
      }}
    >
      {/* Background Threads */}
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 -mt-12">
        <div>
          <h1 className="text-2xl font-extrabold relative z-10 mb-11">
          <span className="relative px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-md ">
            Shortly
          </span>
        </h1>
          <BlurText
            text="Short links. Big impact."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-bold mb-8 "
          />
          <BlurText
            text="Shorten, share, and manage your URLs in seconds- no clutter, just results"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-xl max-w-2xl mx-auto font-medium"
          />
          <Link to="/url"><Example/></Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
