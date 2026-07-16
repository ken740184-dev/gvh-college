"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/about/campus-overview.jpg" 
          alt="About GVH College" 
          fill 
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white drop-shadow-md">
            {t("about.title")}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* Row 1: Intro Grid (Left: NES, College, Affiliations. Right: Sidebar Facts & Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <SectionHeading title={t("about.hero_subtitle")} />
            </div>

            {/* National Education Society Section - Headline & Paragraph */}
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                {t("about.nes_legacy_title")}
              </h2>
              <div className="w-10 h-[2px] bg-accent"></div>
              <p className="text-sm md:text-base text-secondary-text leading-relaxed">
                {t("about.nes_legacy_desc")}
              </p>
            </div>

            {/* College Section - Headline & Paragraph with Inline Biography Link */}
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                {t("about.college_heading")}
              </h2>
              <div className="w-10 h-[2px] bg-accent"></div>
              <p className="text-sm md:text-base text-secondary-text leading-relaxed">
                {t("about.college_desc")}{" "}
                <a 
                  href="/about/gudleppa-hallikeri" 
                  className="text-accent hover:underline font-bold inline-flex items-center gap-1 transition-all uppercase tracking-wider text-xs ml-1"
                >
                  {t("about.gudleppa_cta_btn")} &rarr;
                </a>
              </p>
            </div>

            {/* Affiliations Section - Paragraph Descriptive */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                {t("about.affiliation_heading")}
              </h3>
              <p className="text-sm md:text-base text-secondary-text leading-relaxed">
                {t("about.affiliation_desc")}
              </p>
            </div>
          </div>

          {/* Right Column: Sidebar facts & Campus overview photo to cover blank space */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Facts Card */}
            <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-none space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-gray-100 pb-3 uppercase tracking-wider">
                {t("about.sidebar_title")}
              </h3>
              <div className="space-y-3 text-xs leading-relaxed text-secondary-text">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-semibold text-slate-700">{t("about.fact_est")}</span>
                  <span>{t("about.fact_est_val")}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-semibold text-slate-700">{t("about.fact_society")}</span>
                  <span className="text-right max-w-[200px]">{t("about.fact_society_val")}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-semibold text-slate-700">{t("about.fact_result")}</span>
                  <span className="text-accent font-bold">{t("about.fact_result_val")}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-semibold text-slate-700">{t("about.fact_affiliation")}</span>
                  <span className="text-right max-w-[200px]">{t("about.fact_affiliation_val")}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-700">{t("about.fact_location")}</span>
                  <span>{t("about.fact_location_val")}</span>
                </div>
              </div>
            </div>

            {/* Campus Photo */}
            <div className="relative w-full aspect-[4/3] border border-gray-200 shadow-sm overflow-hidden bg-gray-50">
              <Image 
                src="/images/about/infrastructure.jpg" 
                alt="College Infrastructure" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Full-width Logos Row (Stretches across all columns/entire row) */}
        <div className="w-full bg-white border border-gray-200 shadow-sm p-10 md:p-12">
          <h4 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Affiliations & Accreditations
          </h4>
          <div className="flex flex-row items-center justify-around flex-wrap gap-8 md:gap-12">
            {/* 1. UGC Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-52 h-52 md:w-60 md:h-60 bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                <Image 
                  src="/images/about/UGC_India_Logo.png" 
                  alt="UGC Logo" 
                  fill 
                  className="object-contain p-3 md:p-4"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider max-w-[200px]">
                {t("about.logo_ugc_label")}
              </span>
            </div>

            {/* 2. Haveri University Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-52 h-52 md:w-60 md:h-60 bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                <Image 
                  src="/images/about/haveri-university-logo-209.jpg.jpeg" 
                  alt="Haveri University Logo" 
                  fill 
                  className="object-contain p-3 md:p-4"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider max-w-[200px]">
                {t("about.logo_haveri_label")}
              </span>
            </div>

            {/* 3. NES Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-52 h-52 md:w-60 md:h-60 bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                <Image 
                  src="/images/about/NES EMBLEM FINAL.png" 
                  alt="National Education Society Logo" 
                  fill 
                  className="object-contain p-3 md:p-4"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider max-w-[200px]">
                {t("about.logo_nes_label")}
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Geographical Location Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              {t("about.location_heading")}
            </h3>
            <p className="text-sm md:text-base text-secondary-text leading-relaxed">
              {t("about.location_desc")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Slogan */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-1">Slogan</p>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">SERVICE UNTO HUMANITY</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.vision_title")}</h3>
              <ul className="text-secondary-text space-y-2 list-disc pl-5">
                <li>Moulding individual personality and strengthening the Nation.</li>
                <li>To impart knowledge and mould the character of the students.</li>
                <li>To render yeomen service to the cause of society.</li>
              </ul>
            </div>
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.mission_title")}</h3>
              <ul className="text-secondary-text space-y-2 list-disc pl-5">
                <li>{t("about.mission_li1")}</li>
                <li>{t("about.mission_li2")}</li>
                <li>{t("about.mission_li3")}</li>
                <li>{t("about.mission_li4")}</li>
                <li>{t("about.mission_li5")}</li>
                <li>{t("about.mission_li6")}</li>
              </ul>
            </div>
            {/* Goals and Objectives */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.goals_title")}</h3>
              <ul className="text-secondary-text space-y-2 list-disc pl-5">
                <li>{t("about.goals_li1")}</li>
                <li>{t("about.goals_li2")}</li>
                <li>{t("about.goals_li3")}</li>
                <li>{t("about.goals_li4")}</li>
                <li>{t("about.goals_li5")}</li>
                <li>{t("about.goals_li6")}</li>
                <li>{t("about.goals_li7")}</li>
                <li>{t("about.goals_li8")}</li>
                <li>{t("about.goals_li9")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
