import React from "react";
import Hero from "../Hero";
import Features from "../Hero2";
import HowItWorks from "../Hero3";
import Testimonials from "../Hero4";
import Hero5 from "../Hero5";
function HomePage() {
  return (
    <div>
      <Hero />
      <Features/> 
      <HowItWorks/>
      <Hero5/>
      <Testimonials/>
    </div>
  );
}

export default HomePage;
