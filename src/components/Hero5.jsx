import React from "react";
import CardSwap, { Card } from "./ui/CardSwap";
import { ShieldCheck, BarChart3, Zap, Link2 } from "lucide-react";

function Hero5() {
  return (
    <div className="bg-black text-white py-20 px-6 relative">
      {/* Section Heading */}

      {/* Animated Card Swap */}
      <div style={{ height: "600px", position: "relative", overflow:"hidden" }}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We make shortening URLs more powerful, secure, and insightful with
            features designed for modern users.
          </p>
        </div>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={3000}
          pauseOnHover={true}
        >
          <Card>
            <div className="p-8 text-center">
              <ShieldCheck className="w-12 h-12 mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Your links are encrypted and protected with enterprise-grade
                security, ensuring safe redirection every time.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-8 text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-400">
                Track every click with insights like location, device, and time
                — all in a clean, easy-to-read dashboard.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
              <p className="text-gray-400">
                Experience lightning-fast redirection with optimized
                infrastructure built for performance and scale.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-8 text-center">
              <Link2 className="w-12 h-12 mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Short Links</h3>
              <p className="text-gray-400">
                Personalize your short links with custom slugs and branded
                domains for a professional touch.
              </p>
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
}

export default Hero5;
