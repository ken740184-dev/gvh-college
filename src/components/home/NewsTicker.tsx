"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const announcementText = "this is a ribbon what am supposed to say this , addmission for 2026 has started apply now";

export default function NewsTicker() {
  return (
    <div className="bg-accent text-white flex items-center relative overflow-hidden h-14 w-full border-b border-white/20 z-20 shadow-md">
      {/* Static Button Container on the Left */}
      <div className="absolute left-0 top-0 bottom-0 bg-navbar px-4 sm:px-6 flex items-center z-30 shadow-[4px_0_12px_rgba(0,0,0,0.4)] border-r border-white/10">
        <Link 
          href="/admissions/apply" 
          className="bg-white text-accent hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1 whitespace-nowrap"
        >
          Apply Now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      
      {/* Scrolling Text Container */}
      <div className="flex w-max animate-marquee whitespace-nowrap pl-[135px] sm:pl-[165px] shrink-0">
        {/* First Set (Original) */}
        <div className="flex items-center shrink-0">
          <span className="mx-12 text-sm font-medium tracking-wider uppercase flex items-center gap-2 shrink-0 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            {announcementText}
          </span>
          <span className="mx-12 text-sm font-medium tracking-wider uppercase flex items-center gap-2 shrink-0 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-white/60 shrink-0" />
            {announcementText}
          </span>
        </div>
        
        {/* Second Set (Duplicated for seamless loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          <span className="mx-12 text-sm font-medium tracking-wider uppercase flex items-center gap-2 shrink-0 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            {announcementText}
          </span>
          <span className="mx-12 text-sm font-medium tracking-wider uppercase flex items-center gap-2 shrink-0 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-white/60 shrink-0" />
            {announcementText}
          </span>
        </div>
      </div>
    </div>
  );
}
