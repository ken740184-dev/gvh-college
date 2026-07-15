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
import AnnouncementPopup from "@/components/home/AnnouncementPopup";

interface HomeClientProps {
  announcement: {
    text: string;
    isActive: boolean;
    popupActive?: boolean;
    popupTitle?: string;
    popupImageUrl?: string;
    popupLink?: string;
    marqueeButtonText?: string;
    marqueeButtonLink?: string;
  } | null;
  news: any[];
  events: any[];
  achievements: any[];
  campusLifeImages?: any[];
}

export default function HomeClient({ announcement, news, events, achievements, campusLifeImages = [] }: HomeClientProps) {
  const { t } = useLanguage();

  const features = [
    { icon: <Users className="w-7 h-7" />, title: t("home.why_feat1_title"), desc: t("home.why_feat1_desc") },
    { icon: <BookOpen className="w-7 h-7" />, title: t("home.why_feat2_title"), desc: t("home.why_feat2_desc") },
    { icon: <Building className="w-7 h-7" />, title: t("home.why_feat3_title"), desc: t("home.why_feat3_desc") },
    { icon: <Briefcase className="w-7 h-7" />, title: t("home.why_feat4_title"), desc: t("home.why_feat4_desc") },
    { icon: <GraduationCap className="w-7 h-7" />, title: t("home.why_feat5_title"), desc: t("home.why_feat5_desc") },
    { icon: <Trophy className="w-7 h-7" />, title: t("home.why_feat6_title"), desc: t("home.why_feat6_desc") },
  ];

  return (
    <>
      <HeroSection />
      <NewsTicker
        text={announcement?.text}
        isActive={announcement?.isActive}
        buttonText={announcement?.marqueeButtonText}
        buttonLink={announcement?.marqueeButtonLink}
      />
      <QuickStats />

      {/* ── About College ───────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div>
                <SectionHeading
                  title={t("home.about_title")}
                  subtitle={t("home.about_subtitle")}
                  accent
                />
                <p className="text-lg text-secondary-text mb-8 leading-relaxed">
                  {t("home.about_desc")}
                </p>
                <Button href="/about">{t("home.about_btn")}</Button>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
              {/* Sharp-edge image with gold ring frame */}
              <div className="relative h-[420px] overflow-hidden shadow-2xl ring-1 ring-gold/25 ring-offset-4 ring-offset-surface">
                <Image
                  src="/images/about/campus-overview.jpg"
                  alt="Campus overview"
                  fill
                  className="object-cover"
                />
                {/* Subtle corner accent */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/60 pointer-events-none z-10" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/60 pointer-events-none z-10" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gudleppa Hallikeri Tribute ──────────────────────────── */}
      <section className="py-24 bg-white border-t border-border-color">
        {/* Subtle watermark texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,#1a3a8f 39px,#1a3a8f 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#1a3a8f 39px,#1a3a8f 40px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal direction="right" delay={0.2}>
                <div className="relative h-[460px] overflow-hidden group bg-white shadow-2xl border border-gold/20">
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
                  {/* Corner gold marks */}
                  <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 z-10" />
                  <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 z-10" />
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal direction="left">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="block w-6 h-px bg-gold" />
                    <span className="block w-3 h-px bg-gold/50" />
                  </div>
                  <span className="bg-accent/10 border border-accent/20 text-accent px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5 inline-block">
                    {t("home.founder_badge")}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-slate-800 leading-tight uppercase tracking-tight">
                    {t("home.founder_title")}
                  </h2>
                  <div className="w-10 h-[3px] bg-gold mb-6" />
                  <p className="text-lg text-secondary-text mb-5 leading-relaxed font-sans">
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

      {/* ── Featured Departments ────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              title={t("home.dept_title")}
              centered
              subtitle={t("home.dept_subtitle")}
              accent
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* B.Com Card */}
            <Reveal direction="up" delay={0.2}>
              <div className="bg-white overflow-hidden shadow-md border border-border-color border-l-4 border-l-transparent hover:border-l-gold transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/academics/bcom-banner.png"
                    alt="Commerce Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Blue overlay on hover */}
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-sans font-bold mb-4">{t("home.dept_bcom_title")}</h3>
                  <p className="text-secondary-text mb-6 leading-relaxed">{t("home.dept_bcom_desc")}</p>
                  <Button href="/departments/bcom" variant="outline" className="w-full sm:w-auto">
                    {t("home.learn_more")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* B.A. Card */}
            <Reveal direction="up" delay={0.4}>
              <div className="bg-white overflow-hidden shadow-md border border-border-color border-l-4 border-l-transparent hover:border-l-gold transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/academics/ba-banner.png"
                    alt="Arts Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-sans font-bold mb-4">{t("home.dept_ba_title")}</h3>
                  <p className="text-secondary-text mb-6 leading-relaxed">{t("home.dept_ba_desc")}</p>
                  <Button href="/departments/ba" variant="outline" className="w-full sm:w-auto">
                    {t("home.learn_more")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading title={t("home.why_title")} centered accent />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, i) => (
              <Reveal key={i} delay={0.08 * i} direction="up">
                <div className="relative p-8 border border-border-color hover:border-gold/40 hover:shadow-lg hover:bg-surface transition-all duration-300 group h-full overflow-hidden">
                  {/* Large faded number label for depth */}
                  <span
                    className="absolute -top-3 -right-2 text-[80px] font-bold text-border-color/60 select-none pointer-events-none leading-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Diamond-rotated icon container */}
                  <div className="relative w-14 h-14 mb-6">
                    <div className="absolute inset-0 rotate-45 bg-accent/8 border border-accent/15 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center text-accent group-hover:text-gold transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-secondary-text relative z-10 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campus Life ────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <Reveal>
            <SectionHeading title={t("home.campus_title")} light centered subtitle={t("home.campus_subtitle")} />
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          {(() => {
            const getCampusLifeItem = (index: number, fallbackSrc: string, fallbackTitleKey: string) => {
              const dbImg = campusLifeImages && campusLifeImages[index];
              return {
                src: dbImg ? dbImg.url : fallbackSrc,
                title: dbImg && dbImg.title ? dbImg.title : t(fallbackTitleKey),
              };
            };

            const item0 = getCampusLifeItem(0, "/images/campus-life/cultural-fest-new.jpeg", "home.campus_fest");
            const item1 = getCampusLifeItem(1, "/images/home/hero/image3.jpg", "home.campus_sports");
            const item2 = getCampusLifeItem(2, "/images/academics/bcom-banner.png", "home.campus_library");
            const item3 = getCampusLifeItem(3, "/images/about/campus-overview.jpg", "home.campus_historic");

            const CampusCell = ({
              src,
              title,
              label,
              className = "",
            }: {
              src: string;
              title: string;
              label: string;
              className?: string;
            }) => (
              <div className={`relative group overflow-hidden ${className}`}>
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gold frame inner border on hover */}
                <span className="absolute inset-[6px] border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    {/* Editorial numbered caption */}
                    <span className="text-gold text-[10px] font-mono tracking-[0.3em] uppercase mb-1 block opacity-80">
                      {label}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{title}</h3>
                  </div>
                </div>
              </div>
            );

            return (
              <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[600px] w-full gap-[3px] px-0">
                <CampusCell src={item0.src} title={item0.title} label="01 / Culture"   className="col-span-2 row-span-2" />
                <CampusCell src={item1.src} title={item1.title} label="02 / Sports"    />
                <CampusCell src={item2.src} title={item2.title} label="03 / Academics" />
                <CampusCell src={item3.src} title={item3.title} label="04 / Campus"    className="col-span-2" />
              </div>
            );
          })()}
        </Reveal>
      </section>

      {/* ── Gallery CTA ────────────────────────────────────────── */}
      <section className="py-12 bg-surface text-center border-t border-border-color">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-gold opacity-60" />
            <h2 className="text-3xl font-sans font-bold">{t("home.discover_title")}</h2>
            <span className="block w-8 h-px bg-gold opacity-60" />
          </div>
          <p className="text-lg text-secondary-text mb-6 font-serif italic">{t("home.discover_desc")}</p>
          <Button href="/gallery" size="default">{t("home.discover_btn")}</Button>
        </div>
      </section>

      <LatestUpdatesCollage news={news} events={events} achievements={achievements} />
      <AnnouncementPopup announcement={announcement} />
    </>
  );
}
