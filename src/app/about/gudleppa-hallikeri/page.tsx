"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Award, Flag, Calendar, Compass, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GudleppaHallikeriPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen text-primary-text font-sans overflow-hidden">
      {/* Hero Header */}
      <div className="relative h-[60vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 opacity-35">
          <Image 
            src="/images/about/gudleppa-hero.webp"
            alt="Gudleppa Hallikeri Hero Background"
            fill
            className="object-cover filter grayscale blur-[1px]"
            priority
          />
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6 rounded-full"
          >
            <Shield className="w-3.5 h-3.5" /> {t("gh.hero_badge")}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight mb-4"
          >
            {t("gh.title")}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[4px] bg-accent mb-6 rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 font-medium max-w-2xl font-serif italic"
          >
            {t("gh.hero_subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Intro Glassmorphic Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="bg-white/85 backdrop-blur-xl border border-white/50 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.intro_title")}
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              {t("gh.intro_p1")}
            </p>
            <p className="text-secondary-text text-base leading-relaxed">
              {t("gh.intro_p2")}
            </p>
          </div>
          <div className="w-full md:w-80 h-96 relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/gudleppa-biography.jpg"
                alt="Gudleppa Hallikeri Portrait"
                fill
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Sections with Lazy Load animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">

        {/* Section 1: Early Life */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Calendar className="w-4 h-4" /> {t("gh.early_life_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.early_life_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                {t("gh.early_life_p1")}
              </p>
              <p>
                {t("gh.early_life_p2")}
              </p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/hosaritti-village.webp"
                alt="Historic village in Karnataka representation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 2: The Freedom Struggle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Flag className="w-4 h-4" /> {t("gh.freedom_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.freedom_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                {t("gh.freedom_p1")}
              </p>
              <p>
                {t("gh.freedom_p2")}
              </p>
            </div>
          </div>
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/freedom-struggle.webp"
                alt="Protesters marching for Indian independence movement"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 3: Educational Contribution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <BookOpen className="w-4 h-4" /> {t("gh.edu_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.edu_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                {t("gh.edu_p1")}
              </p>
              <p>
                {t("gh.edu_p2")}
              </p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/heritage-gurukul.webp"
                alt="Gandhi Grameena Gurukul Campus traditional architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Facts Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white/40 backdrop-blur-md border border-white/50 p-8 md:p-12 shadow-md rounded-xl"
        >
          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-800 tracking-tight text-center mb-10">
            {t("gh.facts_title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact1_title")}</h4>
              <p className="text-sm text-secondary-text">
                {t("gh.fact1_desc")}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact2_title")}</h4>
              <p className="text-sm text-secondary-text">
                {t("gh.fact2_desc")}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact3_title")}</h4>
              <p className="text-sm text-secondary-text">
                {t("gh.fact3_desc")}
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Quote Banner */}
      <div className="bg-navbar text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <p className="text-2xl md:text-3xl font-serif italic text-blue-200 leading-relaxed">
            {t("gh.quote")}
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-lg tracking-widest uppercase text-gray-300">
            {t("gh.philosophy")}
          </h4>
        </div>
      </div>
    </div>
  );
}
