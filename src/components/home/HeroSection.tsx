"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/home/hero/college-front.jpg",
      title: t("hero.slide1_title"),
      description: t("hero.slide1_desc"),
    },
    {
      id: 2,
      image: "/images/home/hero/image1.jpg",
      title: t("hero.slide2_title"),
      description: t("hero.slide2_desc"),
    },
    {
      id: 3,
      image: "/images/home/hero/image3.jpg",
      title: t("hero.slide3_title"),
      description: t("hero.slide3_desc"),
    },
    {
      id: 4,
      image: "/images/home/hero/image2.jpg",
      title: t("hero.slide4_title"),
      description: t("hero.slide4_desc"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[90vh] lg:h-[88vh] w-full overflow-hidden bg-black">

      {/* Background images with smooth cross-fade preloading */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover ${currentSlide === index ? "animate-kenburns" : ""}`}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Subtle top edge gradient for navbar text legibility */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

      {/* Bottom horizontal transparent glass bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/35 border-t border-white/10 py-6 sm:py-8 px-6 sm:px-12 lg:px-20 z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-md font-cinzel tracking-wide ${slides[currentSlide].description ? "mb-3" : ""}`}>
                {slides[currentSlide].title}
              </h1>
              {slides[currentSlide].description && (
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-5xl drop-shadow-sm font-medium">
                  {slides[currentSlide].description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Line-bar slide indicators (placed below the sentences) */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="relative h-[3px] overflow-hidden transition-all duration-500"
                style={{ width: currentSlide === index ? "40px" : "16px" }}
              >
                {/* Track */}
                <span className="absolute inset-0 bg-white/30 rounded-full" />
                {/* Active shimmer fill */}
                {currentSlide === index && (
                  <span className="absolute inset-0 rounded-full animate-shimmer-bar" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue (positioned in the bottom right corner) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-[25px] right-8 z-10 hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-medium" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-gold animate-bob mt-1" />
      </motion.div>
    </div>
  );
}
