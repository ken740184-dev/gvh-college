"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";

interface AnnouncementPopupProps {
  announcement: {
    popupActive?: boolean;
    popupTitle?: string;
    popupImageUrl?: string;
    popupLink?: string;
  } | null;
}

export default function AnnouncementPopup({ announcement }: AnnouncementPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (announcement?.popupActive && announcement.popupImageUrl) {
      const isDismissed = sessionStorage.getItem("gvh_popup_dismissed");
      if (!isDismissed) {
        setIsOpen(true);
      }
    }
  }, [announcement]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("gvh_popup_dismissed", "true");
  };

  if (!announcement?.popupActive || !announcement.popupImageUrl || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Blur Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer animate-in fade-in duration-300"
      />
      
      {/* Vertical Rectangle Modal Container with exact CSS animation matching the preview */}
      <div
        className="bg-white border border-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative w-full max-w-[480px] flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-500"
      >
        {/* Glassmorphic Close Button (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 p-2 rounded-full border border-slate-200/60 shadow-md transition-all duration-200 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Close Announcement"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Centered Header Title */}
        {announcement.popupTitle && (
          <div className="px-12 py-4 border-b border-slate-100 bg-slate-50/60 text-center">
            <h2 className="text-sm font-sans font-bold text-slate-800 leading-snug uppercase tracking-wider">
              {announcement.popupTitle}
            </h2>
          </div>
        )}

        {/* Image Container with Padding */}
        <div className="px-5 pb-5 pt-2">
          <div className="relative w-full aspect-[3/4] bg-slate-50 overflow-hidden border border-slate-200/60 rounded-lg group shadow-inner">
            {announcement.popupLink ? (
              <a
                href={announcement.popupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image
                  src={announcement.popupImageUrl}
                  alt={announcement.popupTitle || "Announcement Banner"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  sizes="(max-width: 480px) 100vw, 480px"
                  priority
                />
              </a>
            ) : (
              <Image
                src={announcement.popupImageUrl}
                alt={announcement.popupTitle || "Announcement Banner"}
                fill
                className="object-cover"
                sizes="(max-width: 480px) 100vw, 480px"
                priority
              />
            )}
          </div>
        </div>

        {/* View Details Button if Link is Present */}
        {announcement.popupLink && (
          <div className="p-4 border-t border-slate-100 bg-white flex justify-center">
            <a
              href={announcement.popupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-bold py-3 px-5 transition-all duration-200 shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-center"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
