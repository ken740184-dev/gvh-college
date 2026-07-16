"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function NationalEducationSocietyPage() {
  const { t } = useLanguage();

  const heroScrollRef = useRef<HTMLDivElement>(null);
  const showcaseScrollRef = useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset] = useState("0px");
  const [showcaseOffset, setShowcaseOffset] = useState("0px");

  useEffect(() => {
    const updateOffsets = () => {
      if (heroScrollRef.current) {
        const parentW = heroScrollRef.current.parentElement?.clientWidth || 0;
        const elemW = heroScrollRef.current.clientWidth || 0;
        setHeroOffset(elemW > parentW ? `-${elemW - parentW}px` : "0px");
      }
      if (showcaseScrollRef.current) {
        const parentW = showcaseScrollRef.current.parentElement?.clientWidth || 0;
        const elemW = showcaseScrollRef.current.clientWidth || 0;
        setShowcaseOffset(elemW > parentW ? `-${elemW - parentW}px` : "0px");
      }
    };

    const timer = setTimeout(updateOffsets, 100);
    window.addEventListener("resize", updateOffsets);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  const handleImageLoad = () => {
    if (heroScrollRef.current) {
      const parentW = heroScrollRef.current.parentElement?.clientWidth || 0;
      const elemW = heroScrollRef.current.clientWidth || 0;
      setHeroOffset(elemW > parentW ? `-${elemW - parentW}px` : "0px");
    }
    if (showcaseScrollRef.current) {
      const parentW = showcaseScrollRef.current.parentElement?.clientWidth || 0;
      const elemW = showcaseScrollRef.current.clientWidth || 0;
      setShowcaseOffset(elemW > parentW ? `-${elemW - parentW}px` : "0px");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const institutions = [
    {
      name: t("nes.inst.primary_name"),
      image: "/images/about/nes-primary-school.jpg",
      description: t("nes.inst.primary_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.high_name"),
      image: "/images/about/nes-high-school.jpg",
      description: t("nes.inst.high_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.pu_name"),
      image: "/images/about/nes-pu-college.jpg",
      description: t("nes.inst.pu_desc"),
      type: t("nes.type_aided"),
      isAided: true
    },
    {
      name: t("nes.inst.degree_name"),
      image: "/images/about/nes-first-grade.jpg",
      description: t("nes.inst.degree_desc"),
      type: t("nes.type_unaided"),
      isAided: false
    }
  ];

  const organizations = [
    {
      name: t("nes.org.ncc_name"),
      image: "/images/about/NCC.jpg",
      description: t("nes.org.ncc_desc"),
      badge: "220/28 Kar Bn NCC",
      est: t("Estd: 2019")
    },
    {
      name: t("nes.org.nss_name"),
      image: "/images/about/NSS.jpg",
      description: t("nes.org.nss_desc"),
      badge: "NSS Wing",
      est: t("Active")
    },
    {
      name: t("nes.org.sevadal_name"),
      image: "/images/about/Bharat_sevadal.jpg",
      description: t("nes.org.sevadal_desc"),
      badge: "Seva Dal",
      est: t("Active")
    },
    {
      name: t("nes.org.scouts_name"),
      image: "/images/about/bharat_scous_and_guides.jpg",
      description: t("nes.org.scouts_desc"),
      badge: "Scouts & Guides",
      est: t("Active")
    },
    {
      name: t("nes.org.fitindia_name"),
      image: "/images/about/fitindia.jpg",
      description: t("nes.org.fitindia_desc"),
      badge: "Fit India Wing",
      est: t("Active")
    },
    {
      name: t("nes.org.redcross_name"),
      image: "/images/about/redcross.jpg",
      description: t("nes.org.redcross_desc"),
      badge: "Youth Red Cross",
      est: t("Active")
    }
  ];

  return (
    <div className="pt-16 md:pt-20 bg-gray-50 min-h-screen text-slate-900 font-sans">
      {/* Hero Header */}
      <div className="relative h-[45vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image (Scrolling Panorama) */}
        <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
          <motion.div
            ref={heroScrollRef}
            animate={{ x: ["0px", heroOffset, "0px"] }}
            transition={{
              duration: 50,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute inset-y-0 left-0 h-full w-max flex flex-row max-w-none"
          >
            <Image 
              src="/images/about/NES_ALL_1.jpg"
              alt="NES Campus Panorama Banner - Part 1"
              width={1474}
              height={673}
              className="h-full w-auto max-w-none filter grayscale"
              priority
              onLoad={handleImageLoad}
            />
            <Image 
              src="/images/about/NES_ALL_1CONTINUED.jpg"
              alt="NES Campus Panorama Banner - Part 2"
              width={1322}
              height={445}
              className="h-full w-auto max-w-none filter grayscale"
              priority
              onLoad={handleImageLoad}
            />
          </motion.div>
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
        
        {/* Introduction Section with text on left, NES logo emblem on right */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column - text info */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                {t("nes.legacy_title")}
              </h2>
              <div className="w-12 h-[3px] bg-accent"></div>
              <div className="space-y-4 text-secondary-text text-sm md:text-base leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t("nes.legacy_p1") }} />
                <p dangerouslySetInnerHTML={{ __html: t("nes.legacy_p2") }} />
              </div>
            </div>

            {/* Right column - NES Emblem card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="flex flex-col items-center space-y-4 bg-white border border-gray-200 shadow-sm p-6 w-full max-w-[340px] md:max-w-[380px]">
                <div className="relative w-60 h-60 md:w-72 md:h-72 bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                  <Image 
                    src="/images/about/NES EMBLEM FINAL.png" 
                    alt="NES Logo" 
                    fill 
                    className="object-contain p-2 md:p-3"
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider max-w-[260px]">
                  {t("nes.emblem_caption")}
                </span>
              </div>
            </div>
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

        {/* Student & Youth Organizations Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {t("nes.org_title")}
            </h2>
            <div className="w-12 h-[3px] bg-accent"></div>
            <p className="text-secondary-text text-sm md:text-base max-w-3xl">
              {t("nes.org_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
            {organizations.map((org) => (
              <div key={org.name} className="bg-white border border-gray-200 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="relative h-64 w-full bg-gray-50/50 overflow-hidden">
                  <div className="absolute inset-4 overflow-hidden">
                    <Image 
                      src={org.image}
                      alt={org.name}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{org.name}</h3>
                    <p className="text-sm text-secondary-text leading-relaxed mb-4">{org.description}</p>
                  </div>
                  <div className="flex w-full items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="px-2.5 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded-none bg-blue-50 border-blue-200 text-blue-700">
                      {org.badge}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {org.est}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Campus Panoramas Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Campus Panoramic View
            </h2>
            <div className="w-12 h-[3px] bg-accent"></div>
            <p className="text-secondary-text text-sm md:text-base max-w-3xl">
              Take a look at the continuous wide campus of the National Education Society. The panoramic photos slide slowly side-by-side to showcase our entire campus.
            </p>
          </div>

          <div>
            {/* Seamless Side-by-Side Scrolling Panorama inside Boxed Container */}
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden border border-gray-200 shadow-md bg-gray-50 rounded-none">
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
                Seamless Panoramic Scroll
              </div>
              <motion.div
                ref={showcaseScrollRef}
                animate={{ x: ["0px", showcaseOffset, "0px"] }}
                transition={{
                  duration: 60,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-y-0 left-0 h-full w-max flex flex-row max-w-none"
              >
                <Image 
                  src="/images/about/NES_ALL_1.jpg"
                  alt="NES Campus Panorama - Part 1"
                  width={1474}
                  height={673}
                  className="h-full w-auto max-w-none"
                  priority
                  onLoad={handleImageLoad}
                />
                <Image 
                  src="/images/about/NES_ALL_1CONTINUED.jpg"
                  alt="NES Campus Panorama - Part 2"
                  width={1322}
                  height={445}
                  className="h-full w-auto max-w-none"
                  priority
                  onLoad={handleImageLoad}
                />
              </motion.div>
            </div>
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
