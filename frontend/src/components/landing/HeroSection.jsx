import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import FloatingPaws from "./FloatingPaws";
import { FaPaw, FaStar, FaUserMd } from "react-icons/fa";
import GlassCard from "./GlassCard";

const HeroSection = () => {
  const pawWords = ["Paw", "Pet", "Friend"];

  const [pawIndex, setPawIndex] = useState(0);

  useEffect(() => {
    const pawTimer = setInterval(() => {
      setPawIndex((prev) => (prev + 1) % pawWords.length);
    }, 2500);

    return () => {
      clearInterval(pawTimer);
    };
  }, []);
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden relative">
      {/* FLOATING PAWS BACKGROUND */}
      <FloatingPaws />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-12">
          {/* LEFT SIDE - TEXT CONTENT */}
          <div className="space-y-8">
            {/* MAIN HEADLINE */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-800">Tailored </span>
                <span className="text-red-600 hero-word-red">"Care"</span>

                <br />
                <span className="text-gray-800">for Every </span>
                <span key={pawIndex} className="text-orange-500 changing-word">
                  {pawWords[pawIndex]}
                </span>
                <br />
                <span className="text-gray-800"> In Your</span>

                <span className="text-gray-800"> Family.</span>
              </h1>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-lg max-w-md leading-relaxed">
              We offer personalized care plans and expert services to meet the
              unique needs of every pet, ensuring their health, happiness, and
              well-being.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
              >
                <span>Create Schedule</span>
                <ArrowRight size={20} />
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-800 transition">
                <Play size={20} fill="currentColor" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE & CARDS */}
          <div className="relative h-full flex items-center justify-center">
            {/* MAIN CIRCULAR IMAGE */}
            <div className="relative w-full max-w-md">
              <div className="relative">
                {/* Circle Background */}

                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer Circle */}
                  <div className="w-[420px] h-[420px] rounded-full bg-red-200"></div>

                  {/* Middle Circle */}
                  <div className="absolute w-[340px] h-[340px] rounded-full bg-red-300"></div>

                  {/* Inner Circle */}
                  <div className="absolute w-[260px] h-[260px] rounded-full bg-red-500">
                    <img
                      src="/hero4.png"
                      className="
    absolute
    bottom-4
    left-1/2
    -translate-x-1/2
    w-[380px]
    object-contain
    z-20
    drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]
  "
                    />
                  </div>
                </div>
              </div>

              {/* TOP LEFT */}
              <GlassCard
                icon={<FaStar size={20} />}
                title="4.9 Rating"
                subtitle="2K+ Reviews"
                className="hidden md:flex top-8 -left-8 lg:-left-16"
              />

              {/* TOP RIGHT */}
              <GlassCard
                icon={<FaUserMd size={20} />}
                title="150+ Vets"
                subtitle="Certified Experts"
                className="hidden md:flex top-24 -right-8 lg:-right-12"
              />

              {/* BOTTOM LEFT */}
              <div className="animate-bounce">
                <GlassCard
                  icon={<FaPaw size={20} />}
                  title="10K+ Pets"
                  subtitle="Happy Customers"
                  className="hidden md:flex bottom-10 -left-4 lg:-left-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
