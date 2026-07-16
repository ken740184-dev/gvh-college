"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Laptop, Users, GraduationCap, School } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicFacilitiesPage() {
  const { t } = useLanguage();

  const facilities = [
    {
      title: t("campus.academic.professors_title"),
      description: t("campus.academic.professors_desc"),
      image: "/images/campus-life/facilities/teacher-student-guiding-and-communication.jpg",
      icon: GraduationCap,
      color: "border-blue-500/20 shadow-blue-500/5"
    },
    {
      title: t("campus.academic.coordination_title"),
      description: t("campus.academic.coordination_desc"),
      image: "/images/campus-life/facilities/teacher-student-guiding-and-communication-2.jpg",
      icon: Users,
      color: "border-indigo-500/20 shadow-indigo-500/5"
    },
    {
      title: t("campus.academic.library_title"),
      description: t("campus.academic.library_desc"),
      image: "/images/campus-life/facilities/library-bookshelf.png",
      secondaryImage: "/images/campus-life/facilities/girl-sitting-in-library.jpg",
      icon: BookOpen,
      color: "border-emerald-500/20 shadow-emerald-500/5"
    },
    {
      title: t("campus.academic.computer_lab_title"),
      description: t("campus.academic.computer_lab_desc"),
      image: "/images/campus-life/facilities/computer-lab.png",
      icon: Laptop,
      color: "border-violet-500/20 shadow-violet-500/5"
    },
    {
      title: t("campus.academic.classroom_title"),
      description: t("campus.academic.classroom_desc"),
      image: "/images/campus-life/facilities/well-organized-classroom.png",
      icon: School,
      color: "border-amber-500/20 shadow-amber-500/5"
    }
  ];

  return (
    <div className="pt-16 md:pt-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.3),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/campus-life" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-6 font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{t("apply.back")}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            {t("campus.academic_facilities")}
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
            {t("campus.academic_facilities_desc")}
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Text Content */}
                <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-gold text-xs font-bold uppercase tracking-widest">
                      {t("nav.academic_facilities")}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                    {fac.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base mb-8">
                    {fac.description}
                  </p>
                </div>

                {/* Image Container */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  {fac.secondaryImage ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                        <Image
                          src={fac.image}
                          alt={fac.title}
                          fill
                          className="object-cover hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                      <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                        <Image
                          src={fac.secondaryImage}
                          alt={`${fac.title} secondary`}
                          fill
                          className="object-cover hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                      <Image
                        src={fac.image}
                        alt={fac.title}
                        fill
                        className="object-cover hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
