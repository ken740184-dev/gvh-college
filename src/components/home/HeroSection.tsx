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
      image: "/images/home/hero/image1.png",
      title: t("hero.slide1_title"),
      description: t("hero.slide1_desc"),
    },
    {
      id: 2,
      image: "/images/home/hero/image2.png",
      title: t("hero.slide2_title"),
      description: t("hero.slide2_desc"),
    },
    {
      id: 3,
      image: "/images/home/hero/image3.png",
      title: t("hero.slide3_title"),
      description: t("hero.slide3_desc"),
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[90vh] lg:h-[88vh] w-full overflow-hidden bg-black">

      {/* Background images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover animate-kenburns"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Layered gradient: dark top edge (for navbar readability) + strong bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />
      {/* Side vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* Slide text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            {/* Eyebrow line */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-8 h-px bg-gold opacity-80" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
                GVH College
              </span>
              <span className="block w-8 h-px bg-gold opacity-80" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 drop-shadow-lg min-h-[120px] md:min-h-[160px] flex items-center justify-center leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto drop-shadow-md min-h-[56px] leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 relative z-10"
        >
          <Button href="/admissions" size="lg" className="text-base font-bold tracking-wide">
            {t("hero.apply_now")}
          </Button>
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="text-base font-bold bg-transparent border-white/60 text-white hover:bg-white hover:text-black tracking-wide"
          >
            {t("hero.explore")}
          </Button>
        </motion.div>
      </div>

      {/* ── Line-bar slide indicators ──────────────────────────── */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-[3px] overflow-hidden transition-all duration-500"
            style={{ width: currentSlide === index ? "48px" : "20px" }}
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

      {/* ── Scroll cue ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-bob mt-1" />
      </motion.div>
    </div>
  );
}
