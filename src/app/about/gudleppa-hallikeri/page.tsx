"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Award, Flag, Calendar, Compass, Shield } from "lucide-react";

export default function GudleppaHallikeriPage() {
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
    <div className="pt-20 bg-gray-50 min-h-screen text-primary-text font-sans overflow-hidden">
      {/* Hero Header */}
      <div className="relative h-[60vh] bg-navbar overflow-hidden flex items-center justify-center">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 opacity-35">
          <Image 
            src="/images/gudleppa_hallikeri_hero.png"
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
            <Shield className="w-3.5 h-3.5" /> Freedom Fighter & Social Reformer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight mb-4"
          >
            Gudleppa Hallikeri
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
            "The Iron Man of Karnataka" (1906 – 1972)
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
              A Life Dedicated to Truth and Freedom
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              Gudleppa Hallikeri was a pioneering force in the Indian Independence Movement, a steadfast social reformer, and a visionary educationist whose legacy remains woven into the fabric of Karnataka. Deeply inspired by Mahatma Gandhi's call for Satya (Truth) and Ahimsa (Non-violence), he organized struggles, unified language borders, and built academic sanctuaries to uplift the rural poor.
            </p>
            <p className="text-secondary-text text-base leading-relaxed">
              Known for his unwavering determination and fearlessness, he earned the respected title of the **"Iron Man of Karnataka"**. Today, our institution proudly bears his name, dedicated to passing down his values of ethical leadership, excellence, and social responsibility.
            </p>
          </div>
          <div className="w-full md:w-80 h-96 relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/gudleppa-hallikeri.jpg"
                alt="Gudleppa Hallikeri Portrait"
                fill
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Sections with Lazy Load animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">

        {/* Section 1: Early Life */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Calendar className="w-4 h-4" /> 1906 – Early Awakening
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              Roots in Hosaritti
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                Gudleppa Hallikeri was born on June 6, 1906, in the rural village of Hosaritti, situated in the Haveri district of Karnataka. Growing up in a rural agricultural environment, he witnessed firsthand the struggles of the local communities under British colonial rule, characterized by extreme taxation, illiteracy, and deep social divisions.
              </p>
              <p>
                His formal education was coupled with an intense self-study of philosophical, historical, and nationalistic texts. As a young man, he committed himself to the cause of societal rejuvenation, starting first by promoting sanitation, local cottage industries, and advocating against untouchability in Hosaritti and nearby villages.
              </p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/hosaritti_village_1906.png"
                alt="Historic village in Karnataka representation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 2: The Freedom Struggle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <Flag className="w-4 h-4" /> Independence Movement
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              Champion of Satyagraha
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                Gudleppa Hallikeri answered Mahatma Gandhi's call during the Non-Cooperation and Civil Disobedience campaigns. He was one of the central organizers of the Salt Satyagraha in North Karnataka, demonstrating outstanding bravery in leading protest marches against British monopolies.
              </p>
              <p>
                He worked closely with prominent state leaders and freedom fighters, including Mailara Mahadevappa, setting up secret communications, printing nationalist literature, and organizing massive rural demonstrations. During the Quit India Movement of 1942, Hallikeri was arrested multiple times and imprisoned for his revolutionary work, refusing to break under interrogation, which established his reputation as the "Iron Man."
              </p>
            </div>
          </div>
          <div className="lg:order-1 w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/indian_freedom_struggle_satyagraha.png"
                alt="Protesters marching for Indian independence movement"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Section 3: Educational Contribution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wider uppercase">
              <BookOpen className="w-4 h-4" /> Educational Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-800 tracking-tight">
              Empowering Rural Youth
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
            <div className="space-y-4 text-secondary-text leading-relaxed">
              <p>
                Post-independence, Gudleppa Hallikeri recognized that true freedom is impossible without education and economic self-sufficiency. He believed that rural communities deserved the same academic opportunities as metropolitan cities, but tailored with moral character and community responsibility.
              </p>
              <p>
                In Hosaritti, he founded the **Gandhi Grameena Gurukul**, a unique residential boarding school based on Gandhian community-living principles. Additionally, in 1963, his tireless advocacy and collaboration with the K.L.E. Society led to the establishment of **Gudleppa Hallikeri College** to provide high-quality undergraduate courses in Commerce and Arts to Haveri District, illuminating the path for generations of young professionals.
              </p>
            </div>
          </div>
          <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-white shadow-lg border border-gray-200 p-2">
            <div className="relative w-full h-full">
              <Image 
                src="/images/gandhi_grameena_gurukul_heritage.png"
                alt="Gandhi Grameena Gurukul Campus traditional architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Facts Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white/40 backdrop-blur-md border border-white/50 p-8 md:p-12 shadow-md rounded-xl"
        >
          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-800 tracking-tight text-center mb-10">
            Quick Facts & Legacy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Karnataka Unification</h4>
              <p className="text-sm text-secondary-text">
                He was an active and key proponent in the Karnataka Ekikarana Movement, successfully unifying Kannada-speaking regions into a single home state.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Legislative Leadership</h4>
              <p className="text-sm text-secondary-text">
                Served as an esteemed member of the Mysore Legislative Council (1962–1972) and held the position of Legislative Council Chairman from 1970 to 1971.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">The Hallikeri Award</h4>
              <p className="text-sm text-secondary-text">
                His memory is honored annually through the Gudleppa Hallikeri Award, recognizing outstanding contributions in social reform, education, and Kannada literature.
              </p>
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
            "Education is not merely for obtaining degrees, but for forging character, instilling national pride, and serving the poorest of our rural communities."
          </p>
          <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          <h4 className="font-sans font-bold text-lg tracking-widest uppercase text-gray-300">
            Gudleppa Hallikeri's Philosophy
          </h4>
        </div>
      </div>
    </div>
  );
}
