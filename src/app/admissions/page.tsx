"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdmissionsPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 md:pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">{t("admissions.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("admissions.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <SectionHeading title={t("admissions.process")} />
            <div className="space-y-8 mb-16">
              {[
                { step: t("admissions.step1_title"), desc: t("admissions.step1_desc") },
                { step: t("admissions.step2_title"), desc: t("admissions.step2_desc") },
                { step: t("admissions.step3_title"), desc: t("admissions.step3_desc") },
                { step: t("admissions.step4_title"), desc: t("admissions.step4_desc") }
              ].map((process, i) => (
                <div key={i} className="flex bg-gray-50 p-6 rounded-lg border border-border-color">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{process.step}</h3>
                    <p className="text-secondary-text">{process.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SectionHeading title={t("admissions.documents")} />
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color mb-16">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t("admissions.doc1"),
                  t("admissions.doc2"),
                  t("admissions.doc3"),
                  t("admissions.doc4"),
                  t("admissions.doc5"),
                  t("admissions.doc6")
                ].map((doc, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    <span className="text-primary-text font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <SectionHeading title={t("admissions.scholarships")} />
            <p className="text-secondary-text mb-6">
              {t("admissions.scholarships_desc")}
            </p>
            <ul className="list-disc pl-5 text-secondary-text space-y-2">
              <li>{t("admissions.sch1")}</li>
              <li>{t("admissions.sch2")}</li>
              <li>{t("admissions.sch3")}</li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-border-color rounded-lg p-8 sticky top-28">
              <h3 className="text-xl font-sans font-bold mb-6 border-b border-gray-200 pb-4">{t("admissions.fee_structure")}</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">{t("admissions.fee_bcom")}</span>
                  <span className="font-bold text-accent">₹9,000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">{t("admissions.fee_ba")}</span>
                  <span className="font-bold text-accent">₹9,000</span>
                </li>
              </ul>
              <p className="text-sm text-secondary-text italic mt-6">
                {t("admissions.fee_note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
