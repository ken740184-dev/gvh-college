"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { latestUpdates } from "@/data/updates";

export default function LatestUpdatesCollage() {
  return (
    <section className="py-24 bg-white border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <Reveal>
            <SectionHeading 
              title="Latest Updates" 
              subtitle="Fresh news, upcoming events, and recent achievements from our vibrant campus." 
            />
          </Reveal>
          <Reveal delay={0.2} direction="left">
            <Link href="/news" className="hidden md:inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors mb-4 text-lg">
              View All Updates <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          {/* Collage Grid inspired by the Campus Life visual layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px] w-full gap-4">
            
            {/* Main Featured News (Large Left Block) */}
            <Link href={latestUpdates[0].link} className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block h-[400px] md:h-full">
              <Image 
                src={latestUpdates[0].image} 
                alt={latestUpdates[0].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className={`${latestUpdates[0].badgeColor} px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 tracking-wider`}>{latestUpdates[0].type}</span>
                <p className="text-gray-300 text-sm font-medium mb-2">{latestUpdates[0].date}</p>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
                  {latestUpdates[0].title}
                </h3>
              </div>
            </Link>

            {/* Event (Top Right Wide Block) */}
            <Link href={latestUpdates[1].link} className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block h-[250px] md:h-full">
              <Image 
                src={latestUpdates[1].image} 
                alt={latestUpdates[1].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className={`${latestUpdates[1].badgeColor} px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-3 tracking-wider`}>{latestUpdates[1].type}</span>
                <p className="text-gray-300 text-sm font-medium mb-1">{latestUpdates[1].date}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {latestUpdates[1].title}
                </h3>
              </div>
            </Link>

            {/* Achievement (Bottom Right Left Block) */}
            <Link href={latestUpdates[2].link} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block h-[250px] md:h-full">
              <Image 
                src={latestUpdates[2].image} 
                alt={latestUpdates[2].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className={`${latestUpdates[2].badgeColor} px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider`}>{latestUpdates[2].type}</span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {latestUpdates[2].title}
                </h3>
              </div>
            </Link>

            {/* Another News (Bottom Right Right Block) */}
            <Link href={latestUpdates[3].link} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-xl shadow-lg cursor-pointer block h-[250px] md:h-full">
              <Image 
                src={latestUpdates[3].image} 
                alt={latestUpdates[3].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className={`${latestUpdates[3].badgeColor} px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider`}>{latestUpdates[3].type}</span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {latestUpdates[3].title}
                </h3>
              </div>
            </Link>

          </div>
        </Reveal>
        
        {/* Mobile only view all button */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/news" className="inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors">
            View All Updates <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
