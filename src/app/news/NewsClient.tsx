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
            {newsItems.map((news) => (
              <motion.article 
                key={news._id} 
                variants={cardVariants}
                className="border border-white/20 bg-gradient-to-br from-white/80 via-white/50 to-white/10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer"
              >
                {/* Shimmer sweep reflection */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                  <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                </div>

                <div className="relative aspect-square w-full bg-gray-100/50 overflow-hidden border-b border-white/15">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                    {news.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                    {formatDate(news.date)}
                  </span>
                  <h3 className="text-xl font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-secondary-text mb-6 line-clamp-3 flex-grow leading-relaxed text-sm font-sans">{news.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
