"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Trophy, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const columns = [
  {
    category: "News",
    icon: Newspaper,
    date: "Dec 22, 2025",
    headline: "Day 1 - National Conference of Indian Council of Chemists Inaugurated at GVH College",
    image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg",
    link: "/news"
  },
  {
    category: "Upcoming Events",
    icon: Calendar,
    date: "Jan 25, 2026",
    headline: "GVH College to Host Prestigious Republic Day Cup 2026",
    image: "/images/f4b83665-42eb-4514-93eb-afe1ce1f84e2.png",
    link: "/campus-life"
  },
  {
    category: "Achievements",
    icon: Trophy,
    date: "Sep 24, 2024",
    headline: "GVH College Cricket Team Wins State Inter-University Championship",
    image: "/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png",
    link: "/achievements"
  }
];

export default function NewsAndEvents() {
  return (
    <section className="py-24 bg-white border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary-text mb-4">Stay Connected</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-secondary-text max-w-2xl mx-auto">
              Keep up to date with the latest news, upcoming events, and the proud achievements of our students and faculty.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {columns.map((col, index) => {
              const Icon = col.icon;
              return (
                <div key={index} className="flex flex-col h-full">
                  
                  {/* Category Header with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-primary-text">{col.category}</h3>
                  </div>
                  
                  {/* Styled Card */}
                  <div className="bg-white rounded-2xl flex-grow flex flex-col group cursor-pointer shadow-lg border border-gray-100 overflow-hidden relative">
                    
                    {/* Image Container */}
                    <div className="relative h-[240px] overflow-hidden bg-gray-100">
                      <Image 
                        src={col.image} 
                        alt={col.headline} 
                        fill 
                        className="object-cover"
                      />
                      {/* Floating Date Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary-text px-4 py-1.5 rounded-full text-xs font-bold shadow-md tracking-wide z-10">
                        {col.date}
                      </div>
                      
                      {/* Visual Scroll Arrows (Always visible) */}
                      <div className="absolute inset-0 flex items-center justify-between px-3 z-10 pointer-events-none">
                        <div className="bg-white/90 p-2 rounded-full shadow-md pointer-events-auto cursor-pointer">
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="bg-white/90 p-2 rounded-full shadow-md pointer-events-auto cursor-pointer">
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <p className="text-lg font-bold leading-snug text-primary-text mb-6">
                        {col.headline}
                      </p>
                      
                      {/* View All Link Styled as a button link */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Link href={col.link} className="inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors text-sm tracking-wider">
                          View All {col.category} <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
