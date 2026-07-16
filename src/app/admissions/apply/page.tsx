"use client";

import { useLanguage } from "@/context/LanguageContext";
import { buttonVariants } from "@/components/ui/Button";
import { Download, FileText, Printer, CheckCircle2 } from "lucide-react";

export default function ApplyPage() {
  const { t } = useLanguage();

  const steps = [
    {
      num: 1,
      titleKey: "apply.step_1_title",
      descKey: "apply.step_1_desc",
      icon: <Download className="w-6 h-6 text-accent" />
    },
    {
      num: 2,
      titleKey: "apply.step_2_title",
      descKey: "apply.step_2_desc",
      icon: <FileText className="w-6 h-6 text-accent" />
    },
    {
      num: 3,
      titleKey: "apply.step_3_title",
      descKey: "apply.step_3_desc",
      icon: <CheckCircle2 className="w-6 h-6 text-accent" />
    },
    {
      num: 4,
      titleKey: "apply.step_4_title",
      descKey: "apply.step_4_desc",
      icon: <Printer className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-navbar py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-sans font-bold mb-4">
            {t("apply.page_title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t("admissions.subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Instructions Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border-color">
              <h2 className="text-2xl font-sans font-bold mb-8 text-navy-deep border-b pb-4">
                {t("apply.instructions_title")}
              </h2>

              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.num} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10 shadow-sm">
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-text mb-1">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Action */}
              <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                <a 
                  href="/admission_form.pdf" 
                  download="admission_form.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "default", className: "w-full justify-center py-3 text-base flex items-center cursor-pointer" })}
                >
                  <Download className="w-5 h-5 mr-2" /> {t("apply.download_btn")}
                </a>
              </div>
            </div>
          </div>

          {/* Form Preview Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border-color flex flex-col h-full">
              <h2 className="text-xl font-sans font-bold text-navy-deep mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-gold" />
                {t("apply.preview_title")}
              </h2>
              
              <div className="relative flex-grow min-h-[600px] md:min-h-[750px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                <iframe
                  src="/admission_form.pdf"
                  className="absolute inset-0 w-full h-full border-none"
                  title="GVH College Admission Form Preview"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-secondary-text mb-6">
                      {t("apply.preview_fallback")}
                    </p>
                    <a 
                      href="/admission_form.pdf" 
                      download="admission_form.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "default", className: "flex items-center cursor-pointer" })}
                    >
                      <Download className="w-4 h-4 mr-2" /> {t("apply.download_btn")}
                    </a>
                  </div>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
