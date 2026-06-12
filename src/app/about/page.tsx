"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/about/campus-overview.webp" 
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading title={t("about.hero_subtitle")} />
            <div className="space-y-6 text-secondary-text leading-relaxed">
              <p>
                {t("about.p1")}
              </p>
              <p>
                {t("about.p2")}
              </p>
              <p>
                {t("about.p3")}
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src="/images/academics/ba-banner.webp" 
              alt="College Legacy" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.vision_title")}</h3>
              <p className="text-secondary-text">
                {t("about.vision_desc")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.mission_title")}</h3>
              <ul className="text-secondary-text space-y-2 list-disc pl-5">
                <li>{t("about.mission_li1")}</li>
                <li>{t("about.mission_li2")}</li>
                <li>{t("about.mission_li3")}</li>
                <li>{t("about.mission_li4")}</li>
                <li>{t("about.mission_li5")}</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">{t("about.values_title")}</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  t("about.val_integrity"),
                  t("about.val_excellence"),
                  t("about.val_responsibility"),
                  t("about.val_inclusiveness"),
                  t("about.val_innovation"),
                  t("about.val_learning")
                ].map((val) => (
                  <span key={val} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-primary-text font-medium">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
