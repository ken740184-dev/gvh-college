"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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

const categories = [
  "All",
  "Campus",
  "Academic",
  "Cultural",
  "Sports",
  "Competitions",
  "Workshops & Seminars",
  "Exhibitions",
  "Community Service / NSS",
  "Festivals & Celebrations"
];

const matchCategory = (galleryCat: string, activeCat: string) => {
  if (!galleryCat || !activeCat) return false;
  const clean = (str: string) => 
    str.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '')
       .toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .trim();

  const c1 = clean(galleryCat);
  const c2 = clean(activeCat);
  
  // Custom mapping for old "events" category to "Cultural" or "Academic"
  if (c1 === "events" && c2.includes("celebrations")) return true;
  
  return c1.includes(c2) || c2.includes(c1);
};

const isDarkColor = (color: string) => {
  if (!color) return false;
  if (['bg-gray-700', 'bg-black'].includes(color)) return true;
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  return false;
};

export default function GalleryClient({ initialBlocks }: { initialBlocks: any[] }) {
  const { t } = useLanguage();
  const [blocks] = useState<any[]>(initialBlocks);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

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

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const filteredBlocks = useMemo(() => {
    const result: any[] = [];
    blocks.forEach((block) => {
      const isMultiImageLayout = ["single", "duo", "grid-3", "bento-4", "bento-5"].includes(block.layoutType);
      
      if (isMultiImageLayout) {
        // For multi-image layouts, keep the block intact and verify if the block category or any image category matches
        const anyImageMatches = block.images.some((img: any) => {
          const imgCategory = img.category && img.category !== "None" ? img.category : block.category;
          return matchCategory(imgCategory, activeCategory);
        });
        
        if (activeCategory === "All" || matchCategory(block.category, activeCategory) || anyImageMatches) {
          result.push(block);
        }
      } else {
        // For single-card and two-column cards, filter by the single image's category
        const img = block.images[0];
        if (img) {
          const imgCategory = img.category && img.category !== "None" ? img.category : block.category;
          if (activeCategory === "All" || matchCategory(imgCategory, activeCategory)) {
            result.push(block);
          }
        }
      }
    });
    return result;
  }, [blocks, activeCategory]);

  // Helper to render the specific CSS grid layout for the block
  const renderBlockGrid = (block: any) => {
    // Sort images by slot index to ensure they render in the exact right visual spot
    const sortedImages = [...block.images].sort((a, b) => a.slotIndex - b.slotIndex);
    const imageUrls = sortedImages.map((img: any) => img.url);

    const renderImage = (img: any, className: string, isLastVisibleBentoSlot?: boolean, extraCount?: number) => {
      const globalIndex = sortedImages.indexOf(img);
      return (
        <div 
          key={img._id} 
          className={`relative rounded-none overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${className}`}
          onClick={() => openLightbox(imageUrls, globalIndex)}
        >
          <Image 
            src={img.url} 
            alt={img.title || "Gallery image"} 
            fill 
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          
          {/* Dark overlay that fades in on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          
          {/* Title sliding up on hover */}
          {img.title && img.title !== block.title && (
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
              <h3 className="text-white font-sans font-bold text-lg md:text-xl leading-tight font-sans">
                {img.title}
              </h3>
            </div>
          )}

          {/* +N overlay if this is the last visible bento-5 slot and there are extra images */}
          {isLastVisibleBentoSlot && extraCount && extraCount > 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-30 transition-colors group-hover:bg-black/50">
              <span className="text-white font-sans font-extrabold text-3xl md:text-4xl tracking-wide animate-pulse">
                +{extraCount}
              </span>
            </div>
          )}
        </div>
      );
    };

    if (block.layoutType === "single") {
      return (
        <div className="w-full">
          {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-[21/9]")}
        </div>
      );
    }
    
    if (block.layoutType === "duo") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 w-full">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-1 h-[250px] md:h-[400px]")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 h-[250px] md:h-[400px]")}
        </div>
      );
    }
    
    if (block.layoutType === "grid-3") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full">
          {sortedImages.map((img: any, i: number) => renderImage(img, "col-span-1 aspect-square"))}
        </div>
      );
    }
    
    if (block.layoutType === "bento-4") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-1 md:gap-2 auto-rows-[150px] md:auto-rows-[250px] lg:auto-rows-[350px] w-full">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 h-full")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[2] && renderImage(sortedImages[2], "col-span-1 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[3] && renderImage(sortedImages[3], "col-span-2 md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3 h-full")}
        </div>
      );
    }

    if (block.layoutType === "bento-5") {
      const extraCount = sortedImages.length - 5;
      return (
        <div className="grid grid-cols-3 gap-1 md:gap-1.5 w-full">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-2 aspect-[2.015/1] w-full")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 aspect-square w-full")}
          {sortedImages[2] && renderImage(sortedImages[2], "col-span-1 aspect-square w-full")}
          {sortedImages[3] && renderImage(sortedImages[3], "col-span-1 aspect-square w-full")}
          {sortedImages[4] && renderImage(sortedImages[4], "col-span-1 aspect-square w-full", true, extraCount)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pt-20 relative overflow-hidden bg-[#f3f4f6]">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">{t("gallery.section_title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("gallery.section_subtitle")}
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-gray-200/80">
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative pb-3 text-xs uppercase tracking-wider font-bold transition-all focus:outline-none rounded-none ${
                activeCategory === cat 
                  ? "text-accent" 
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{getCategoryTranslation(cat)}</span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeGalleryTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-blue-500 rounded-none shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Render Blocks */}
      <div key={activeCategory} className="flex flex-col">
        {(() => {
          const grouped: any[] = [];
          let currentCardGroup: any = null;

          filteredBlocks.forEach(block => {
            if (block.layoutType === "single-card" || block.layoutType === "two-column") {
              if (!currentCardGroup) {
                currentCardGroup = { _id: `group-${block._id}`, isGroup: true, blocks: [] };
                grouped.push(currentCardGroup);
              }
              currentCardGroup.blocks.push(block);
            } else {
              currentCardGroup = null;
              grouped.push(block);
            }
          });

          return grouped.map((item, index) => {
            if (item.isGroup) {
              return (
                <motion.div 
                  key={item._id} 
                  className="w-full py-3 md:py-4 transition-colors duration-500 z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {item.blocks.map((block: any) => (
                        <motion.div 
                          key={block._id}
                          variants={cardVariants}
                          className={`flex flex-col border border-gray-200 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full rounded-none overflow-hidden relative group ${
                            block.layoutType === "two-column"
                              ? "col-span-1 sm:col-span-2"
                              : "col-span-1"
                          }`}
                        >
                          <div className="p-3 pb-0 flex flex-col w-full">
                            {/* Top Line: right-aligned, reversed gradient */}
                            <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3.5 rounded-full opacity-90 shadow-sm ml-auto"></div>
                             
                            <div 
                              className={`w-full relative overflow-hidden border border-white/10 bg-gray-100/50 rounded-none shadow-sm cursor-pointer ${
                                block.layoutType === "two-column" ? "aspect-[2.13/1]" : "aspect-square"
                              }`}
                              onClick={() => block.images[0] && openLightbox([block.images[0].url], 0)}
                            >
                              {block.images[0] && (
                                <Image 
                                  src={block.images[0].url} 
                                  alt={block.title || "Gallery image"} 
                                  fill 
                                  className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                                  sizes="(max-width: 768px) 100vw, 33vw"
                               />
                              )}
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-grow items-start w-full">
                            {/* Accent blue line: shorter than the card, longer than a small title */}
                            <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>

                            {/* Sleek category tag/badge */}
                            {block.images[0]?.category && block.images[0]?.category !== "None" && (
                              <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)]">
                                {getCategoryTranslation(block.images[0].category)}
                              </span>
                            )}

                            {block.title ? (
                              <h3 className="text-base md:text-lg font-bold text-slate-800 transition-colors duration-300 uppercase font-sans tracking-tight leading-snug">
                                {block.title}
                              </h3>
                            ) : (
                              <h3 className="text-base md:text-lg font-bold text-slate-400 italic font-sans tracking-tight">
                                {t("gallery.untitled")}
                              </h3>
                            ) }
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }

            const block = item;
            return (
              <motion.div 
                key={block._id} 
                className="w-full py-3 md:py-4 transition-colors duration-500 z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div 
                    variants={cardVariants}
                    className={`flex flex-col border ${
                      isDarkColor(block.backgroundColor) ? 'border-gray-800/80' : 'border-white/20'
                    } ${
                      block.backgroundColor === 'bg-white' 
                        ? 'bg-gradient-to-br from-white/80 via-white/50 to-white/10 backdrop-blur-xl' 
                        : (block.backgroundColor.startsWith('bg-') ? block.backgroundColor : '')
                    } shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] p-4 md:p-6 rounded-none overflow-hidden relative group`}
                    style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}
                  >

                    {/* Content Header inside the card */}
                    {(block.title || block.category) && (
                      <div className="p-2 flex flex-col items-start mb-6">
                        {block.category && block.category !== "None" && (
                          <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)]">
                            {getCategoryTranslation(block.category)}
                          </span>
                        )}
                        {block.title && (
                          <h2 className="text-xl md:text-2xl font-bold text-slate-800 transition-colors duration-300 uppercase font-sans tracking-tight leading-snug">
                            {block.title}
                          </h2>
                        )}
                      </div>
                    )}

                    {/* Image Grid Container */}
                    <div className="w-full relative z-20">
                      {renderBlockGrid(block)}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          });
        })()}

        {filteredBlocks.length === 0 && (
          <div className="text-center py-20 text-secondary-text bg-white">
            {t("gallery.no_found")}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImages && lightboxImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer select-none"
          onClick={() => setLightboxImages(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2.5 z-50 focus:outline-none bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            onClick={() => setLightboxImages(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Navigation Controls */}
          {lightboxIndex > 0 && (
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 z-50 focus:outline-none bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          )}

          {lightboxIndex < lightboxImages.length - 1 && (
            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 z-50 focus:outline-none bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          )}

          <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={lightboxImages[lightboxIndex]} 
              alt="Full size image" 
              fill 
              className="object-contain"
              priority
            />
            {lightboxImages.length > 1 && (
              <div className="absolute -bottom-10 left-0 right-0 text-center text-white/60 text-sm font-sans pointer-events-none">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
