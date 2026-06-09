"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as any;

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(dateStr)) {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  }
  return dateStr;
};

export default function AchievementsClient({ initialAchievements }: { initialAchievements: any[] }) {
  const [activeTab, setActiveTab] = useState("student");
  const [achievements] = useState<any[]>(initialAchievements);

  const filteredAchievements = achievements.filter(a => a.category === activeTab);

  return (
    <div className="pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 min-h-[50vh]">
        <SectionHeading 
          title="Our Achievements" 
          subtitle="Celebrating excellence across academics, sports, and institutional milestones." 
        />
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "student" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Student Achievements
          </button>
          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "faculty" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Faculty Achievements
          </button>
          <button
            onClick={() => setActiveTab("institutional")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "institutional" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Institutional Achievements
          </button>
        </div>

        {/* Tab Content */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl">No achievements found in this category.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {(() => {
              let bannerIndex = 0;
              return filteredAchievements.map((item) => {
                const layoutSize = item.layoutSize || (item.isBanner ? "medium" : "small");
                const currentBannerIndex = layoutSize === "medium" ? bannerIndex++ : 0;

                if (layoutSize === "medium") {
                  return (
                    <motion.div
                      key={item._id}
                      variants={cardVariants}
                      className={`border border-gray-200 bg-[#f3f4f6] shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3 ${
                        currentBannerIndex % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      <div className="w-full md:w-1/2 p-5 shrink-0">
                        <div className="relative w-full h-[250px] md:h-full min-h-[250px] md:min-h-[300px] overflow-hidden rounded-none shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center flex-grow md:w-1/2">
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(item.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug text-2xl md:text-3xl">
                          {item.title}
                        </h3>
                        <div className="w-10 h-[2px] bg-[#1e40af] mt-2 mb-3" />
                        <p className="text-secondary-text leading-relaxed text-sm md:text-base font-sans whitespace-pre-wrap">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }

                if (layoutSize === "large") {
                  return (
                    <motion.div
                      key={item._id}
                      variants={cardVariants}
                      className="bg-[#f3f4f6] border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3"
                    >
                      {/* Image container padded to leave space around it as a border */}
                      <div className="w-full p-6 pb-4 shrink-0">
                        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] min-h-[220px] overflow-hidden rounded-none shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            sizes="(max-width: 768px) 100vw, 100vw"
                          />
                        </div>
                      </div>
                      
                      <div className="px-6 pb-6 flex flex-col justify-center flex-grow">
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(item.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug text-xl md:text-2xl">
                          {item.title}
                        </h3>
                        <div className="w-10 h-[2px] bg-[#1e40af] mt-2 mb-3" />
                        <p className="text-secondary-text leading-relaxed text-sm md:text-base font-sans whitespace-pre-wrap">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }

                // Default is small card
                return (
                  <motion.div
                    key={item._id}
                    variants={cardVariants}
                    className="border border-gray-200 bg-[#f3f4f6] shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer col-span-1"
                  >
                    <div className="w-full p-4 pb-2.5 shrink-0">
                      <div className="relative w-full aspect-video overflow-hidden rounded-none shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="px-4 pb-4 flex flex-col justify-center flex-grow">
                      <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                        {formatDate(item.date)}
                      </span>
                      <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug text-xl">
                        {item.title}
                      </h3>
                      <div className="w-8 h-[2px] bg-[#1e40af] mt-1.5 mb-2.5" />
                      <p className="text-secondary-text leading-relaxed text-sm font-sans whitespace-pre-wrap">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
