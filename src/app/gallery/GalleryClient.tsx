"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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

const categories = ["All", "Campus", "Academic", "Sports", "Events"];

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
  const [blocks] = useState<any[]>(initialBlocks);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Filter logic: always flatten all blocks' images into single cards, filtering by category if active.
  const filteredBlocks = useMemo(() => {
    const flatBlocks: any[] = [];
    blocks.forEach((block) => {
      block.images.forEach((img: any) => {
        // If the image has its own category, use it. Otherwise fallback to the block's category.
        const imgCategory = img.category && img.category !== "None" ? img.category : block.category;
        
        if (activeCategory === "All" || imgCategory === activeCategory) {
          flatBlocks.push({
            _id: img._id || (block._id + "-" + img.url),
            layoutType: "single-card",
            backgroundColor: block.backgroundColor || "bg-white",
            images: [img],
            title: img.title || block.title || "",
            description: img.description || block.description || "",
            category: imgCategory,
          });
        }
      });
    });
    return flatBlocks;
  }, [blocks, activeCategory]);

  // Helper to render the specific CSS grid layout for the block
  const renderBlockGrid = (block: any) => {
    // Sort images by slot index to ensure they render in the exact right visual spot
    const sortedImages = [...block.images].sort((a, b) => a.slotIndex - b.slotIndex);

    const renderImage = (img: any, className: string) => (
      <div 
        key={img._id} 
        className={`relative rounded-none overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${className}`}
        onClick={() => setLightboxImage(img.url)}
      >
        <Image 
          src={img.url} 
          alt={img.title || "Gallery image"} 
          fill 
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        
        {/* Dark overlay that fades in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Glowing category indicator */}
        {img.category && img.category !== "None" && (
          <span className="absolute top-4 left-4 bg-accent/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-20">
            {img.category}
          </span>
        )}

        {/* Title & description sliding up on hover */}
        {img.title && (
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
            <h3 className="text-white font-sans font-bold text-lg md:text-xl leading-tight mb-1">
              {img.title}
            </h3>
            {img.description && (
              <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed font-sans">
                {img.description}
              </p>
            )}
          </div>
        )}
      </div>
    );

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
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-1 md:gap-2 auto-rows-[150px] md:auto-rows-[250px] lg:auto-rows-[350px] w-full">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 h-full")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[2] && renderImage(sortedImages[2], "col-span-1 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[3] && renderImage(sortedImages[3], "col-span-1 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 h-full")}
          {sortedImages[4] && renderImage(sortedImages[4], "col-span-1 md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3 h-full")}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pt-20 relative overflow-hidden bg-[#f3f4f6]">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our campus, events, and student life through these moments.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-accent text-white" 
                  : "bg-gray-100 text-secondary-text hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Render Blocks */}
      <div className="flex flex-col">
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
                  className="w-full py-8 md:py-12 transition-colors duration-500 z-10"
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
                          className={`flex border border-gray-200 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full rounded-none overflow-hidden relative group ${
                            block.layoutType === "two-column"
                              ? "col-span-1 sm:col-span-2 flex-col sm:flex-row"
                              : "col-span-1 flex-col"
                          }`}
                        >
                          <div className={`p-3 pb-0 flex flex-col ${block.layoutType === "two-column" ? "w-full sm:w-1/2 sm:pb-3 sm:pr-0" : "w-full"}`}>
                            {/* Top Line: right-aligned, reversed gradient */}
                            <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3.5 rounded-full opacity-90 shadow-sm ml-auto"></div>
                             
                            <div 
                              className={`w-full relative overflow-hidden border border-white/10 bg-gray-100/50 rounded-none shadow-sm cursor-pointer ${
                                block.layoutType === "two-column" ? "aspect-video" : "aspect-square"
                              }`}
                              onClick={() => block.images[0] && setLightboxImage(block.images[0].url)}
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
                          <div className={`p-5 flex flex-col flex-grow items-start justify-center ${block.layoutType === "two-column" ? "w-full sm:w-1/2" : "w-full"}`}>
                            {/* Accent blue line: shorter than the card, longer than a small title */}
                            <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>

                            {/* Sleek category tag/badge */}
                            {block.images[0]?.category && block.images[0]?.category !== "None" && (
                              <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)]">
                                {block.images[0].category}
                              </span>
                            )}

                            {block.title ? (
                              <h3 className="text-base md:text-lg font-bold text-slate-800 transition-colors duration-300 mb-2 uppercase font-sans tracking-tight leading-snug">
                                {block.title}
                              </h3>
                            ) : (
                              <h3 className="text-base md:text-lg font-bold text-slate-400 italic mb-2 font-sans tracking-tight">
                                Untitled Image
                              </h3>
                            ) }
                            
                            {block.description ? (
                              <p className="text-slate-600 text-xs md:text-sm leading-relaxed flex-grow font-sans">
                                {block.description}
                              </p>
                            ) : (
                              <p className="text-xs md:text-sm text-slate-400 italic flex-grow font-sans">
                                No description provided.
                              </p>
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
                className="w-full py-8 md:py-12 transition-colors duration-500 z-10"
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
                    } shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] p-4 md:p-6 rounded-2xl overflow-hidden relative group`}
                    style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}
                  >

                    {/* Content Header inside the card */}
                    {(block.title || block.description || block.category) && (
                      <div className="p-2 flex flex-col items-start mb-6">
                        {block.category && block.category !== "None" && (
                          <span className="bg-red-500/10 border border-red-500/20 text-accent px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider mb-3 shadow-[0_2px_10px_rgba(220,38,38,0.05)]">
                            {block.category}
                          </span>
                        )}
                        {block.title && (
                          <h2 className="text-xl md:text-2xl font-bold text-slate-800 transition-colors duration-300 mb-2 uppercase font-sans tracking-tight leading-snug">
                            {block.title}
                          </h2>
                        )}
                        {block.description && (
                          <p className={`${isDarkColor(block.backgroundColor) ? 'text-slate-200' : 'text-slate-600'} text-xs md:text-sm leading-relaxed font-sans`}>
                            {block.description}
                          </p>
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
            No gallery images found matching your criteria.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={lightboxImage} 
              alt="Full size image" 
              fill 
              className="object-contain"
            />
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 font-bold tracking-wider"
              onClick={() => setLightboxImage(null)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
