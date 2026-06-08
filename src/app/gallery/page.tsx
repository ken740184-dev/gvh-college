"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getGalleryBlocks } from "@/actions/gallery";

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

export default function GalleryPage() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const res = await getGalleryBlocks();
        if (res?.success) {
          setBlocks(res.blocks);
        }
      } catch (error) {
        console.error("Failed to fetch gallery blocks:", error);
      }
    }
    fetchBlocks();
  }, []);

  // Filter logic: if "All", show original blocks. Otherwise, flatten matching images into single cards.
  const filteredBlocks = useMemo(() => {
    if (activeCategory === "All") return blocks;
    
    const flatBlocks: any[] = [];
    blocks.forEach((block) => {
      block.images.forEach((img: any) => {
        // If the image has its own category, use it. Otherwise fallback to the block's category.
        const effectiveCategory = img.category && img.category !== "None" ? img.category : block.category;
        
        if (effectiveCategory === activeCategory) {
          flatBlocks.push({
            _id: img._id + "-flat",
            layoutType: "single-card",
            backgroundColor: "bg-white",
            images: [img],
            title: img.title || "",
            description: img.description || "",
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
        className={`relative rounded-none overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
        onClick={() => setLightboxImage(img.url)}
      >
        <Image 
          src={img.url} 
          alt={img.title || "Gallery image"} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Title */}
        {img.title && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-extrabold text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
              {img.title}
            </h3>
          </div>
        )}


      </div>
    );

    if (block.layoutType === "single") {
      return (
        <div className="w-full px-4 md:px-6">
          {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-[21/9]")}
        </div>
      );
    }
    
    if (block.layoutType === "duo") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 w-full px-4 md:px-6">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-1 h-[250px] md:h-[400px]")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 h-[250px] md:h-[400px]")}
        </div>
      );
    }
    
    if (block.layoutType === "grid-3") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full px-4 md:px-6">
          {sortedImages.map((img: any, i: number) => renderImage(img, "col-span-1 aspect-square"))}
        </div>
      );
    }
    
    if (block.layoutType === "bento-4") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-1 md:gap-2 auto-rows-[150px] md:auto-rows-[250px] lg:auto-rows-[350px] w-full px-4 md:px-6">
          {sortedImages[0] && renderImage(sortedImages[0], "col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 h-full")}
          {sortedImages[1] && renderImage(sortedImages[1], "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[2] && renderImage(sortedImages[2], "col-span-1 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 h-full")}
          {sortedImages[3] && renderImage(sortedImages[3], "col-span-2 md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3 h-full")}
        </div>
      );
    }

    if (block.layoutType === "bento-5") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-1 md:gap-2 auto-rows-[150px] md:auto-rows-[250px] lg:auto-rows-[350px] w-full px-4 md:px-6">
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
    <div className="pt-20">
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
            if (block.layoutType === "single-card") {
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
                <div key={item._id} className="w-full px-4 md:px-6 py-8 md:py-12 transition-colors duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {item.blocks.map((block: any) => (
                      <div 
                        key={block._id} 
                        className={`flex flex-col border ${
                          isDarkColor(block.backgroundColor) ? 'border-gray-800/80' : 'border-white/50'
                        } ${
                          block.backgroundColor === 'bg-white' 
                            ? 'bg-gradient-to-br from-white/75 via-white/50 to-white/20 backdrop-blur-xl' 
                            : (block.backgroundColor.startsWith('bg-') ? block.backgroundColor : '')
                        } shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 ease-out h-full rounded-none overflow-hidden`} 
                        style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}
                      >
                        <div className="p-3.5 pb-0 flex flex-col">
                          {/* Top Line: right-aligned, reversed gradient */}
                          <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3.5 rounded-full opacity-90 shadow-sm ml-auto"></div>
                          
                          <div className="w-full aspect-square relative overflow-hidden border border-white/20 bg-gray-100">
                            {block.images[0] && (
                              <Image 
                                src={block.images[0].url} 
                                alt="Gallery Image" 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            )}
                          </div>
                        </div>
                        <div className="p-4 md:p-5 flex flex-col flex-grow items-start">
                          {/* Accent blue line: shorter than the card, longer than a small title */}
                          <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>
                          
                          {block.title ? (
                            <h3 className="text-base md:text-lg font-bold text-slate-800 transition-colors duration-300 mb-1.5 uppercase font-sans tracking-tight">
                              {block.title}
                            </h3>
                          ) : (
                            <h3 className="text-base md:text-lg font-bold text-slate-400 italic mb-1.5 font-sans tracking-tight">
                              Untitled Image
                            </h3>
                          )}
                          
                          {block.description ? (
                            <p className={`${isDarkColor(block.backgroundColor) ? 'text-slate-200' : 'text-slate-600'} text-xs md:text-sm leading-relaxed flex-grow font-sans`}>
                              {block.description}
                            </p>
                          ) : (
                            <p className="text-xs md:text-sm text-slate-400 italic flex-grow font-sans">
                              No description provided.
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            const block = item;
            return (
              <div key={block._id} className={`${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''} py-4 md:py-6 transition-colors duration-500`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}>
                {(block.title || block.description) && (
                  <div className="w-full px-4 md:px-6 mb-8 flex flex-col items-center text-center">
                    {block.title && (
                      <div className="inline-flex flex-col items-center">
                        <h2 className={`text-3xl md:text-4xl font-bold font-sans mb-3 ${isDarkColor(block.backgroundColor) ? 'text-white' : 'text-gray-900'}`}>{block.title}</h2>
                        <div className="w-[80%] h-1 bg-[#1e40af] mb-4"></div>
                      </div>
                    )}
                    {block.description && <p className={`text-lg max-w-3xl ${isDarkColor(block.backgroundColor) ? 'text-gray-300' : 'text-gray-600'}`}>{block.description}</p>}
                  </div>
                )}
                {renderBlockGrid(block)}
              </div>
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
