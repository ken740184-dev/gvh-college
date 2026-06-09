"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Building2, Award, Calendar, ShieldCheck, Users, Info } from "lucide-react";

export default function NationalEducationSocietyPage() {
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
        staggerChildren: 0.15
      }
    }
  } as const;

  return (
    <div className="pt-20 bg-gray-50 min-h-screen text-primary-text font-sans overflow-hidden">
      {/* Hero Header */}
      <div className="relative h-[55vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image 
            src="/images/about/campus-overview.webp"
            alt="NES Campus Overview"
            fill
            className="object-cover filter grayscale blur-[0.5px]"
            priority
          />
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6 rounded-full"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Educational Patronage
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight mb-4"
          >
            National Education Society
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "140px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[4px] bg-accent mb-6 rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 font-medium max-w-3xl"
          >
            Pioneering Rural Education and Community Upliftment in Hosaritti
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
          className="bg-white/90 backdrop-blur-xl border border-white/50 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-sans font-extrabold text-slate-800 tracking-tight">
              A Legacy Born of Patriotism & Sacrifice
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              The **National Education Society (NES)**, based in the historic village of Hosaritti, Haveri district, is a cornerstone of rural empowerment. Founded upon the deep-seated Gandhian principles of self-sufficiency, social justice, and holistic education, the society has dedicated itself to bringing high-quality academic infrastructure to the rural community.
            </p>
            <p className="text-secondary-text text-base leading-relaxed">
              The society’s journey is intimately tied to the legendary freedom fighter **Gudleppa Hallikeri**, who donated his own ancestral properties and wealth to initialize the educational network. Today, the society oversees a comprehensive, end-to-end academic pipeline, ensuring that local youth have access to quality learning without having to migrate to distant cities.
            </p>
          </div>
          <div className="w-full md:w-80 h-64 relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/heritage-gurukul.webp"
                alt="NES Heritage Campus Representation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        
        {/* Governance & Leadership */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col lg:flex-row gap-10 items-center"
        >
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-wider uppercase">
              <Users className="w-4 h-4" /> Executive Council
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight uppercase font-sans">
              Society Leadership
            </h3>
            <div className="w-16 h-1 bg-[#1e40af] rounded-full"></div>
            <p className="text-secondary-text text-sm md:text-base leading-relaxed">
              The National Education Society is steered by a dedicated executive board of leaders, educators, and social visionaries who ensure the smooth administration, growth, and community alignment of all member institutions. Under their patronage, the academic network continues to thrive and innovate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">President</span>
                <span className="text-lg font-bold text-slate-800 block mt-1">Sri Rajendra Prasad Hallikeri</span>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Working President</span>
                <span className="text-lg font-bold text-slate-800 block mt-1">Sri Ramesh Ekabote</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-96 aspect-video lg:aspect-square relative overflow-hidden bg-gray-100 border border-gray-200 p-2 shrink-0">
            <Image 
              src="/images/about/hosaritti-village.webp"
              alt="Hosaritti Community"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* The Academic Pipeline */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-accent font-semibold text-xs tracking-wider uppercase block">Our Ecosystem</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              The Educational Institutions
            </h3>
            <p className="text-secondary-text max-w-2xl mx-auto text-sm md:text-base">
              NES runs an integrated cluster of educational nodes in Hosaritti, serving students from early childhood to post-graduate studies.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Institution 1 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-200 p-6 flex flex-col justify-between rounded-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 rounded-none shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight leading-snug">NES Higher Primary School</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Established in 1990. Provides foundational primary education (grades 1–7) in Kannada medium, focusing on rural children.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50/50 px-2 py-1 border border-green-100/50">
                <span>Government-Aided</span>
              </div>
            </motion.div>

            {/* Institution 2 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-200 p-6 flex flex-col justify-between rounded-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 rounded-none shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight leading-snug">G.V. Hallikeri High School</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Offers secondary education (grades 8–10). Runs an active National Cadet Corps (NCC) 28 Karnataka Battalion wing to nurture civic service.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50/50 px-2 py-1 border border-green-100/50">
                <span>Government-Aided</span>
              </div>
            </motion.div>

            {/* Institution 3 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-200 p-6 flex flex-col justify-between rounded-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 rounded-none shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight leading-snug">G.V. Composite PU College</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Established on July 1, 1963. Connects high school graduates to higher education, specializing in pre-university Arts and Commerce streams.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50/50 px-2 py-1 border border-green-100/50">
                <span>Government-Aided</span>
              </div>
            </motion.div>

            {/* Institution 4 */}
            <motion.div variants={fadeInUp} className="bg-white border border-gray-200 p-6 flex flex-col justify-between rounded-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 rounded-none shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight leading-snug">G.V.H. First Grade College</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Established in 2021. Offers UG & PG courses. Features a modern digital library, a 24/7 Wi-Fi campus, state-of-the-art computer labs, and a sports arena.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50/50 px-2 py-1 border border-blue-100/50">
                <span>Private Un-Aided</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Banner: Funding & Governance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="bg-blue-50/40 border border-blue-100 p-6 md:p-10 rounded-2xl flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="w-12 h-12 bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center text-blue-800 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-slate-800">Understanding Our Governance & Funding Model</h4>
            <p className="text-sm text-secondary-text leading-relaxed">
              The primary school, high school, and pre-university composite college are **State Government-Aided** institutions, operating under state regulatory guidelines and funding models to provide accessible education to rural communities. 
            </p>
            <p className="text-sm text-secondary-text leading-relaxed">
              In contrast, the newly built **Gudleppa Veerappa Hallikeri Arts and Commerce First Grade College** (established in 2021) is a **Private Un-Aided** institution, operating entirely on independent resources and infrastructure funding mobilized by the society.
            </p>
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
            "To build rural institutions is to build the nation’s foundation. We teach not just to inform, but to transform local communities."
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-lg tracking-widest uppercase text-gray-300">
            NES Core Vision
          </h4>
        </div>
      </div>
    </div>
  );
}
