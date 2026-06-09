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

export default function NewsClient({ initialNews }: { initialNews: any[] }) {
  const [newsItems] = useState<any[]>(initialNews);

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">News & Announcements</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest happenings, academic notices, and upcoming events at GVH College.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
        <SectionHeading title="Latest Updates" />
        
        {newsItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl">No news articles found.</p>
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
              return newsItems.map((news) => {
                const layoutSize = news.layoutSize || (news.isBanner ? "medium" : "small");
                const currentBannerIndex = layoutSize === "medium" ? bannerIndex++ : 0;
                
                if (layoutSize === "medium") {
                  return (
                    <motion.article 
                      key={news._id} 
                      variants={cardVariants}
                      className={`border border-white/20 bg-gradient-to-br from-white/80 via-white/50 to-white/10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3 ${
                        currentBannerIndex % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      {/* Shimmer sweep reflection */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                        <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                      </div>

                      <div className="relative bg-gray-100/50 shrink-0 border-b-0 md:border-r border-white/15 w-full md:w-1/2 h-[250px] md:h-auto min-h-[300px]">
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                          {news.category}
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 flex flex-col justify-center flex-grow md:w-1/2">
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(news.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors text-2xl md:text-3xl">
                          {news.title}
                        </h3>
                        <p className="text-secondary-text mb-6 line-clamp-3 leading-relaxed text-sm font-sans">{news.excerpt}</p>
                      </div>
                    </motion.article>
                  );
                }

                if (layoutSize === "large") {
                  return (
                    <motion.article 
                      key={news._id} 
                      variants={cardVariants}
                      className="bg-[#f3f4f6] border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3"
                    >
                      {/* Shimmer sweep reflection */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                        <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                      </div>

                      {/* Image container padded to leave space around it as a border */}
                      <div className="w-full p-6 pb-4 shrink-0">
                        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] min-h-[220px] overflow-hidden rounded-md shadow-sm">
                          <Image 
                            src={news.image} 
                            alt={news.title} 
                            fill 
                            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 100vw"
                          />
                          <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                            {news.category}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 pb-6 flex flex-col justify-center flex-grow">
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(news.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors text-xl md:text-2xl">
                          {news.title}
                        </h3>
                        <p className="text-secondary-text leading-relaxed text-sm font-sans">{news.excerpt}</p>
                      </div>
                    </motion.article>
                  );
                }

                // Default is small card
                return (
                  <motion.article 
                    key={news._id} 
                    variants={cardVariants}
                    className="border border-white/20 bg-gradient-to-br from-white/80 via-white/50 to-white/10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer col-span-1"
                  >
                    {/* Shimmer sweep reflection */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                      <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                    </div>

                    <div className="relative bg-gray-100/50 shrink-0 border-b border-white/15 w-full aspect-video">
                      <Image 
                        src={news.image} 
                        alt={news.title} 
                        fill 
                        className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                        {news.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col justify-center flex-grow">
                      <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                        {formatDate(news.date)}
                      </span>
                      <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors text-xl">
                        {news.title}
                      </h3>
                      <p className="text-secondary-text mb-6 line-clamp-3 leading-relaxed text-sm font-sans">{news.excerpt}</p>
                    </div>
                  </motion.article>
                );
              });
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
