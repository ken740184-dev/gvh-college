"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function PrincipalPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 md:pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("principal.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("principal.subtitle")}
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl border border-border-color overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 relative min-h-[500px]">
                <Image 
                  src="/images/about/principal.jpg" 
                  alt="Principal" 
                  fill 
                  className="object-cover object-top"
                />
              </div>
              <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-primary-text">{t("principal.welcome")}</h2>
                
                <div className="space-y-6 text-secondary-text leading-relaxed">
                  <p>
                    {t("principal.p1")}
                  </p>
                  <p>
                    {t("principal.p2")}
                  </p>
                  <p>
                    {t("principal.p3")}
                  </p>
                  <p>
                    {t("principal.p4")}
                  </p>
                  <p>
                    {t("principal.p5")}
                  </p>
                  <p>
                    {t("principal.p6")}
                  </p>
                  <p className="font-semibold italic text-primary-text border-l-4 border-accent pl-4">
                    {t("principal.p7")}
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-primary-text mb-1">{t("principal.name")}</h3>
                  <p className="text-accent font-semibold mb-2">{t("principal.qual")}</p>
                  <p className="text-sm text-secondary-text">{t("principal.role")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
