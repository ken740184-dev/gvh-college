"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const originalNavigation = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    dropdown: [
      { name: "Overview", href: "/about" },
      { name: "Gudleppa Hallikeri", href: "/about/gudleppa-hallikeri" },
      { name: "Principal's Message", href: "/principal" }
    ]
  },
  {
    name: "Academics",
    href: "#",
    dropdown: [
      { name: "Bachelor of Commerce", href: "/departments/bcom" },
      { name: "Bachelor of Arts", href: "/departments/ba" },
    ],
  },
  { 
    name: "Admissions", 
    href: "/admissions",
    dropdown: [
      { name: "Overview", href: "/admissions" },
      { name: "Apply Online", href: "/admissions/apply" }
    ]
  },
  { name: "Faculty", href: "/faculty" },
  { name: "Campus Life", href: "/campus-life" },
  { name: "Achievements", href: "/achievements" },
  { name: "News", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  
  // Start by rendering all items, but keep them invisible until first measurement
  const [visibleCount, setVisibleCount] = useState(originalNavigation.length);
  const [isMeasured, setIsMeasured] = useState(false);
  
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Refs for measurement
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      
      // Calculate max width for navigation items
      const availableForNav = totalAvailable - logoW - 32; // subtract logo and the gap between logo and nav

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
  }, []);

  const navBackground =
    isHomePage && !scrolled && !isOpen
      ? "bg-transparent text-white"
      : "bg-navbar text-white shadow-md";

  const visibleItems = originalNavigation.slice(0, visibleCount);
  const hiddenItems = originalNavigation.slice(visibleCount);

  const desktopNavigation = [...visibleItems];
  if (hiddenItems.length > 0) {
    desktopNavigation.push({
      name: "More",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" ref={outerContainerRef}>
          <div className="flex justify-between items-center h-20 gap-8">
            <div className="flex-shrink-0 flex items-center gap-3" ref={logoRef}>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] bg-white/10">
                <Image
                  src="/images/logo.jpg"
                  alt="GH College Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-wider">GH COLLEGE</span>
            </div>
            <div className="flex items-center space-x-8">
               {originalNavigation.map((item, idx) => (
                 <div key={item.name} ref={el => { itemRefs.current[idx] = el; }} className="py-2 text-sm font-medium whitespace-nowrap">
                   {item.name}
                   {item.dropdown && <ChevronDown className="inline w-4 h-4 ml-1" />}
                 </div>
               ))}
               <div ref={moreRef} className="flex items-center gap-1 py-2 text-sm font-medium whitespace-nowrap">
                 More <ChevronDown className="w-4 h-4" />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-300 ${isMeasured ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center h-20 gap-8">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] bg-white/10">
                <Image
                  src="/images/logo.jpg"
                  alt="GH College Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-wider">
                GH COLLEGE
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
