"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Award, Flag, Calendar, Compass, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GudleppaHallikeriPage() {
  const { t, language } = useLanguage();
  const isKn = language === "kn";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGurukulSlide, setCurrentGurukulSlide] = useState(0);

  const sliderImages = [
    "/images/about/building_pillers_of_education_1.jpg",
    "/images/about/building_pillers_of_education_2.jpg"
  ];

  const gurukulImages = [
    "/images/about/gandhi_grameena_gurukul.jpg",
    "/images/about/gandhi_grameena_gurukul_2.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGurukulSlide((prev) => (prev + 1) % gurukulImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
                src="/images/about/dandi_march_and_salt_satygraha.jpg"
                alt="Dandi March and Salt Satyagraha"
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
              <p dangerouslySetInnerHTML={{ __html: t("gh.marriage_p1") }} />
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
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2 group">
            <div className="relative w-full h-full">
              {sliderImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Building Pillars of Education ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                />
              ))}
              
              {/* Slider indicators / dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-accent w-6" : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
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
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2 group">
            <div className="relative w-full h-full">
              {gurukulImages.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Gandhi Grameena Gurukul ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === currentGurukulSlide ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                />
              ))}
              
              {/* Slider indicators / dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {gurukulImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGurukulSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentGurukulSlide ? "bg-accent w-6" : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
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
          <div className="relative border-l-2 border-accent/20 ml-4 md:ml-8 space-y-12">
            {[
              {
                year: "1906",
                titleEn: "Born in Hosaritti",
                titleKn: "ಜನನ",
                textEn: "Born in Hosaritti on June 6, 1906, as the youngest son of Veerappa and Veeramma.",
                textKn: "ತಂದೆ ವೀರಪ್ಪ ತಾಯಿ ವೀರಮ್ಮ ಇವರ ಕೊನೆಯ ಸುಪುತ್ರನಾಗಿ 06/ 06/ 1906 ರಲ್ಲಿ ಹೊಸರಿತ್ತಿಯಲ್ಲಿ ಜನನ."
              },
              {
                year: "1919",
                titleEn: "To Dharwad for Studies",
                titleKn: "ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕಾಗಿ ಧಾರವಾಡಕ್ಕೆ",
                textEn: "Admitted to the free hostel of Murughamatha in Dharwad under Sri Guru Mrityunjaya Appagalu for higher education. Studied first at Dharwad Karnataka High School, then at RLS High School. Recognized as a brilliant student due to his extraordinary memory and calculation speed in mathematics.",
                textKn: "ಹೆಚ್ಚಿನ ವಿಧ್ಯಾಭ್ಯಾಸಕ್ಕಾಗಿ ಧಾರವಾಡದ ಶ್ರೀಗುರು ಮೃತ್ಯುಂಜಯ ಅಪ್ಪಗಳವರ ಮುರುಘಾಮಠದ ವಿದ್ಯಾರ್ಥಿನಿಲಯದಲ್ಲಿ ಸೇರ್ಪಡೆ, ಮೊದಲು ಧಾರವಾಡದ ಕರ್ನಾಟಕ ಹೈಸ್ಕೂಲ್, ಅನಂತರ ಆರ್ ಎಲ್ ಎಸ್ ಹೈಸ್ಕೂಲಿನಲ್ಲಿ ವಿದ್ಯಾಭ್ಯಾಸ, ಗಣಿತ ವಿಷಯದಲ್ಲಿ ಅವರಿಗಿದ್ದ ಅದ್ಭುತ ಸ್ಮರಣ ಮತ್ತು ವೇದಾಶಕ್ತಿಯಿಂದಾಗಿ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿ."
              },
              {
                year: "1924",
                titleEn: "Belagavi Congress Session",
                titleKn: "ಬೆಳಗಾವಿ ಕಾಂಗ್ರೆಸ್ ಅಧಿವೇಶನ",
                textEn: "Participated as a volunteer in the Belagavi Congress Session; deeply influenced by Mahatma Gandhi's personality. Relinquished the opportunity to pursue a Wrangler (Mathematics) degree in England, chose to plunge into the Indian freedom struggle, and emerged as a devout Gandhian congressman.",
                textKn: "ಬೆಳಗಾವಿ ಕಾಂಗ್ರೆಸ್ ಅಧಿವೇಶನದಲ್ಲಿ ಸ್ವಯಂ ಸೇವಕರಾಗಿ ಭಾಗವಹಿಸಿದ್ದರು, ಗಾಂಧೀಜಿಯವರನ್ನು ಕಂಡು ಅವರ ವ್ಯಕ್ತಿತ್ವಕ್ಕೆ ಪ್ರಭಾವಿತರಾದರು. ಗಣಿತಶಾಸ್ತ್ರದಲ್ಲಿ ಇಂಗ್ಲೆಂಡಿನಲ್ಲಿ ರಾಂಗ್ಲರ್ ಪದವಿ ಪಡೆಯುವ ಅವಕಾಶವಿದ್ದರೂ ಕಡೆಗಣಿಸಿ ಭಾರತ ಸ್ವಾತಂತ್ರ್ಯ ಆಂದೋಲನದಲ್ಲಿ ಧುಮುಕಿದರು. ಅಪ್ಪಟ ಗಾಂಧಿ ವಾದಿಯಾಗಿ ಕಾಂಗ್ರೆಸ್ಸಿಗರಾಗಿ ರೂಪಗೊಂಡರು."
              },
              {
                year: "1929–1942",
                titleEn: "Founding Taruna Sangha & Gandhi Ashram",
                titleKn: "ಭಾರತೀಯ ತರುಣ ಸಂಘ ಮತ್ತು ಗಾಂಧಿ ಆಶ್ರಮ",
                textEn: "Founded the Bharatiya Taruna Sangha in Hosaritti, and established the Gandhi Ashram High School in Hosaritti on the model of the Sabarmati Ashram. Engaged in national constructive activities, participated in the Dandi March, Salt Satyagraha, and Quit India Movement, and was chosen by Gandhiji as a committed follower who undertook fasts and faced imprisonments.",
                textKn: "ಹೊಸರಿತ್ತಿಯಲ್ಲಿ ಭಾರತೀಯ ತರುಣ ಸಂಘಸ್ಥ ಸ್ಥಾಪನೆ, ಸಬರಮತಿ ಆಶ್ರಮದ ಮಾದರಿಯಲ್ಲಿ ಹೊಸರಿತ್ತಿ ಯಲ್ಲಿ ಗಾಂಧಿ ಆಶ್ರಮ ಪ್ರೌಢಶಾಲೆ ಸ್ಥಾಪನೆ ರಾಷ್ಟ್ರೀಯ ವಿದಾಯಕ ಕಾರ್ಯಗಳಲ್ಲಿ ನಿರತ ದಂಡಿಯಾತ್ರೆ ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ ಹಾಗೂ ಚಲೇಜ ಚಳುವಳಿಯಲ್ಲಿ ಭಾಗವಹಿಸಿ ಗಾಂಧಿಜಿಯವರಿಂದ ಆಯ್ಕೆ. ಸತ್ಯಾಗ್ರಹ ನಿಷ್ಠ ಅನುಯಾಯಿ, ಉಪವಾಸ, ಜೈಲುವಾಸ."
              },
              {
                year: "1930",
                titleEn: "Salt Satyagraha",
                titleKn: "ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ",
                textEn: "Imprisoned twice during the Salt Satyagraha, where he ground 70 pounds of jowar daily in prison.",
                textKn: "ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹದಲ್ಲಿ ಎರಡು ಸಲ ಜೈಲುವಾಸ ಪ್ರತಿದಿನ 70 ಪೌಂಡ್ ಜೋಳ ಬೀಸುವುದು."
              },
              {
                year: "1932",
                titleEn: "Non-Cooperation Movement",
                titleKn: "ಅಸಹಕಾರ ಆಂದೋಲನ",
                textEn: "Imprisoned for two years during the Non-Cooperation Movement. Fasted for 13 days in jail demanding that all prisoners undertake cleaning/scavenging tasks.",
                textKn: "ಅಸಹಕಾರ ಆಂದೋಲನದಲ್ಲಿ ಎರಡು ವರ್ಷ ಜೈಲುವಾಸ ಜೈಲಿನಲ್ಲಿ ಎಲ್ಲರೂ ಭಂಗಿ ಕಾರ್ಯಕ್ರಮ ಮಾಡಲು ಆಗ್ರಹಿಸಿ 13 ದಿನ ಉಪವಾಸ"
              },
              {
                year: "1937",
                titleEn: "Marriage on Gandhi Jayanti",
                titleKn: "ಮದುವೆ",
                textEn: "Married Gangadevi, daughter of freedom fighter Sri Basavannappa Sanikoppa of Itagi, on October 2 (Gandhi Jayanti) under the national flag in the Harijan colony, wearing khadi clothes and exchanging khadi garlands.",
                textKn: "ಅಕ್ಟೋಬರ್ 2 ಗಾಂಧಿ ಜಯಂತಿಯ ಹರಿಜನ ಕೇರಿಯಲ್ಲಿ ರಾಷ್ಟ್ರೋಧ್ವಜದಡಿ, ಖಾದಿ ವಸ್ತ್ರಧಾರಣಿ ಹಾಗೂ ಖಾದಿ ಮಾಲೆ ವಿನಿಮಯ ಮಾಡುವುದರೊಂದಿಗೆ ಇಟಗಿಯ ಸ್ವಾತಂತ್ರ್ಯದ ಶ್ರೀ ಬಸವಣ್ಣಪ್ಪ ಸಾನಿಕೊಪ್ಪ ಇವರ ಮಗಳಾದ ಗಂಗಾದೇವಿಯವರೊಡನೆ ವಿವಾಹ."
              },
              {
                year: "1942",
                titleEn: "Quit India Movement",
                titleKn: "ಭಾರತ ಬಿಟ್ಟು ತೊಲಗಿ ಆಂದೋಲನ",
                textEn: "Imprisoned for three years during the Quit India Movement. Undertook a 21-day fast in solidarity with Mahatma Gandhi's fast.",
                textKn: "ಭಾರತ ಬಿಟ್ಟು ತೊಲಗಿ ಆಂದೋಲನದಲ್ಲಿ ಮೂರು ವರ್ಷ ಜೈಲುವಾಸ ಆ ಗಾಂಧೀಜಿ ಮಾಡಿದಂತೆ 21 ದಿನ ಉಪವಾಸ."
              },
              {
                year: "1946–1960",
                titleEn: "DCC President for 14 Years",
                titleKn: "ಡಿ.ಸಿ.ಸಿ. ಅಧ್ಯಕ್ಷರು",
                textEn: "Served continuously as the President of Dharwad District Congress Committee (DCC) for one and a half decades.",
                textKn: "ಅಖಂಡ ಒಂದುವರೆ ದಶಕ ಧಾರವಾಡ ಜಿಲ್ಲಾ ಕಾಂಗ್ರೆಸ್ ಸಮಿತಿ ಅಧ್ಯಕ್ಷರು."
              },
              {
                year: "1952",
                titleEn: "Bombay Assembly & Ekikarana Leader",
                titleKn: "ಮುಂಬೈ ವಿಧಾನ ಸಭೆಗೆ ಆಯ್ಕೆ",
                textEn: "Elected from Haveri constituency to the Bombay State Legislative Assembly. Served as the organizer and front-rank leader of the All-Karnataka Ekikarana (unification) Movement.",
                textKn: "ಹಾವೇರಿ ತಾಲೂಕಿನಿಂದ ಮುಂಬೈ ರಾಜ್ಯ ವಿಧಾನಸಭೆಗೆ ಆಯ್ಕೆಯಾಗಿ ಅಖಿಲ ಕರ್ನಾಟಕ ಏಕೀಕರಣ ಚಳುವಳಿಯ ಸಂಘಟಕ ಮತ್ತು ಮುಂಚೂಣಿ ನಾಯಕ."
              },
              {
                year: "1954",
                titleEn: "Visit to China",
                titleKn: "ಚೀನಾ ಪ್ರವಾಸ",
                textEn: "Visited China as a representative of the national delegation.",
                textKn: "ಚೀನಾ ದೇಶಕ್ಕೆ ರಾಷ್ಟ್ರೀಯ ನಿಯೋಗದ ಪ್ರತಿನಿಧಿಯಾಗಿ ಭೇಟಿ."
              },
              {
                year: "1950–1955",
                titleEn: "KPCC General Secretary",
                titleKn: "ಕೆ.ಪಿ.ಸಿ.ಸಿ. ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
                textEn: "Served as General Secretary of Karnataka Pradesh Congress Committee (KPCC).",
                textKn: "1950 –55: ಕರ್ನಾಟಕ ಪ್ರದೇಶ ಕಾಂಗ್ರೆಸ್ಸಿನ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ."
              },
              {
                year: "1956–1960",
                titleEn: "Khadi Board Chairman",
                titleKn: "ಖಾದಿ ಗ್ರಾಮೋದ್ಯೋಗ ಮಂಡಳಿ ಅಧ್ಯಕ್ಷರು",
                textEn: "Served as Chairman of the Karnataka State Khadi and Village Industries Board.",
                textKn: "1956 –1960: ಕರ್ನಾಟಕ ರಾಜ್ಯ ಖಾದಿ ಗ್ರಾಮೋದ್ಯೋಗ ಮಂಡಳಿಯ ಅಧ್ಯಕ್ಷರು."
              },
              {
                year: "1960",
                titleEn: "Mysore Legislative Council",
                titleKn: "ವಿಧಾನ ಪರಿಷತ್ತಿಗೆ ಆಯ್ಕೆ",
                textEn: "Elected to the Mysore State Legislative Council. Visited England, Germany, and Egypt as a representative of the national parliamentary delegation.",
                textKn: "ಮೈಸೂರು ರಾಜ್ಯ ವಿಧಾನ ಪರಿಷತ್ತಿಗೆ ಆಯ್ಕೆ ಇಂಗ್ಲೆಂಡ್, ಜರ್ಮನಿ, ಈಜಿಪ್ಟ್ ದೇಶಗಳಿಗೆ ರಾಷ್ಟ್ರೀಯ ನಿಯೋಗದ ಪ್ರತಿನಿಧಿಯಾಗಿ ಭೇಟಿ."
              },
              {
                year: "1962–1966",
                titleEn: "Chairman of Legislative Council",
                titleKn: "ವಿಧಾನ ಪರಿಷತ್ತಿನ ಸಭಾಪತಿ",
                textEn: "Served as Chairman of the Karnataka Legislative Council.",
                textKn: "ಕರ್ನಾಟಕ ವಿಧಾನ ಪರಿಷತ್ತಿನ ಸಭಾಪತಿ."
              },
              {
                year: "1966",
                titleEn: "Shashtyabdhi Ceremony",
                titleKn: "ಷಷ್ಠ್ಯಬ್ದಿ ಸಮಾರಂಭ",
                textEn: "Celebrated his 60th birthday (Shashtyabdhi ceremony) and was presented with the Ratnashikha volume.",
                textKn: "ರತ್ನಶಿಖಾ ಅರ್ಪಿಸಿ ಷಷ್ಠ್ಯಬ್ದಿ ಸಮಾರಂಭ."
              },
              {
                year: "1967",
                titleEn: "Hindi Prachar Sabha President",
                titleKn: "ಹಿಂದಿ ಪ್ರಚಾರ ಸಭೆಯ ಅಧ್ಯಕ್ಷರು",
                textEn: "Served as President of the Karnataka branch of Dakshin Bharat Hindi Prachar Sabha, member of South Central Railway board, and leader of State Road Transport labor unions.",
                textKn: "ದಕ್ಷಿಣ ಭಾರತ ಹಿಂದಿ ಪ್ರಚಾರ ಸಭೆಯ ಕರ್ನಾಟಕ ಪ್ರಾಂತ್ಯ ಅಧ್ಯಕ್ಷರು ದಕ್ಷಿಣ ಮಧ್ಯ ರೈಲ್ವೆ. ಅಧ್ಯಕ್ಷರು, ರಾಜ್ಯ ರಸ್ತೆ ಸಾರಿಗೆ ಕಾರ್ಮಿಕ ಸಂಘಗಳು."
              },
              {
                year: "1971",
                titleEn: "Second Term as Chairman",
                titleKn: "ಸಭಾಪತಿಯಾಗಿ ಎರಡನೆಯ ಅವಧಿ",
                textEn: "Elected Chairman of the Legislative Council for a second term.",
                textKn: "ಎರಡನೆಯ ಅವಧಿಗೆ ವಿಧಾನ ಪರಿಷತ್ತಿನ ಸಭಾಪತಿ."
              },
              {
                year: "1971",
                titleEn: "Eternal Sleep",
                titleKn: "ಚಿರನಿದ್ರಾಲೀನ",
                textEn: "Passed away on May 15, 1971 (attained eternal sleep).",
                textKn: "ಮೇ 15 ಚಿರನಿದ್ರಾಲೀನ."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm transition-transform duration-300 hover:scale-125" />
                
                {/* Content */}
                <div className="space-y-3 bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <span className="inline-block bg-accent/10 text-accent text-sm font-bold px-3 py-1 rounded-full tracking-wider">
                    {item.year}
                  </span>
                  <h4 className="text-2xl font-sans font-extrabold text-slate-800 tracking-tight">
                    {isKn ? item.titleKn : item.titleEn}
                  </h4>
                  <div className="w-16 h-1 bg-accent rounded-full"></div>
                  <p className="text-secondary-text leading-relaxed">{isKn ? item.textKn : item.textEn}</p>
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
