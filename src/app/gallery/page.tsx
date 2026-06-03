"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { galleryImages as initialImages, galleryCategories as categories } from "@/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = initialImages.filter((img) => {
    const matchesCategory = activeCategory === "All" || img.category === activeCategory;
    const matchesSearch = img.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Category Filters */}
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

          {/* Search */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setLightboxImage(img.src)}
            >
              <Image 
                src={img.src} 
                alt={img.category} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium px-4 py-2 border border-white rounded-md">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-secondary-text">
            No images found matching your criteria.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={lightboxImage} 
              alt="Lightbox" 
              fill 
              className="object-contain"
            />
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              onClick={() => setLightboxImage(null)}
            >
              Close (X)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
