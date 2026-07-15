"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ROW_H = 300; // px per grid row

const categories = [
  "All", "Campus", "Academic", "Cultural", "Sports",
  "Competitions", "Workshops & Seminars", "Exhibitions",
  "Community Service / NSS", "Festivals & Celebrations",
];

const matchCategory = (galleryCat: string, activeCat: string) => {
  if (!galleryCat || !activeCat) return false;
  const clean = (s: string) =>
    s.replace(/[\u2700-\u27BF\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF]/g, "")
      .toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  const c1 = clean(galleryCat), c2 = clean(activeCat);
  if (c1 === "events" && c2.includes("celebrations")) return true;
  return c1.includes(c2) || c2.includes(c1);
};

type ImgItem = { url: string; title: string; category: string };
type GridItem = { item: ImgItem; globalIdx: number; col: string; row: string };

export default function GalleryClient({ initialBlocks }: { initialBlocks: any[] }) {
  const { t } = useLanguage();
  const [blocks] = useState<any[]>(initialBlocks);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const catLabel = (cat: string) => {
    const map: Record<string, string> = {
      "All": t("cat.all"), "Campus": t("cat.campus"), "Academic": t("cat.academic"),
      "Cultural": t("cat.cultural"), "Sports": t("cat.sports"), "Competitions": t("cat.competitions"),
      "Workshops & Seminars": t("cat.workshops"), "Exhibitions": t("cat.exhibitions"),
      "Community Service / NSS": t("cat.community"), "Festivals & Celebrations": t("cat.festivals"),
    };
    return map[cat] ?? cat;
  };

  const openLightbox = useCallback((imgs: string[], i: number) => {
    setLightboxImages(imgs); setLightboxIndex(i);
  }, []);
  const closeLightbox = () => setLightboxImages(null);

  /* ── Flatten all images ──────────────────────────────────── */
  const allImages = useMemo<ImgItem[]>(() => {
    const flat: ImgItem[] = [];
    blocks.forEach((block) => {
      const imgs = [...block.images].sort((a, b) => a.slotIndex - b.slotIndex);
      imgs.forEach((img: any) => {
        const c = img.category && img.category !== "None" ? img.category : block.category;
        if (activeCategory === "All" || matchCategory(c, activeCategory)) {
          flat.push({ url: img.url, title: img.title || block.title || "", category: c || "" });
        }
      });
    });
    return flat;
  }, [blocks, activeCategory]);

  const allUrls = useMemo(() => allImages.map((i) => i.url), [allImages]);

  /* ── Build ONE flat list of grid-placed items ────────────── */
  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = [];
    let gridRow = 1;
    let i = 0;
    let chunkIdx = 0;

    while (i < allImages.length) {
      const rem = allImages.length - i;

      if (rem >= 5) {
        const left = chunkIdx % 2 === 0;
        if (left) {
          // Featured: cols 1–2, spans 2 rows
          items.push({ item: allImages[i],   globalIdx: i,   col: "1 / 3", row: `${gridRow} / ${gridRow + 2}` });
          items.push({ item: allImages[i+1], globalIdx: i+1, col: "3",     row: `${gridRow}` });
          items.push({ item: allImages[i+2], globalIdx: i+2, col: "4",     row: `${gridRow}` });
          items.push({ item: allImages[i+3], globalIdx: i+3, col: "3",     row: `${gridRow + 1}` });
          items.push({ item: allImages[i+4], globalIdx: i+4, col: "4",     row: `${gridRow + 1}` });
        } else {
          // Featured: cols 3–4, spans 2 rows
          items.push({ item: allImages[i],   globalIdx: i,   col: "1",     row: `${gridRow}` });
          items.push({ item: allImages[i+1], globalIdx: i+1, col: "2",     row: `${gridRow}` });
          items.push({ item: allImages[i+2], globalIdx: i+2, col: "3 / 5", row: `${gridRow} / ${gridRow + 2}` });
          items.push({ item: allImages[i+3], globalIdx: i+3, col: "1",     row: `${gridRow + 1}` });
          items.push({ item: allImages[i+4], globalIdx: i+4, col: "2",     row: `${gridRow + 1}` });
        }
        gridRow += 2;
        i += 5;
        chunkIdx++;
      } else {
        // Remainder: fill left-to-right, 4 per row
        let col = 1;
        while (i < allImages.length) {
          items.push({ item: allImages[i], globalIdx: i, col: `${col}`, row: `${gridRow}` });
          col++;
          if (col > 4) { col = 1; gridRow++; }
          i++;
        }
      }
    }

    return items;
  }, [allImages]);

  /* ─── Render ────────────────────────────────────────────── */
  return (
    <div className="pt-20 min-h-screen bg-white overflow-x-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent mb-3">
            {t("gallery.section_title")}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {t("gallery.section_title")}
          </h1>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            {t("gallery.section_subtitle")}
          </p>
        </div>
      </header>

      {/* ── Sticky filter bar ───────────────────────────────── */}
      <nav className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-hidden">
          {/* Mobile: single scrollable row | Desktop: wrap */}
          <div
            className="flex gap-2 md:flex-wrap"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ flexShrink: 0 }}
                className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 focus:outline-none ${
                  activeCategory === cat
                    ? "bg-[#0f172a] text-white"
                    : "text-gray-500 hover:text-[#0f172a] border border-gray-300 hover:border-gray-500"
                }`}
              >
                {catLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Gallery — single CSS grid, no chunk boundaries ──── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {allImages.length === 0 ? (
            <div className="text-center py-32 text-gray-400">
              <p className="text-base font-medium">{t("gallery.no_found")}</p>
            </div>
          ) : isMobile ? (
            /* ── Mobile: simple 2-column equal grid ── */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "6px",
              }}
            >
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{ height: "180px" }}
                  onClick={() => openLightbox(allUrls, idx)}
                >
                  <Image
                    src={img.url}
                    alt={img.title || "Gallery"}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 20%, transparent 32%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                    {img.category && img.category !== "None" && (
                      <span className="block font-sans text-[9px] font-bold uppercase tracking-widest text-red-400 mb-0.5 leading-none">
                        {catLabel(img.category)}
                      </span>
                    )}
                    {img.title && (
                      <p className="font-sans text-white font-bold text-xs leading-tight line-clamp-2">
                        {img.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Desktop: complex 4-column masonry grid ── */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridAutoRows: `${ROW_H}px`,
                gap: "8px",
              }}
            >
              {gridItems.map((gi, k) => (
                <div
                  key={k}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{ gridColumn: gi.col, gridRow: gi.row }}
                  onClick={() => openLightbox(allUrls, gi.globalIdx)}
                >
                  <Image
                    src={gi.item.url}
                    alt={gi.item.title || "Gallery"}
                    fill
                    sizes="(max-width: 1280px) 25vw, 320px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Bottom-only vignette */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 20%, transparent 32%)" }}
                  />
                  {/* Hover: deepen */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 25%, transparent 38%)" }}
                  />
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    {gi.item.category && gi.item.category !== "None" && (
                      <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-red-500 mb-1 leading-none">
                        {catLabel(gi.item.category)}
                      </span>
                    )}
                    {gi.item.title && (
                      <p className="font-sans text-white font-bold text-sm leading-snug line-clamp-2">
                        {gi.item.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Lightbox ────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImages && lightboxImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox} aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            {lightboxIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                aria-label="Previous"
              ><ChevronLeft className="w-5 h-5" /></button>
            )}
            {lightboxIndex < lightboxImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                aria-label="Next"
              ><ChevronRight className="w-5 h-5" /></button>
            )}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImages[lightboxIndex]} alt="Full size" fill className="object-contain" priority />
              {lightboxImages.length > 1 && (
                <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none">
                  <span className="text-white/35 text-xs font-mono tracking-widest">
                    {lightboxIndex + 1} / {lightboxImages.length}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
