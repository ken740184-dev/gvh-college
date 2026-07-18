"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, GlassWater, Award, Heart, Shield, BookOpen, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OnCampusFacilitiesPage() {
  const { t } = useLanguage();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const auditoriumPhotos = [
    {
      src: "/images/campus-life/facilities/oncampus_facilities/auditorium.jpg",
      title: "Auditorium Stage View",
    },
    {
      src: "/images/campus-life/facilities/oncampus_facilities/auditorium2.jpg",
      title: "Auditorium Seating & Interior",
    },
    {
      src: "/images/campus-life/facilities/oncampus_facilities/auditoriumoutside.jpg",
      title: "Auditorium Entrance & Front Elevation",
    },
    {
      src: "/images/campus-life/facilities/oncampus_facilities/auditoriumoutsidebackside.png",
      title: "Auditorium Wide Angle / Backside View",
    }
  ];

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev === 0 ? auditoriumPhotos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev === auditoriumPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-16 md:pt-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/campus-life" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-6 font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{t("apply.back")}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
            {t("campus.on_campus_facilities")}
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
            {t("campus.on_campus_facilities_desc")}
          </p>
        </div>
      </div>

      {/* Facilities Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Purified Drinking Water Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <GlassWater className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.water_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {t("campus.oncampus.water_desc")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="/images/campus-life/facilities/oncampus_facilities/filter-water-facility.jpg"
                alt="RO Drinking Water Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Auditorium Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.auditorium_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-8">
              {t("campus.oncampus.auditorium_desc")}
            </p>
            {/* Gallery Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-2">
              {auditoriumPhotos.map((photo, index) => (
                <button
                   key={index}
                   onClick={() => setActivePhotoIdx(index)}
                   className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                     activePhotoIdx === index ? "border-amber-500 scale-[1.03] shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                   }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-black group">
              <Image
                src={auditoriumPhotos[activePhotoIdx].src}
                alt={auditoriumPhotos[activePhotoIdx].title}
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
                <p className="text-sm font-semibold tracking-wider text-amber-400 uppercase mb-1">
                  Photo {activePhotoIdx + 1} of {auditoriumPhotos.length}
                </p>
                <h4 className="text-lg font-bold">
                  {auditoriumPhotos[activePhotoIdx].title}
                </h4>
              </div>
              
              {/* Carousel Navigation Buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Yoga & Wellness Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.wellness_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {t("campus.oncampus.wellness_desc")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/campus-life/facilities/girls-yoga-group-1.jpg"
                  alt="Girls Yoga Training Session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/campus-life/facilities/oncampus_facilities/yoga-girl.jpg"
                  alt="Yoga Posture Demonstration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safe & Secure Campus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.security_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {t("campus.oncampus.security_desc")}
            </p>
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="/images/campus-life/facilities/oncampus_facilities/safe_and_secure_environment_for_boys_and_girls.jpg"
                alt="Safe and Secure Campus Environment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Competitive Exam Training Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.competitive_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {t("campus.oncampus.competitive_desc")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="/images/campus-life/facilities/oncampus_facilities/competitive_exam_training_and_information.jpg"
                alt="Competitive Exam Training Hall"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Sports & Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                {t("nav.on_campus_facilities")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t("campus.oncampus.sports_title")}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {t("campus.oncampus.sports_desc")}
            </p>
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/campus-life/facilities/oncampus_facilities/greater_encouragement_for_sports_yoga_and_healthy_activities.jpg"
                  alt="Sports & Games Encouragement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/campus-life/facilities/boys-yoga-group-1.jpg"
                  alt="Boys Yoga & Fitness Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
