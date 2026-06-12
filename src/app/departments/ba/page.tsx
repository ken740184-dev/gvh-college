"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BAPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/academics/ba-banner.webp" 
          alt={t("dept.ba_title")} 
          fill 
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white drop-shadow-md">
            {t("dept.ba_title")}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SectionHeading title={t("dept.overview")} />
            <p className="text-secondary-text mb-8 leading-relaxed text-lg">
              {t("dept.ba_overview")}
            </p>

            <h3 className="text-2xl font-sans font-bold mb-6">{t("dept.objectives")}</h3>
            <ul className="space-y-4 mb-12">
              {[
                t("dept.ba_obj1"),
                t("dept.ba_obj2"),
                t("dept.ba_obj3"),
                t("dept.ba_obj4")
              ].map((obj, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent mr-3 flex-shrink-0" />
                  <span className="text-secondary-text">{obj}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-sans font-bold mb-6">{t("dept.career")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {t("dept.ba_careers").split(", ").map((career) => (
                <div key={career} className="bg-gray-50 border border-border-color p-4 rounded-md text-center font-medium">
                  {career}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-border-color rounded-lg p-8 sticky top-28">
              <h3 className="text-xl font-sans font-bold mb-6 border-b border-gray-200 pb-4">{t("dept.details")}</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between">
                  <span className="text-secondary-text">{t("dept.duration_label")}</span>
                  <span className="font-bold">{t("dept.duration_val")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary-text">{t("dept.eligibility_label")}</span>
                  <span className="font-bold">{t("dept.eligibility_val")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary-text">{t("dept.intake_label")}</span>
                  <span className="font-bold">{t("dept.seats_100")}</span>
                </li>
              </ul>
              <Button href="/admissions" className="w-full">
                {t("dept.apply_btn")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
