"use client";

import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import NewsTicker from "@/components/home/NewsTicker";
import QuickStats from "@/components/home/QuickStats";
import LatestUpdatesCollage from "@/components/home/LatestUpdatesCollage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BookOpen, Users, Building, Trophy, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HomeClientProps {
  announcement: {
    text: string;
    isActive: boolean;
  } | null;
}

export default function HomeClient({ announcement }: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />
      <NewsTicker text={announcement?.text} isActive={announcement?.isActive} />
      <QuickStats />

      {/* About College */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div>
                <SectionHeading title={t("home.about_title")} subtitle={t("home.about_subtitle")} />
                <p className="text-lg text-secondary-text mb-6 leading-relaxed">
                  {t("home.about_desc")}
                </p>
                <Button href="/about">{t("home.about_btn")}</Button>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/about/campus-overview.webp" 
                  alt="Campus overview" 
                  fill 
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gudleppa Hallikeri Tribute */}
      <section className="py-20 bg-gray-100 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Image (Left side) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal direction="right" delay={0.2}>
                <div className="relative h-[450px] border border-gray-200 shadow-xl rounded-none overflow-hidden group bg-white">
                  {/* Shimmer reflection */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out" />
                  </div>
                  <Image 
                    src="/images/about/gudleppa-biography.jpg" 
                    alt="Gudleppa Hallikeri" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
              </Reveal>
            </div>

            {/* Content (Right side) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal direction="left">
                <div>
                  <span className="bg-red-500/10 border border-red-500/20 text-accent px-3 py-1 rounded-none text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm">
                    {t("home.founder_badge")}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-slate-800 leading-tight uppercase tracking-tight">
                    {t("home.founder_title")}
                  </h2>
                  <p className="text-lg text-secondary-text mb-6 leading-relaxed font-sans">
                    {t("home.founder_desc1")}
                  </p>
                  <p className="text-secondary-text mb-8 leading-relaxed font-sans opacity-90">
                    {t("home.founder_desc2")}
                  </p>
                  <Button href="/about/gudleppa-hallikeri" variant="outline" className="rounded-none font-bold">
                    {t("home.founder_btn")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading 
              title={t("home.dept_title")} 
              centered 
              subtitle={t("home.dept_subtitle")}
            />
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* B.Com Card */}
            <Reveal direction="up" delay={0.2}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image 
                    src="/images/academics/bcom-banner.webp" 
                    alt="Commerce Department" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-sans font-bold mb-4">{t("home.dept_bcom_title")}</h3>
                  <p className="text-secondary-text mb-6">
                    {t("home.dept_bcom_desc")}
                  </p>
                  <Button href="/departments/bcom" variant="outline" className="w-full sm:w-auto">
                    {t("home.learn_more")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* B.A. Card */}
            <Reveal direction="up" delay={0.4}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image 
                    src="/images/academics/ba-banner.webp" 
                    alt="Arts Department" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-sans font-bold mb-4">{t("home.dept_ba_title")}</h3>
                  <p className="text-secondary-text mb-6">
                    {t("home.dept_ba_desc")}
                  </p>
                  <Button href="/departments/ba" variant="outline" className="w-full sm:w-auto">
                    {t("home.learn_more")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading title={t("home.why_title")} centered />
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { icon: <Users className="w-8 h-8" />, title: t("home.why_feat1_title"), desc: t("home.why_feat1_desc") },
              { icon: <BookOpen className="w-8 h-8" />, title: t("home.why_feat2_title"), desc: t("home.why_feat2_desc") },
              { icon: <Building className="w-8 h-8" />, title: t("home.why_feat3_title"), desc: t("home.why_feat3_desc") },
              { icon: <Briefcase className="w-8 h-8" />, title: t("home.why_feat4_title"), desc: t("home.why_feat4_desc") },
              { icon: <GraduationCap className="w-8 h-8" />, title: t("home.why_feat5_title"), desc: t("home.why_feat5_desc") },
              { icon: <Trophy className="w-8 h-8" />, title: t("home.why_feat6_title"), desc: t("home.why_feat6_desc") },
            ].map((feature, i) => (
              <Reveal key={i} delay={0.1 * i} direction="up">
                <div className="p-6 border border-border-color rounded-lg hover:border-accent transition-colors group h-full">
                  <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-secondary-text">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life - Visual Heavy */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <Reveal>
            <SectionHeading title={t("home.campus_title")} light centered subtitle={t("home.campus_subtitle")} />
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[600px] w-full gap-2 px-2">
            <div className="col-span-2 row-span-2 relative group overflow-hidden">
              <Image src="/images/campus-life/cultural-fest.webp" alt="Campus Life" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h3 className="text-2xl font-bold">{t("home.campus_fest")}</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden">
              <Image src="/images/campus-life/sports.webp" alt="Sports" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h3 className="text-lg font-bold">{t("home.campus_sports")}</h3>
              </div>
            </div>
            <div className="relative group overflow-hidden">
              <Image src="/images/academics/bcom-banner.webp" alt="Library" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h3 className="text-lg font-bold">{t("home.campus_library")}</h3>
              </div>
            </div>
            <div className="col-span-2 relative group overflow-hidden">
              <Image src="/images/about/campus-overview.webp" alt="Campus" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold">{t("home.campus_historic")}</h3>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gallery Preview & Call to Action */}
      <section className="py-8 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-sans font-bold mb-2">{t("home.discover_title")}</h2>
          <p className="text-lg text-secondary-text mb-4">{t("home.discover_desc")}</p>
          <Button href="/gallery" size="default">{t("home.discover_btn")}</Button>
        </div>
      </section>

      <LatestUpdatesCollage />
    </>
  );
}
