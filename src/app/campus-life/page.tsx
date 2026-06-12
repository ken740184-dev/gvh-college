"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export default function CampusLifePage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("campus.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("campus.subtitle")}
          </p>
        </div>
      </div>

      {/* Cultural Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/campus-life/cultural-fest.webp" 
                alt="Cultural Activities" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading title={t("campus.cultural_title")} />
              <p className="text-secondary-text text-lg leading-relaxed mb-6">
                {t("campus.cultural_desc")}
              </p>
              <ul className="space-y-2 text-secondary-text list-disc pl-5">
                <li>{t("campus.cult1")}</li>
                <li>{t("campus.cult2")}</li>
                <li>{t("campus.cult3")}</li>
                <li>{t("campus.cult4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title={t("campus.sports_title")} />
              <p className="text-secondary-text text-lg leading-relaxed mb-6">
                {t("campus.sports_desc")}
              </p>
              <ul className="space-y-2 text-secondary-text list-disc pl-5">
                <li>{t("campus.sport1")}</li>
                <li>{t("campus.sport2")}</li>
                <li>{t("campus.sport3")}</li>
                <li>{t("campus.sport4")}</li>
              </ul>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/campus-life/sports.webp" 
                alt="Sports Activities" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NSS & Clubs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("campus.orgs_title")} centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">{t("campus.nss_title")}</h3>
              <p className="text-secondary-text mb-4">
                {t("campus.nss_desc")}
              </p>
            </div>
            
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">{t("campus.clubs_title")}</h3>
              <p className="text-secondary-text mb-4">
                {t("campus.clubs_desc")}
              </p>
            </div>
            
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">{t("campus.workshops_title")}</h3>
              <p className="text-secondary-text mb-4">
                {t("campus.workshops_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

