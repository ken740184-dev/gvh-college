"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BAPage() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-16 md:pt-20">
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/academics/ba-banner.png" 
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

            {/* Core / Basic Subjects */}
            <div className="bg-surface border-l-4 border-gold p-6 rounded-r-lg mb-12 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy-deep mb-1">
                    {t("dept.ba_core_title")}
                  </h4>
                  <p className="text-secondary-text leading-relaxed">
                    {t("dept.ba_core_desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Combinations Table */}
            <h3 className="text-2xl font-sans font-bold mb-4">{t("dept.ba_combinations_title")}</h3>
            <p className="text-secondary-text mb-6 leading-relaxed">
              {t("dept.ba_combinations_desc")}
            </p>

            <div className="border border-border-color rounded-lg overflow-hidden mb-12 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy-deep text-white text-sm uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">{t("dept.ba_col_combination")}</th>
                    <th className="py-4 px-6 text-right w-40">{t("dept.ba_col_intake")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {[
                    { key: "dept.ba_comb_1", en: "50", kn: "೫೦" },
                    { key: "dept.ba_comb_2", en: "30", kn: "೩೦" },
                    { key: "dept.ba_comb_3", en: "100", kn: "೧೦೦" },
                    { key: "dept.ba_comb_4", en: "40", kn: "೪೦" },
                    { key: "dept.ba_comb_5", en: "15", kn: "೧೫" },
                    { key: "dept.ba_comb_6", en: "15", kn: "೧೫" }
                  ].map((comb, i) => (
                    <tr 
                      key={i} 
                      className="hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-medium text-primary-text">
                        {t(comb.key)}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-accent">
                        {language === "kn" ? comb.kn : comb.en}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/80 font-bold border-t-2 border-border-color">
                    <td className="py-4 px-6 text-primary-text">
                      {t("dept.ba_total_label")}
                    </td>
                    <td className="py-4 px-6 text-right text-accent text-lg">
                      {language === "kn" ? "೨೫೦" : "250"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Eligibility Requirements */}
            <h3 className="text-2xl font-sans font-bold mb-4">{t("dept.ba_eligibility_title")}</h3>
            <p className="text-secondary-text leading-relaxed mb-12">
              {t("dept.ba_eligibility_desc")}
            </p>

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
                  <span className="text-secondary-text">{t("dept.intake_label")}</span>
                  <span className="font-bold">{t("dept.seats_250")}</span>
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
