"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

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
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[85vh] lg:h-[80vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 drop-shadow-lg min-h-[120px] md:min-h-[160px] flex items-center justify-center">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md min-h-[60px]">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 relative z-10"
        >
          <Button href="/admissions" size="lg" className="text-lg">
            {t("hero.apply_now")}
          </Button>
          <Button href="/about" variant="outline" size="lg" className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-black">
            {t("hero.explore")}
          </Button>
        </motion.div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-accent" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
