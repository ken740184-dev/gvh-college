"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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

const slideLeft = {
  hidden: { opacity: 0, x: -70 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
} as any;

const slideRight = {
  hidden: { opacity: 0, x: 70 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
} as any;

const slideUp = {
  hidden: { opacity: 0, y: 70 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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

function ExpandableText({ text, limit = 180 }: { text: string; limit?: number }) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
  if (text.length <= limit) {
    return <p className="text-secondary-text leading-relaxed text-sm font-sans whitespace-pre-wrap">{text}</p>;
  }

  const shownText = isExpanded ? text : text.slice(0, limit) + "...";

  return (
    <div className="space-y-1">
      <p className="text-secondary-text leading-relaxed text-sm font-sans whitespace-pre-wrap">
        {shownText}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="text-accent hover:text-accent/80 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1 transition-colors mt-1 focus:outline-none"
      >
        {isExpanded ? t("news.read_less") : t("news.read_more")}
      </button>
    </div>
  );
}

export default function NewsClient({ initialNews }: { initialNews: any[] }) {
  const { t } = useLanguage();
  const [newsItems] = useState<any[]>(initialNews);

  const getCategoryTranslation = (cat: string) => {
    switch (cat) {
      case "All": return t("cat.all");
      case "Campus": return t("cat.campus");
      case "Academic": return t("cat.academic");
      case "Cultural": return t("cat.cultural");
      case "Sports": return t("cat.sports");
      case "Competitions": return t("cat.competitions");
      case "Workshops & Seminars": return t("cat.workshops");
      case "Exhibitions": return t("cat.exhibitions");
      case "Community Service / NSS": return t("cat.community");
      case "Festivals & Celebrations": return t("cat.festivals");
      default: return cat;
    }
  };

  return (
    <div className="pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 min-h-[50vh]">
        <SectionHeading 
          title={t("news.section_title")} 
          subtitle={t("news.section_subtitle")} 
        />
        
        {newsItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl">{t("news.no_found")}</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {(() => {
              let bannerIndex = 0;
              return newsItems.map((news, index) => {
                const layoutSize = news.layoutSize || (news.isBanner ? "medium" : "small");
                const currentBannerIndex = layoutSize === "medium" ? bannerIndex++ : 0;
                
                if (layoutSize === "medium") {
                  const isImageRight = currentBannerIndex % 2 === 1;
                  const imageVariant = isImageRight ? slideRight : slideLeft;
                  const textVariant = isImageRight ? slideLeft : slideRight;

                  return (
                    <motion.article 
                      key={news._id} 
                      id={news._id}
                      variants={slideUp}
                      className={`border border-gray-200 bg-[#f3f4f6] shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3 scroll-mt-28 target:ring-4 target:ring-cyan-600/40 target:scale-[1.01] ${
                        isImageRight ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      <motion.div 
                        variants={imageVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full md:w-1/2 p-5 shrink-0"
                      >
                        <div className="relative w-full h-[250px] md:h-full min-h-[250px] md:min-h-[300px] overflow-hidden rounded-none shadow-sm">
                          <Image 
                            src={news.image} 
                            alt={news.title} 
                            fill 
                            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                            {getCategoryTranslation(news.category)}
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={textVariant}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-6 md:p-8 flex flex-col justify-center flex-grow md:w-1/2"
                      >
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(news.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug group-hover:text-accent transition-colors text-2xl md:text-3xl">
                          {news.title}
                        </h3>
                        <div className="w-10 h-[2px] bg-[#1e40af] mt-2 mb-3" />
                        <ExpandableText text={news.excerpt} limit={220} />
                      </motion.div>
                    </motion.article>
                  );
                }

                if (layoutSize === "large") {
                  return (
                    <motion.article 
                      key={news._id} 
                      id={news._id}
                      variants={slideUp}
                      className="bg-[#f3f4f6] border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer md:col-span-2 lg:col-span-3 scroll-mt-28 target:ring-4 target:ring-cyan-600/40 target:scale-[1.01]"
                    >
                      <div className="w-full p-6 pb-4 shrink-0">
                        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] min-h-[220px] overflow-hidden rounded-none shadow-sm">
                          <Image 
                            src={news.image} 
                            alt={news.title} 
                            fill 
                            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 100vw"
                          />
                          <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                            {getCategoryTranslation(news.category)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 pb-6 flex flex-col justify-center flex-grow">
                        <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                          {formatDate(news.date)}
                        </span>
                        <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug group-hover:text-accent transition-colors text-xl md:text-2xl">
                          {news.title}
                        </h3>
                        <div className="w-10 h-[2px] bg-[#1e40af] mt-2 mb-3" />
                        <ExpandableText text={news.excerpt} limit={250} />
                      </div>
                    </motion.article>
                  );
                }

                // Default is small card
                const columnIndex = index % 3;
                const smallCardVariant = columnIndex === 0 ? slideLeft : (columnIndex === 1 ? slideUp : slideRight);

                return (
                  <motion.article 
                    key={news._id} 
                    id={news._id}
                    variants={smallCardVariant}
                    className="border border-gray-200 bg-[#f3f4f6] shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col rounded-none overflow-hidden relative group cursor-pointer col-span-1 scroll-mt-28 target:ring-4 target:ring-cyan-600/40 target:scale-[1.01]"
                  >
                    <div className="w-full p-4 pb-2.5 shrink-0">
                      <div className="relative w-full aspect-video overflow-hidden rounded-none shadow-sm">
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] z-20">
                          {getCategoryTranslation(news.category)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4 flex flex-col justify-center flex-grow">
                      <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)] self-start">
                        {formatDate(news.date)}
                      </span>
                      <h3 className="font-bold font-sans text-slate-800 uppercase tracking-tight leading-snug group-hover:text-accent transition-colors text-xl">
                        {news.title}
                      </h3>
                      <div className="w-8 h-[2px] bg-[#1e40af] mt-1.5 mb-2.5" />
                      <ExpandableText text={news.excerpt} limit={180} />
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
