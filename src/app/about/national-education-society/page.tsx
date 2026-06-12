"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function NationalEducationSocietyPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const institutions = [
    {
      name: t("nes.inst.primary_name"),
      image: "/images/about/nes-primary-school.png",
      description: t("nes.inst.primary_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.high_name"),
      image: "/images/about/nes-high-school.png",
      description: t("nes.inst.high_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.pu_name"),
      image: "/images/about/nes-pu-college.png",
      description: t("nes.inst.pu_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.degree_name"),
      image: "/images/about/nes-first-grade.png",
      description: t("nes.inst.degree_desc"),
      type: t("nes.type_unaided"),
      isAided: false
    }
  ];

  return (
    <div className="pt-20 bg-gray-50 min-h-screen text-slate-900 font-sans">
      {/* Hero Header */}
      <div className="relative h-[45vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/about/nes-admin-building.png"
            alt="NES Campus Banner"
            fill
            className="object-cover filter grayscale"
            priority
          />
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4">
            {t("nes.title")}
          </h1>
          <div className="h-[3px] w-24 bg-accent mb-4"></div>
          <p className="text-base md:text-lg text-gray-300 font-medium max-w-2xl">
            {t("nes.subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
        
        {/* Introduction Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {t("nes.legacy_title")}
            </h2>
            <div className="w-12 h-[3px] bg-accent"></div>
            <div className="space-y-4 text-secondary-text text-sm md:text-base leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t("nes.legacy_p1") }} />
              <p dangerouslySetInnerHTML={{ __html: t("nes.legacy_p2") }} />
            </div>
          </div>
          <div className="relative aspect-video rounded-none overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
            <Image 
              src="/images/about/heritage-gurukul.webp"
              alt="Historical Campus Overview"
              fill
              className="object-cover"
            />
          </div>
        </motion.section>

        {/* Institutions Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {t("nes.eco_title")}
            </h2>
            <div className="w-12 h-[3px] bg-accent"></div>
            <p className="text-secondary-text text-sm md:text-base max-w-3xl">
              {t("nes.eco_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {institutions.map((inst) => (
              <div key={inst.name} className="bg-white border border-gray-200 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
                  <Image 
                    src={inst.image}
                    alt={inst.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{inst.name}</h3>
                    <p className="text-sm text-secondary-text leading-relaxed mb-4">{inst.description}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded-none ${
                    !inst.isAided 
                      ? "bg-blue-50 border-blue-200 text-blue-700" 
                      : "bg-green-50 border-green-200 text-green-700"
                  }`}>
                    {inst.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* Quote Banner */}
      <div className="bg-gray-100 text-slate-800 py-16 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <p className="text-xl md:text-2xl font-serif italic text-slate-700 leading-relaxed">
            {t("nes.quote")}
          </p>
          <div className="w-12 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-slate-500">
            {t("nes.philosophy")}
          </h4>
        </div>
      </div>
    </div>
  );
}
