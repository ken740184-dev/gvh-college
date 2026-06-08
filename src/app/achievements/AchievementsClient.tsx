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
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Achievements</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Celebrating excellence across academics, sports, and institutional milestones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
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
                const currentBannerIndex = item.isBanner ? bannerIndex++ : 0;
                return (
                  <motion.div
                    key={item._id}
                    variants={cardVariants}
                    className={`border border-white/20 bg-gradient-to-br from-white/80 via-white/50 to-white/10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group ${
                      item.isBanner
                        ? `md:col-span-2 lg:col-span-3 ${
                            currentBannerIndex % 2 === 1
                              ? "md:flex-row-reverse"
                              : "md:flex-row"
                          }`
                        : ""
                    }`}
                  >
                    {/* Shimmer sweep reflection */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                      <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                    </div>

                    <div
                      className={`relative bg-gray-100/50 shrink-0 border-b border-white/15 ${
                        item.isBanner
                          ? "w-full md:w-1/2 h-[250px] md:h-auto min-h-[300px] border-b-0 md:border-r border-white/15"
                          : "w-full aspect-square"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        sizes={
                          item.isBanner
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                      />
                    </div>
                    <div 
                      className={`p-6 flex flex-col justify-center flex-grow ${
                        item.isBanner 
                          ? "md:w-1/2 md:p-8" 
                          : ""
                      }`}
                    >
                      <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                        {formatDate(item.date)}
                      </span>
                      <h3 className={`font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug mb-3 ${item.isBanner ? "text-2xl md:text-3xl" : "text-xl"}`}>
                        {item.title}
                      </h3>
                      <p className="text-secondary-text leading-relaxed text-sm md:text-base font-sans">
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
