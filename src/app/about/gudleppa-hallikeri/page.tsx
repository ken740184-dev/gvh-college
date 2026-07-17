"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Award, Flag, Calendar, Compass, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GudleppaHallikeriPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

  return (
    <div className="pt-16 md:pt-20 bg-gray-50 min-h-screen text-primary-text font-sans overflow-hidden">
      {/* Hero Header */}
      <div className="relative h-[60vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 opacity-35">
          <Image 
            src="/images/about/gudleppa-hero.webp"
            alt="Gudleppa Hallikeri Hero Background"
            fill
            className="object-cover filter grayscale blur-[1px]"
            priority
          />
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6 rounded-full"
          >
            <Shield className="w-3.5 h-3.5" /> {t("gh.hero_badge")}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight mb-4"
          >
            {t("gh.title")}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[4px] bg-accent mb-6 rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 font-medium max-w-2xl font-serif italic"
          >
            {t("gh.hero_subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Intro Glassmorphic Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="bg-white/85 backdrop-blur-xl border border-white/50 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.intro_title")}
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              {t("gh.intro_p1")}
            </p>
            <p className="text-secondary-text text-base leading-relaxed">
              {t("gh.intro_p2")}
            </p>
          </div>
          <div className="w-full md:w-80 h-96 relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/about/gudleppa_v_hallikeri_main_photo.jpg"
                alt="Gudleppa Hallikeri Portrait"
                fill
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">

        {/* Section 1: Early Life — text left, photo right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Calendar className="w-4 h-4" /> {t("gh.early_life_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.early_life_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.early_life_p1")}</p>
              <p>{t("gh.early_life_p2")}</p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/roots_hosaritti.jpg"
                alt="Gudleppa Hallikeri Birthplace - Hosaritti Village"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 2: Freedom Struggle — photo left, text right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/freedom-struggle.webp"
                alt="Gudleppa Hallikeri Freedom Struggle"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          <div className="lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Flag className="w-4 h-4" /> {t("gh.freedom_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.freedom_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.freedom_p1")}</p>
              <p>{t("gh.freedom_p2")}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Sacrifice & Courage — text left, photo right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Shield className="w-4 h-4" /> {t("gh.sacrifice_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.sacrifice_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.sacrifice_p1")}</p>
              <p>{t("gh.sacrifice_p2")}</p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/life_dedicated_to_freedom.jpg"
                alt="Gudleppa Hallikeri - Sacrifice & Courage"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 4: Marriage & Family — photo left, text right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/marriage_and_family.jpg"
                alt="Gudleppa Hallikeri with Family"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          <div className="lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Award className="w-4 h-4" /> {t("gh.marriage_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.marriage_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.marriage_p1")}</p>
              <p>{t("gh.marriage_p2")}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Institutions — text left, photo right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <BookOpen className="w-4 h-4" /> {t("gh.institutions_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.institutions_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.institutions_p1")}</p>
              <p>{t("gh.institutions_p2")}</p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/campus-overview.jpg"
                alt="Gudleppa Hallikeri Arts and Commerce First Grade College"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 6: Gurukul Dream — photo left, text right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/images/about/heritage-gurukul.webp"
                alt="Historical Heritage Gurukul"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          <div className="lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Compass className="w-4 h-4" /> {t("gh.gurukul_tag")}
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              {t("gh.gurukul_title")}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>{t("gh.gurukul_p1")}</p>
              <p>{t("gh.gurukul_p2")}</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section — alternating photo left/right */}
        <div>
          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-800 tracking-tight text-center mb-16">
            {t("gh.timeline_title")}
          </h3>
          <div className="space-y-20">
            {[
              { year: "1906", title: "Born in Hosaritti", text: "Born on June 6, 1906 in Hosaritti, Haveri district, to farmer couple Veerappa and Veeramma — the youngest of five sons. Named after the revered 'Gudli Swamy Matha' of Hosaritti.", image: "/images/about/hosaritti-village.webp" },
              { year: "1919", title: "To Dharwad for Studies", text: "From age 4-5, displayed an innate mathematical talent, prompting his brother Sangappa to carry him to village markets to solve calculations. In 1919, he came to Dharwad at age 13, staying at Murughamatha hostel under Swamiji's care. He cleared matriculation in first class from RLS High School and later joined Karnataka College." },
              { year: "1920", title: "First Meeting with Gandhi", text: "First met Mahatma Gandhi in August 1920. Deeply moved by Gandhi's honest heart and truthful words, he touched his feet and pledged his loyalty. Gandhi became his Shiksha Guru from that day." },
              { year: "1924", title: "Belagavi Congress Session", text: "Participated as a volunteer at the Belagavi Congress session; deeply influenced by Gandhi. Gave up the opportunity for a Wrangler (Mathematics) degree from England and dedicated himself entirely to India's freedom struggle." },
              { year: "1927–1928", title: "Founding Taruna Sangha & Gandhi Ashram", text: "Left college studies to return to Hosaritti (1927), establishing the Bharatiya Taruna Sangha. Impressed by his English eloquence, the British District Collector of Dharwad offered him a reward; Gudleppa instead asked him to donate to his Gandhi institution. In 1928, he founded the Gandhi Ashram, organizing 5,000 satyagrahis.", image: "/images/about/hosaritti-village.webp" },
              { year: "1930", title: "Dandi March & Salt Satyagraha", text: "Chosen by Mahatma Gandhi as one of the 78 Satyagrahis for the Dandi March. He joined Gandhi at Jambusara near Ahmedabad on March 22, 1930. Jailed during the Salt Satyagraha, where he ground 70 pounds of jowar daily in prison.", image: "/images/about/freedom-struggle.webp" },
              { year: "1932", title: "Non-Cooperation Movement", text: "Imprisoned during the Civil Disobedience Movement. In prison, he urged all fellow prisoners to do cleaning work and undertook a 13-day fast to protest prison conditions.", image: "/images/about/freedom-struggle.webp" },
              { year: "1937", title: "Marriage on Gandhi Jayanti", text: "Married Gangadevi of Itagi, Belagavi on October 2, 1937 — Gandhi's birthday — with three conditions: wear khadi for life, serve Harijans and live among them, be prepared for all hardships." },
              { year: "1942", title: "Quit India Movement", text: "Arrested in the Quit India (Chale Jao) Movement and served two years rigorous imprisonment. In February 1943, he undertook a 21-day fast in Hindlagi Prison near Belagavi in solidarity with Mahatma Gandhi's fast.", image: "/images/about/freedom-struggle.webp" },
              { year: "1946–1960", title: "DCC President for 14 Years", text: "Elected President of Dharwad District Congress Committee in 1946 and served continuously for 14 unbroken years until 1960 — an unparalleled achievement." },
              { year: "1952", title: "1952 Elections & Assembly Protest", text: "Won the first general election from Haveri against a wealthy opponent. In his first speech in the Bombay Assembly, he boldly protested Chief Minister Morarji Desai's 'backdoor entry' (since Desai had lost his election in Surat). Shaking both Morarji Desai and PM Nehru, this principled stance led to the high command denying him assembly tickets eight times during his career, though he remained an unwavering leader of the people. He also served as a front-rank leader of the Karnataka Ekikarana Movement." },
              { year: "1954 & 1960", title: "International Delegations", text: "Visited China for 60 days in September 1954 as member of the Indian national delegation (Hindi-Chini Bhai Bhai). In April 1960, visited Germany, England, France and Egypt as part of a Parliamentary delegation." },
              { year: "1960–1966", title: "Mysore Legislative Council", text: "Elected to Mysore State Legislative Council in 1960. Served as Chairman of Karnataka Legislative Council from 1962 to 1966 — one of the highest legislative honours in Karnataka." },
              { year: "1963", title: "Building Institutions", text: "Collected 6 lakh rupees in just 3 months and gave them to K.L.E. Society, establishing today's K.L.E. Gudleppa Hallikeri College, Haveri. Also played key roles in College of Business Management (inaugurated by President Radhakrishnan), Nijalingappa College, Bengaluru, and Karnataka Medical College, Hubballi.", image: "/images/about/campus-overview.jpg" },
              { year: "1971", title: "Eternal Rest — May 15, 1971", text: "Elected Chairman of Karnataka Legislative Council for a second term in 1971. This great son of Bharatmata, who dedicated his entire life to the service of the nation, attained eternal rest on May 15, 1971. His memory lives on in the institutions he built.", image: "/images/about/IMG-20260708-WA0167.jpg" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                {/* Photo — alternates left/right */}
                <div className={`${i % 2 === 0 ? "lg:order-1" : "lg:order-2"} w-full h-[200px] md:h-[220px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image || "/images/about/gudleppa-biography.jpg"}
                      alt={`Shri Gudleppa Hallikeri — ${item.year}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
                {/* Text */}
                <div className={`${i % 2 === 0 ? "lg:order-2" : "lg:order-1"} space-y-4`}>
                  <span className="inline-block bg-accent/10 text-accent text-sm font-bold px-3 py-1 rounded-full tracking-wider">
                    {item.year}
                  </span>
                  <h4 className="text-2xl font-sans font-extrabold text-slate-800 tracking-tight">
                    {item.title}
                  </h4>
                  <div className="w-16 h-1 bg-accent rounded-full"></div>
                  <p className="text-secondary-text leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white/40 backdrop-blur-md border border-white/50 p-8 md:p-12 shadow-md rounded-xl"
        >
          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-800 tracking-tight text-center mb-10">
            {t("gh.facts_title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact1_title")}</h4>
              <p className="text-sm text-secondary-text">{t("gh.fact1_desc")}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact2_title")}</h4>
              <p className="text-sm text-secondary-text">{t("gh.fact2_desc")}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{t("gh.fact3_title")}</h4>
              <p className="text-sm text-secondary-text">{t("gh.fact3_desc")}</p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Quote Banner */}
      <div className="bg-navbar text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <p className="text-2xl md:text-3xl font-serif italic text-blue-200 leading-relaxed">
            {t("gh.quote")}
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-lg tracking-widest uppercase text-gray-300">
            {t("gh.philosophy")}
          </h4>
        </div>
      </div>
    </div>
  );
}
