"use client";

import { Megaphone } from "lucide-react";

const newsItems = [
  "Admissions open for B.Com and B.A. programs for the academic year 2026-2027. Apply now!",
  "Upcoming Campus Placement Drive: Top IT & Finance companies visiting on August 15th.",
  "Congratulations to the College Cricket Team for winning the Inter-University Championship!",
  "New state-of-the-art Digital Library inaugurated by the Principal.",
];

export default function NewsTicker() {
  return (
    <div className="bg-accent text-white flex items-center relative overflow-hidden h-12 w-full border-b border-white/20">
      {/* Label Box (Fixed on the left) */}
      <div className="absolute left-0 top-0 bottom-0 bg-navbar px-4 sm:px-6 flex items-center gap-2 z-10 shadow-[5px_0_15px_5px_rgba(0,0,0,0.5)] border-r border-gray-700">
        <Megaphone className="w-4 h-4 text-white" />
        <span className="font-sans font-bold text-sm tracking-wider uppercase text-white hidden sm:block">
          Latest Updates
        </span>
      </div>
      
      {/* Scrolling Text Container */}
      {/* 
        Width is set to max-w-none so it doesn't wrap, and we use inline-flex to span the content.
        The animation translates it by -50%, so the duplicated content creates a seamless loop.
      */}
      <div className="flex w-[200vw] lg:w-[150vw] animate-marquee pl-[50px] sm:pl-[180px]">
        {/* First Set */}
        <div className="flex w-1/2 justify-around items-center whitespace-nowrap">
           {newsItems.map((item, i) => (
             <span key={i} className="mx-6 text-sm font-medium tracking-wide">
               {item} <span className="mx-6 text-white/40">•</span>
             </span>
           ))}
        </div>
        {/* Duplicated Set for Seamless Loop */}
        <div className="flex w-1/2 justify-around items-center whitespace-nowrap">
           {newsItems.map((item, i) => (
             <span key={`dup-${i}`} className="mx-6 text-sm font-medium tracking-wide">
               {item} <span className="mx-6 text-white/40">•</span>
             </span>
           ))}
        </div>
      </div>
    </div>
  );
}
