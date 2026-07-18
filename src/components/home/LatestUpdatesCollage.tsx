"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

interface LatestUpdatesCollageProps {
  news: any[];
  events: any[];
  achievements: any[];
}

export default function LatestUpdatesCollage({ news, events, achievements }: LatestUpdatesCollageProps) {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const commerceSlides = [
    {
      date: "Jun 02, 2026",
      title: language === "kn" 
        ? "'ಕಾಮರ್ಸಿಯಂ-೨೦೨೬' ರಾಜ್ಯ ಮಟ್ಟದ ಫೆಸ್ಟ್‌ನಲ್ಲಿ ಪ್ರಶಸ್ತಿಗಳ ಸಾಧನೆ" 
        : "Laurels at 'COMMERCEIUM-2026' State Fest",
      description: language === "kn"
        ? "೦೨.೦೬.೨೦೨೬ ರಂದು ಹಾವೇರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ ಆಯೋಜಿಸಿದ್ದ 'ಕಾಮರ್ಸಿಯಂ-೨೦೨೬' ರಾಜ್ಯ ಮಟ್ಟದ ವಾಣಿಜ್ಯ ಉತ್ಸವದಲ್ಲಿ ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಭಾಗವಹಿಸಿ ವಿವಿಧ ಸ್ಪರ್ಧೆಗಳಲ್ಲಿ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಗೆದ್ದು ಕಾಲೇಜಿಗೆ ಕೀರ್ತಿ ತಂದಿದ್ದಾರೆ."
        : "Our students actively participated in 'COMMERCEIUM-2026', a state-level commerce fest organized by Haveri University, Haveri on June 2, 2026. Our students showcased their talent in various events and brought laurels to the college by winning prizes.",
      image: "/images/home/latest_updates/achievement_2.jpg",
      link: "/achievements"
    },
    {
      date: "Jun 02, 2026",
      title: language === "kn"
        ? "'ಕಾಮರ್ಸಿಯಂ-೨೦೨೬' ಉತ್ಸವದಲ್ಲಿ ಅದ್ಭುತ ಪ್ರತಿಭೆ"
        : "Talent and Management Skills Exhibition",
      description: language === "kn"
        ? "ಈ ಉತ್ಸವವು ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತಮ್ಮ ಜ್ಞಾನ, ಸೃಜನಶೀಲತೆ ಮತ್ತು ನಿರ್ವಹಣಾ ಕೌಶಲ್ಯಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಒಂದು ಉತ್ತಮ ವೇದಿಕೆಯನ್ನು ಒದಗಿಸಿತು."
        : "The fest provided a great platform for students to exhibit their knowledge, creativity, and management skills. We congratulate all the participants and prize winners for their outstanding performance.",
      image: "/images/home/latest_updates/achievement_1.jpg",
      link: "/achievements"
    }
  ];

  const yogaSlides = [
    {
      date: "Dec 19, 2025",
      title: language === "kn"
        ? "ಯೋಗಾಸನ ತಂಡದ ನಾಯಕನಾಗಿ ಕು.ಶಿವನಗೌಡ ಪಾಟೀಲ ಆಯ್ಕೆ"
        : "Yoga Team Captain Selection (Men)",
      description: language === "kn"
        ? "ಹಾವೇರಿ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಯೋಗಾಸನ ತಂಡದ ನಾಯಕ (Captain) ನಾಗಿ ನಮ್ಮ ಕಾಲೇಜಿನ ವಿದ್ಯಾರ್ಥಿ ಕು.ಶಿವನಗೌಡ ಪಾಟೀಲ ಆಯ್ಕೆಯಾಗಿದ್ದು ಚೆನ್ನೈನಲ್ಲಿ ನಡೆಯುವ ಅಂತರ್ ವಿಶ್ವವಿದ್ಯಾಲಯ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ಭಾಗವಹಿಸಲಿದ್ದಾರೆ."
        : "Our student Shivanagouda Patil has been selected as the Captain of Haveri University Yogasana team to participate in the Inter-University Yoga Championship held in Chennai.",
      image: "/images/home/latest_updates/yogo_boys_group.jpg",
      link: "/achievements"
    },
    {
      date: "Jan 05, 2026",
      title: language === "kn"
        ? "ಮಹಿಳಾ ಯೋಗಾಸನ ತಂಡಕ್ಕೆ ಕು.ರೇಖಾ ಪಾಟೀಲ ಆಯ್ಕೆ"
        : "Yoga Team Selection (Women)",
      description: language === "kn"
        ? "ಹಾವೇರಿ ವಿಶ್ವವಿದ್ಯಾಲಯದ (ಮಹಿಳೆ) ಯೋಗಾಸನ ತಂಡಕ್ಕೆ ನಮ್ಮ ಕಾಲೇಜಿನ ವಿದ್ಯಾರ್ಥಿನಿಯಾದ ಕು.ರೇಖಾ ಪಾಟೀಲ ಆಯ್ಕೆಯಾಗಿದ್ದು ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಡೆಯುವ ಅಂತರ್ ವಿಶ್ವವಿದ್ಯಾಲಯ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ಭಾಗವಹಿಸಲಿದ್ದಾರೆ."
        : "Our student Rekha Patil has been selected for the Haveri University Women's Yogasana team to compete in the Inter-University Yogasana Championship held in Bengaluru.",
      image: "/images/home/latest_updates/yogo_girls_group.jpg",
      link: "/achievements"
    }
  ];

  const eventItem = {
    type: "EVENT",
    date: "Jan 25, 2026",
    title: language === "kn"
      ? "ಬೆಂಕಿ ಇಲ್ಲದ ಅಡುಗೆ ಸ್ಪರ್ಧೆ (Cooking Without Fire)"
      : "Cooking Without Fire Competition",
    description: language === "kn"
      ? "ಕ್ಯಾಂಪಸ್ ಆಹಾರ ಉತ್ಸವದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಬೆಂಕಿಯನ್ನು ಬಳಸದೆ ರುಚಿಕರವಾದ ಖಾದ್ಯಗಳನ್ನು ತಯಾರಿಸುವ ಮೂಲಕ ತಮ್ಮ ಪಾಕಶಾಲೆಯ ಸೃಜನಶೀಲತೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿದರು."
      : "Students exhibited culinary creativity by preparing a wide array of delicious dishes without using fire at the campus food fest.",
    image: "/images/home/latest_updates/event.jpg",
    link: "/events",
    badgeColor: "bg-white text-primary-text border border-gray-200/60 shadow-sm"
  };

  const newsItem = {
    type: "NEWS",
    date: "March 15, 2026",
    title: language === "kn"
      ? "ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕಾಲೇಜಿಗೆ ಶೇ. ೧೦೦ ರಷ್ಟು ಅತ್ಯುತ್ತಮ ಫಲಿತಾಂಶ"
      : "Outstanding 100% Results in BA & B.Com Exams",
    description: language === "kn"
      ? "ಹೊಸರಿತ್ತಿಯ ಗುದ್ಲೆಪ್ಪ ಹಳ್ಳಿಕೇರಿ ಕಲಾ ಮತ್ತು ವಾಣಿಜ್ಯ ಪ್ರಥಮ ದರ್ಜೆ ಮಹಾವಿದ್ಯಾಲಯ ಬಿಎ ಮತ್ತು ಬಿಕಾಂ ಆರನೇ ಸೆಮಿಸ್ಟರ್ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಶೇ. ೧೦೦ ರಷ್ಟು ಅತ್ಯುತ್ತಮ ಫಲಿತಾಂಶವನ್ನು ಪಡೆದು ಸಾಧನೆ ಮಾಡಿದೆ."
      : "GVH College achieved a flawless 100% pass rate in the final semester BA and B.Com university examinations, setting a proud academic record.",
    image: "/images/home/latest_updates/college_achievement_news.jpg",
    link: "/news",
    badgeColor: "bg-accent text-white"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <Reveal>
            <SectionHeading 
              title={language === "kn" ? "ಇತ್ತೀಚಿನ ಅಪ್ಡೇಟ್ಗಳು" : "Latest Updates"} 
              subtitle={
                language === "kn" 
                  ? "ನಮ್ಮ ರೋಮಾಂಚಕ ಕ್ಯಾಂಪಸ್‌ನ ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು, ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಸಾಧನೆಗಳು." 
                  : "Fresh news, upcoming events, and recent achievements from our vibrant campus."
              } 
            />
          </Reveal>
          <Reveal delay={0.2} direction="left">
            <Link href="/news" className="hidden md:inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors mb-4 text-lg">
              {language === "kn" ? "ಎಲ್ಲಾ ಅಪ್ಡೇಟ್ ವೀಕ್ಷಿಸಿ" : "View All Updates"} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          {/* Collage Grid inspired by the Campus Life visual layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px] w-full gap-4">
            
            {/* Main Featured News (Large Left Block) - Commerce Fest Slideshow */}
            <Link href="/achievements" className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[400px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="flex h-full transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 50}%)`, width: '200%' }}
                >
                  {commerceSlides.map((slide, idx) => (
                    <div key={idx} className="relative h-full w-1/2 flex-shrink-0">
                      <Image 
                        src={slide.image} 
                        alt={slide.title} 
                        fill 
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Date Overlay leftmost top */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                {commerceSlides[currentSlide].date}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 z-10">
                <span className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 tracking-wider">
                  {language === "kn" ? "ಸಾಧನೆ" : "ACHIEVEMENT"}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
                  {commerceSlides[currentSlide].title}
                </h3>
                <p className="text-white/90 text-xs md:text-sm mt-3 line-clamp-2 max-w-xl font-sans leading-relaxed">
                  {commerceSlides[currentSlide].description}
                </p>
              </div>
            </Link>

            {/* Event (Top Right Wide Block) - Cooking Without Fire */}
            <Link href={eventItem.link} className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={eventItem.image} 
                alt={eventItem.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {eventItem.date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {eventItem.date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 z-10">
                <span className={`${eventItem.badgeColor} px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-3 tracking-wider`}>
                  {language === "kn" ? "ಕಾರ್ಯಕ್ರಮ" : eventItem.type}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {eventItem.title}
                </h3>
                {eventItem.description && (
                  <p className="text-white/90 text-xs mt-2 line-clamp-1 max-w-xl font-sans leading-relaxed">
                    {eventItem.description}
                  </p>
                )}
              </div>
            </Link>

            {/* Achievement (Bottom Right Left Block) - Yoga Slideshow */}
            <Link href="/achievements" className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="flex h-full transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 50}%)`, width: '200%' }}
                >
                  {yogaSlides.map((slide, idx) => (
                    <div key={idx} className="relative h-full w-1/2 flex-shrink-0">
                      <Image 
                        src={slide.image} 
                        alt={slide.title} 
                        fill 
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Date Overlay leftmost top */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                {yogaSlides[currentSlide].date}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6 z-10">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider">
                  {language === "kn" ? "ಸಾಧನೆ" : "ACHIEVEMENT"}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {yogaSlides[currentSlide].title}
                </h3>
                <p className="text-white/90 text-[11px] mt-2 line-clamp-1 font-sans leading-relaxed">
                  {yogaSlides[currentSlide].description}
                </p>
              </div>
            </Link>

            {/* News Block (Bottom Right Right Block) - 100% Results Newspaper clipping */}
            <Link href={newsItem.link} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-none shadow-lg cursor-pointer block h-[250px] md:h-full border border-gray-100 border-t-2 border-t-transparent hover:border-t-gold transition-colors duration-300">
              <Image 
                src={newsItem.image} 
                alt={newsItem.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Date Overlay leftmost top */}
              {newsItem.date && (
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-semibold px-3 py-1 uppercase tracking-wider z-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10">
                  {newsItem.date}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6 z-10">
                <span className={`${newsItem.badgeColor} px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-2 uppercase tracking-wider`}>
                  {language === "kn" ? "ಸುದ್ದಿ" : newsItem.type}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {newsItem.title}
                </h3>
                {newsItem.description && (
                  <p className="text-white/90 text-[11px] mt-2 line-clamp-1 font-sans leading-relaxed">
                    {newsItem.description}
                  </p>
                )}
              </div>
            </Link>

          </div>
        </Reveal>
        
        {/* Mobile only view all button */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/news" className="inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors">
            {language === "kn" ? "ಎಲ್ಲಾ ಅಪ್ಡೇಟ್ ವೀಕ್ಷಿಸಿ" : "View All Updates"} <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
