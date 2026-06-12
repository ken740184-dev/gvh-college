"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const originalNavigationKeys = [
  { key: "nav.home", href: "/" },
  { 
    key: "nav.about", 
    href: "/about",
    dropdown: [
      { key: "nav.overview", href: "/about" },
      { key: "nav.nes", href: "/about/national-education-society" },
      { key: "nav.gh", href: "/about/gudleppa-hallikeri" },
      { key: "nav.principal", href: "/principal" }
    ]
  },
  {
    key: "nav.academics",
    href: "#",
    dropdown: [
      { key: "nav.bcom", href: "/departments/bcom" },
      { key: "nav.ba", href: "/departments/ba" },
    ],
  },
  { 
    key: "nav.admissions", 
    href: "/admissions",
    dropdown: [
      { key: "nav.overview", href: "/admissions" },
      { key: "nav.apply", href: "/admissions/apply" }
    ]
  },
  { key: "nav.faculty", href: "/faculty" },
  { key: "nav.campus_life", href: "/campus-life" },
  { key: "nav.achievements", href: "/achievements" },
  { key: "nav.events", href: "/events" },
  { key: "nav.news", href: "/news" },
  { key: "nav.gallery", href: "/gallery" },
  { key: "nav.contact", href: "/contact" },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const originalNavigation = originalNavigationKeys.map((item) => ({
    name: t(item.key),
    href: item.href,
    dropdown: item.dropdown
      ? item.dropdown.map((subItem) => ({
          name: t(subItem.key),
          href: subItem.href,
        }))
      : undefined,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  
  // Start by rendering all items, but keep them invisible until first measurement
  const [visibleCount, setVisibleCount] = useState(originalNavigationKeys.length);
  const [isMeasured, setIsMeasured] = useState(false);
  
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Refs for measurement
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const langSwitcherMeasureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const measureNav = () => {
      if (!outerContainerRef.current || !logoRef.current || !moreRef.current) return;
      
      const totalAvailable = outerContainerRef.current.offsetWidth;
      const logoW = logoRef.current.offsetWidth;
      const moreW = moreRef.current.offsetWidth + 32; // plus space-x-8
      const langSwitcherW = langSwitcherMeasureRef.current ? langSwitcherMeasureRef.current.offsetWidth : 95;
      
      // Calculate max width for navigation items
      const availableForNav = totalAvailable - logoW - langSwitcherW - 64;

      let currentW = 0;
      let count = 0;
      
      for (let i = 0; i < originalNavigation.length; i++) {
        const itemEl = itemRefs.current[i];
        if (!itemEl) continue;
        
        const itemW = itemEl.offsetWidth + (i > 0 ? 32 : 0); // Add gap for items after the first
        
        // If this is the absolute last item, it doesn't need the 'More' button to fit
        if (i === originalNavigation.length - 1) {
          if (currentW + itemW <= availableForNav) {
            count++;
          }
          break;
        }
        
        // For non-last items, we must ensure there's enough room for THIS item AND the 'More' button
        if (currentW + itemW + moreW <= availableForNav) {
          currentW += itemW;
          count++;
        } else {
          // No room for this item + "More" button, so this item goes into "More"
          break;
        }
      }
      
      setVisibleCount(count);
      setIsMeasured(true);
    };

    measureNav();
    
    // Add resize listener
    window.addEventListener("resize", measureNav);
    return () => window.removeEventListener("resize", measureNav);
  }, [language]);

  const navBackground =
    isHomePage && !scrolled && !isOpen
      ? "bg-transparent text-white"
      : "bg-navbar text-white shadow-md";

  const visibleItems = originalNavigation.slice(0, visibleCount);
  const hiddenItems = originalNavigation.slice(visibleCount);

  const desktopNavigation = [...visibleItems];
  if (hiddenItems.length > 0) {
    desktopNavigation.push({
      name: t("nav.more"),
      href: "#",
      dropdown: hiddenItems as any,
    });
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}
    >
      {/* HIDDEN MEASURING CONTAINER */}
      <div 
        className="absolute top-0 left-0 w-full h-0 overflow-hidden invisible opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full px-4 sm:px-8 lg:px-12" ref={outerContainerRef}>
          <div className="flex justify-between items-center h-20 gap-8">
            <div className="flex-shrink-0 flex items-center gap-3" ref={logoRef}>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] bg-white/10">
                <Image
                  src="/images/layout/logo.jpg"
                  alt="GH College Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-wider">{t("nav.college_name")}</span>
            </div>
            <div className="flex items-center space-x-8">
               {originalNavigation.map((item, idx) => (
                 <div key={item.name} ref={el => { itemRefs.current[idx] = el; }} className="py-2 text-sm font-medium whitespace-nowrap">
                   {item.name}
                   {item.dropdown && <ChevronDown className="inline w-4 h-4 ml-1" />}
                 </div>
               ))}
               <div ref={moreRef} className="flex items-center gap-1 py-2 text-sm font-medium whitespace-nowrap">
                 {t("nav.more")} <ChevronDown className="w-4 h-4" />
               </div>
               
               {/* Hidden measuring lang switcher */}
               <div ref={langSwitcherMeasureRef} className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                 <Globe className="w-3.5 h-3.5" />
                 <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full px-4 sm:px-8 lg:px-12 transition-opacity duration-300 ${isMeasured ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center h-20 gap-8">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] bg-white/10">
                <Image
                  src="/images/layout/logo.jpg"
                  alt="GH College Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-wider">
                {t("nav.college_name")}
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {desktopNavigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button className="flex items-center gap-1 hover:text-accent transition-colors duration-200 py-2 text-sm font-medium">
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors duration-200 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                    <div className="bg-white text-primary-text shadow-lg ring-1 ring-black ring-opacity-5 rounded-md py-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-accent"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "kn" : "en")}
              className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-accent hover:bg-accent/15 transition-all duration-300 flex items-center gap-1.5 text-white/90 hover:text-white font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navbar overflow-y-auto w-full absolute left-0 top-20"
          >
            <div className="px-2 pt-2 pb-8 space-y-1 sm:px-3 border-t border-gray-800 min-h-full">
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2 border-b border-gray-800/60 mb-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Language / ಭಾಷೆ</span>
                <button
                  onClick={() => setLanguage(language === "en" ? "kn" : "en")}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-accent bg-white/5 flex items-center gap-1.5 text-white font-medium"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
                </button>
              </div>

              {originalNavigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name)}
                        className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
                      >
                        {item.name}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === item.name ? "rotate-180" : ""}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {openMobileDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1 mt-1 border-l border-gray-700 ml-4 mb-2">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-accent hover:bg-gray-900"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-accent hover:bg-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
