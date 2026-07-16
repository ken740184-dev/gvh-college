"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Building2, School } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function CampusLifePage() {
  const { t } = useLanguage();

  const subpages = [
    {
      title: t("campus.academic_facilities"),
      description: t("campus.academic_facilities_desc"),
      image: "/images/campus-life/facilities/well-organized-classroom.png",
      href: "/campus-life/academic-facilities",
      icon: GraduationCap,
      color: "from-blue-600/90 to-indigo-600/90"
    },
    {
      title: t("campus.on_campus_facilities"),
      description: t("campus.on_campus_facilities_desc"),
      image: "/images/campus-life/facilities/auditoriumoutside.jpg",
      href: "/campus-life/on-campus-facilities",
      icon: School,
      color: "from-amber-600/90 to-orange-600/90"
    },
    {
      title: t("campus.infrastructure"),
      description: t("campus.infrastructure_desc"),
      image: "/images/campus-life/facilities/auditoriumoutsidebackside.png",
      href: "/campus-life/infrastructure",
      icon: Building2,
      color: "from-emerald-600/90 to-teal-600/90"
    }
  ];

  return (
    <div className="pt-16 md:pt-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/campus-life/cultural-fest-new.jpeg"
            alt="Campus Life"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            {t("nav.campus_life")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 drop-shadow-md">
            {t("campus.title")}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {t("campus.subtitle")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Bento Grid linking to subpages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subpages.map((page, idx) => {
            const Icon = page.icon;
            return (
              <Link 
                key={idx} 
                href={page.href}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col h-[480px]"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${page.color} opacity-40 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-30`} />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-sm text-slate-800">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-accent transition-colors duration-200 mb-3">
                      {page.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {page.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-accent font-bold text-sm tracking-wide uppercase mt-4">
                    <span>{t("hero.explore")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Institutional Committees, Cells and Units Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("campus.committees_title")} centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => {
              const num = i + 1;
              return (
                <div 
                  key={num}
                  className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-bold text-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300 shrink-0">
                    {num}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors">
                      {t(`campus.committee_${num}`)}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
