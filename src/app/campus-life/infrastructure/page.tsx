"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function InfrastructurePage() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("campus.infra.project_main_title"),
      description: t("campus.infra.project_main_desc"),
      image: "/images/campus-life/facilities/well-organized-classroom.png",
      year: "2021",
      tag: "Academic"
    },
    {
      title: t("campus.infra.project_audit_title"),
      description: t("campus.infra.project_audit_desc"),
      image: "/images/campus-life/facilities/auditoriumoutsidebackside.png",
      year: "2021",
      tag: "Auditorium"
    },
    {
      title: t("campus.infra.project_lab_title"),
      description: t("campus.infra.project_lab_desc"),
      image: "/images/campus-life/facilities/computer-lab.png",
      year: "2021",
      tag: "Technology"
    },
    {
      title: t("campus.infra.project_water_title"),
      description: t("campus.infra.project_water_desc"),
      image: "/images/campus-life/facilities/filter-water-facility.jpg",
      year: "2021",
      tag: "Health"
    }
  ];

  return (
    <div className="pt-16 md:pt-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/campus-life" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-6 font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{t("apply.back")}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            {t("campus.infrastructure")}
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
            {t("campus.infrastructure_desc")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Overview Box */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <Building2 className="w-6 h-6" />
                <span className="text-gold text-xs font-bold uppercase tracking-widest">
                  {t("campus.infra.overview_title")}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                {t("campus.infra.overview_title")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t("campus.infra.overview_desc")}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-slate-900 text-white rounded-2xl p-6 text-center shadow-md w-full max-w-[240px]">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase block mb-1">
                  Built &amp; Completed
                </span>
                <span className="text-4xl font-extrabold text-white block">
                  2021
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project timeline / list */}
        <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
          {t("campus.infra.projects_title")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[450px]"
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-sm">
                  {proj.tag}
                </div>
              </div>
              
              {/* Text */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Completed In {proj.year}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {proj.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
