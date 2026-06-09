"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, ChevronLeft, ChevronRight, X, ZoomIn, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as any;

const categories = [
  "All",
  "Academic 📚",
  "Cultural 🎭",
  "Sports 🏅",
  "Competitions 🏆",
  "Workshops & Seminars 🎤",
  "Exhibitions 🖼️",
  "Community Service / NSS 🤝",
  "Festivals & Celebrations 🎉"
];

const matchCategory = (eventCat: string, activeCat: string) => {
  if (!eventCat || !activeCat) return false;
  const clean = (str: string) => 
    str.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '')
       .toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .trim();

  const c1 = clean(eventCat);
  const c2 = clean(activeCat);
  return c1.includes(c2) || c2.includes(c1);
};

export default function EventsClient({ initialEvents }: { initialEvents: any[] }) {
  const [events] = useState<any[]>(initialEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Expanded Description State (per event ID)
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return events;
    return events.filter((e) => matchCategory(e.category, activeCategory));
  }, [events, activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openLightbox = (images: { url: string }[], startIndex: number) => {
    setLightboxImages(images.map((img) => img.url));
    setLightboxIndex(startIndex);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxImages) return;
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxImages) return;
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  // Helper to format date cleanly
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  // Helper to render the custom image collage layout
  const renderImageCollage = (event: any) => {
    const imgs = event.images || [];
    if (imgs.length === 0) return null;

    if (imgs.length === 1) {
      return (
        <div 
          onClick={() => openLightbox(imgs, 0)}
          className="relative aspect-video w-full overflow-hidden cursor-zoom-in group bg-gray-100 border border-gray-200/55 shadow-sm"
        >
          <Image
            src={imgs[0].url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            sizes="(max-width: 1200px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-all duration-300 scale-90 group-hover:scale-100" />
          </div>
        </div>
      );
    }

    if (imgs.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 w-full">
          {imgs.map((img: any, idx: number) => (
            <div
              key={img._id || idx}
              onClick={() => openLightbox(imgs, idx)}
              className="relative aspect-[4/3] overflow-hidden cursor-zoom-in group bg-gray-100 border border-gray-200/55"
            >
              <Image
                src={img.url}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                sizes="(max-width: 768px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white/0 group-hover:text-white/80 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 3 or more images: Premium collage (1 main large, 2 smaller side stacked thumbnails)
    const featuredImg = imgs[0];
    const secondaryImgs = imgs.slice(1, 3);
    const extraCount = imgs.length - 3;

    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* Main Large Image */}
        <div 
          onClick={() => openLightbox(imgs, 0)}
          className="col-span-2 relative aspect-[4/3] sm:aspect-video overflow-hidden cursor-zoom-in group bg-gray-100 border border-gray-200/55"
        >
          <Image
            src={featuredImg.url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            sizes="(max-width: 1200px) 66vw, 600px"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-7 h-7 text-white/0 group-hover:text-white/80 transition-all duration-300" />
          </div>
        </div>

        {/* Stacked Side Columns */}
        <div className="col-span-1 flex flex-col gap-2 h-full">
          {secondaryImgs.map((img: any, idx: number) => {
            const absoluteIdx = idx + 1;
            const isLastThumbnail = idx === 1;

            return (
              <div
                key={img._id || absoluteIdx}
                onClick={() => openLightbox(imgs, absoluteIdx)}
                className="relative flex-1 aspect-square sm:aspect-auto overflow-hidden cursor-zoom-in group bg-gray-100 border border-gray-200/55"
              >
                <Image
                  src={img.url}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                
                {isLastThumbnail && extraCount > 0 ? (
                  <div className="absolute inset-0 bg-black/60 hover:bg-black/75 transition-colors duration-300 flex flex-col items-center justify-center text-white">
                    <span className="text-lg md:text-2xl font-bold font-sans">+{extraCount}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold opacity-85">More Photos</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white/0 group-hover:text-white/80 transition-all duration-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 relative overflow-hidden bg-[#f3f4f6] min-h-screen">
      {/* Header section */}
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">College Events</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with academic seminars, sporting tournaments, and vibrant cultural celebrations at our campus.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
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

      {/* Events Listing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 text-gray-500 rounded-none shadow-sm font-medium mt-6">
            No events found matching this category.
          </div>
        ) : (
          <motion.div 
            className="space-y-12 mt-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredEvents.map((event) => {
              const isExpanded = !!expandedEvents[event._id];
              const displayDesc = isExpanded 
                ? event.description 
                : (event.description.length > 220 
                    ? `${event.description.substring(0, 220)}...` 
                    : event.description);

              return (
                <motion.div
                  key={event._id}
                  variants={cardVariants}
                  className="bg-white border border-gray-200/80 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col md:flex-row rounded-none overflow-hidden group"
                >
                  {/* Photo Collage Column */}
                  <div className="w-full md:w-[48%] flex-shrink-0 p-3 flex flex-col justify-center bg-gray-50/50">
                    <div className="p-1 pb-0 flex flex-col w-full">
                      {/* Decorative Accent Line above images */}
                      <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3 rounded-full opacity-90 shadow-sm ml-auto"></div>
                      
                      {renderImageCollage(event)}
                    </div>
                  </div>

                  {/* Text Details Column */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between items-start">
                    <div className="w-full">
                      {/* Meta Tags Line */}
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-accent/80" />
                          {formatDate(event.date)}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="flex items-center gap-1 uppercase tracking-wider bg-red-500/10 text-accent px-2 py-0.5 border border-red-500/10 text-[9px] font-bold">
                          <Tag className="w-3 h-3" />
                          {event.category}
                        </span>
                      </div>

                      {/* Accent blue gradient line */}
                      <div className="w-[40%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>

                      {/* Event Title */}
                      <h2 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-tight leading-snug font-sans mb-3 group-hover:text-accent transition-colors duration-300">
                        {event.title}
                      </h2>

                      {/* Event Description */}
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans transition-all duration-300">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Expand/Read More Button */}
                    {event.description.length > 220 && (
                      <button
                        onClick={() => toggleExpand(event._id)}
                        className="mt-6 text-xs font-bold text-accent hover:text-accent/80 flex items-center gap-1.5 transition-colors focus:outline-none uppercase tracking-wider"
                      >
                        <span>{isExpanded ? "Collapse Details" : "Read Full Story"}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "-rotate-90" : ""}`} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Lightbox Slider Modal */}
      <AnimatePresence>
        {lightboxImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxImages(null)}
          >
            {/* Top Bar actions */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50 text-white select-none">
              <span className="text-sm font-semibold tracking-wider bg-black/30 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                {lightboxIndex + 1} / {lightboxImages.length}
              </span>
              <button
                onClick={() => setLightboxImages(null)}
                className="bg-black/30 hover:bg-black/60 p-2.5 backdrop-blur-sm border border-white/10 text-white hover:text-gray-300 font-bold transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel Area */}
            <div 
              className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative w-full h-full">
                <Image
                  src={lightboxImages[lightboxIndex]}
                  alt="Fullscreen Event image"
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </div>

              {/* Prev Arrow */}
              {lightboxImages.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:-left-12 bg-white/10 hover:bg-white/25 border border-white/10 p-3 text-white hover:scale-105 transition-all focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Arrow */}
              {lightboxImages.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:-right-12 bg-white/10 hover:bg-white/25 border border-white/10 p-3 text-white hover:scale-105 transition-all focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
