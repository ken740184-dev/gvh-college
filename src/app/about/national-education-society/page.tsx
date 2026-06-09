"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NationalEducationSocietyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const institutions = [
    {
      name: "NES Higher Primary School",
      image: "/images/about/nes-primary-school.png",
      description: "Established in 1990. Provides foundational primary education (grades 1–7) in Kannada medium, nurturing young minds in rural Hosaritti.",
      type: "Government-Aided"
    },
    {
      name: "G.V. Hallikeri High School",
      image: "/images/about/nes-high-school.png",
      description: "Delivering secondary education (grades 8–10) with a focus on leadership. Features an active NCC wing (28 Karnataka Battalion) and high academic success.",
      type: "Government-Aided"
    },
    {
      name: "G.V. Composite PU College",
      image: "/images/about/nes-pu-college.png",
      description: "Established July 1, 1963. Specialized pre-university course node in Commerce and Arts, bridging basic school and professional careers in Haveri.",
      type: "Government-Aided"
    },
    {
      name: "G.V.H. First Grade College",
      image: "/images/about/nes-first-grade.png",
      description: "Established in 2021. Offers UG & PG courses with modern infrastructure including digital library, 24/7 Wi-Fi, modern labs, and a sports arena.",
      type: "Private Un-Aided"
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
            National Education Society
          </h1>
          <div className="h-[3px] w-24 bg-accent mb-4 rounded-full"></div>
          <p className="text-base md:text-lg text-gray-300 font-medium max-w-2xl">
            Empowering Rural Communities Through Education Since 1963
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
              A Legacy of Rural Empowerment
            </h2>
            <div className="w-12 h-[3px] bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text text-sm md:text-base leading-relaxed">
              <p>
                The **National Education Society (NES)**, based in Hosaritti, Haveri district, is a premier educational trust committed to rural development. Guided by the principles of social equity and educational access, the society has established a robust ecosystem of learning.
              </p>
              <p>
                The foundational vision of the society is deeply connected to the legacy of the freedom fighter **Gudleppa Hallikeri**, who donated his ancestral property and wealth to establish educational opportunities in the region. Today, the society administers a full academic pipeline, from primary schooling to pre-university and higher degree colleges.
              </p>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
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
              Our Educational Ecosystem
            </h2>
            <div className="w-12 h-[3px] bg-accent rounded-full"></div>
            <p className="text-secondary-text text-sm md:text-base max-w-3xl">
              NES runs an integrated cluster of institutions in Hosaritti, offering students a seamless path from primary education to undergraduate and postgraduate degrees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {institutions.map((inst) => (
              <div key={inst.name} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
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
                    inst.type === "Private Un-Aided" 
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
      <div className="bg-navbar text-white py-16 relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-5">
          <p className="text-xl md:text-2xl font-serif italic text-blue-200 leading-relaxed">
            "To build rural institutions is to build the nation’s foundation. We teach not just to inform, but to transform local communities."
          </p>
          <div className="w-12 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-gray-400">
            National Education Society Core Philosophy
          </h4>
        </div>
      </div>
    </div>
  );
}
