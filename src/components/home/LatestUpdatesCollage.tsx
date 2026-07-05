"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { latestUpdates } from "@/data/updates";

interface LatestUpdatesCollageProps {
  news: any[];
  events: any[];
  achievements: any[];
}

export default function LatestUpdatesCollage({ news, events, achievements }: LatestUpdatesCollageProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(dateStr)) {
      try {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateStr).toLocaleDateString("en-US", options);
      } catch (e) {
        return dateStr;
      }
    }
    return dateStr;
  };

  // Map database elements to collage slots, using static data as high-quality fallbacks
  const dbNews1 = news && news[0];
  const dbEvent = events && events[0];
  const dbAchievement = achievements && achievements[0];
  const dbNews2 = news && news[1];

  const items = [
    {
      type: "LATEST NEWS",
      date: dbNews1 ? formatDate(dbNews1.date) : "Dec 22, 2025",
      title: dbNews1 ? dbNews1.title : "Day 1 - National Conference of Indian Council of Chemists Inaugurated",
      description: dbNews1 ? dbNews1.excerpt : "Day 1 of the national conference was inaugurated with eminent scholars discussing modern methodologies in chemical sciences.",
      image: dbNews1 ? dbNews1.image : "/images/home/news/news1.png",
      link: dbNews1 ? `/news#${dbNews1._id}` : "/news",
      badgeColor: "bg-accent text-white"
    },
    {
      type: "EVENT",
      date: dbEvent ? formatDate(dbEvent.date) : "Jan 25, 2026",
      title: dbEvent ? dbEvent.title : "GVH College to Host Prestigious Republic Day Cup 2026",
      description: dbEvent ? dbEvent.description : "Get ready for the annual state-level sports tournament hosted at our campus starting this Republic Day.",
      image: (dbEvent && dbEvent.images?.[0]?.url) ? dbEvent.images[0].url : "/images/home/news/news2.png",
      link: dbEvent ? `/events#${dbEvent._id}` : "/campus-life",
      badgeColor: "bg-white text-primary-text border border-gray-200/60 shadow-sm"
    },
    {
      type: "ACHIEVEMENT",
      date: dbAchievement ? formatDate(dbAchievement.date) : "Oct 12, 2025",
      title: dbAchievement ? dbAchievement.title : "Cricket Team Wins State Championship",
      description: dbAchievement ? dbAchievement.description : "Our college sports team achieved a historical victory in the state finals, showcasing exceptional grit and skill.",
      image: dbAchievement ? dbAchievement.image : "/images/home/news/news3.png",
      link: dbAchievement ? `/achievements#${dbAchievement._id}` : "/achievements",
      badgeColor: "bg-yellow-500 text-black"
    },
    {
      type: "NEWS",
      date: dbNews2 ? formatDate(dbNews2.date) : (dbNews1 ? formatDate(dbNews1.date) : "Nov 05, 2025"),
      title: dbNews2 ? dbNews2.title : (dbNews1 ? dbNews1.title : "New State-of-the-Art Digital Library"),
      description: dbNews2 ? dbNews2.excerpt : (dbNews1 ? dbNews1.excerpt : "Expanding digital resources to provide state-of-the-art virtual reference and computer laboratories."),
      image: dbNews2 ? dbNews2.image : (dbNews1 ? dbNews1.image : "/images/home/news/news1.png"),
      link: dbNews2 ? `/news#${dbNews2._id}` : "/news",
      badgeColor: "bg-accent text-white"
    }
  ];

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
            <Link href={items[0].link} className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[400px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={items[0].image} 
                alt={items[0].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {items[0].date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {items[0].date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className={`${items[0].badgeColor} px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 tracking-wider`}>{items[0].type}</span>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
                  {items[0].title}
                </h3>
                {items[0].description && (
                  <p className="text-white/90 text-xs md:text-sm mt-3 line-clamp-2 max-w-xl font-sans leading-relaxed">
                    {items[0].description}
                  </p>
                )}
              </div>
            </Link>

            {/* Event (Top Right Wide Block) */}
            <Link href={items[1].link} className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={items[1].image} 
                alt={items[1].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {items[1].date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {items[1].date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className={`${items[1].badgeColor} px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-3 tracking-wider`}>{items[1].type}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {items[1].title}
                </h3>
                {items[1].description && (
                  <p className="text-white/90 text-xs mt-2 line-clamp-1 max-w-xl font-sans leading-relaxed">
                    {items[1].description}
                  </p>
                )}
              </div>
            </Link>

            {/* Achievement (Bottom Right Left Block) */}
            <Link href={items[2].link} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={items[2].image} 
                alt={items[2].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {items[2].date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {items[2].date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className={`${items[2].badgeColor} px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider`}>{items[2].type}</span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {items[2].title}
                </h3>
                {items[2].description && (
                  <p className="text-white/90 text-[11px] mt-2 line-clamp-1 font-sans leading-relaxed">
                    {items[2].description}
                  </p>
                )}
              </div>
            </Link>

            {/* Another News (Bottom Right Right Block) */}
            <Link href={items[3].link} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={items[3].image} 
                alt={items[3].title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {items[3].date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {items[3].date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className={`${items[3].badgeColor} px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider`}>{items[3].type}</span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {items[3].title}
                </h3>
                {items[3].description && (
                  <p className="text-white/90 text-[11px] mt-2 line-clamp-1 font-sans leading-relaxed">
                    {items[3].description}
                  </p>
                )}
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
