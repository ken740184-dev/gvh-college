"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Navigation, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-navbar text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-sans text-2xl font-bold mb-6">{t("nav.college_name")}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="flex space-x-4">
              <Link href="/social?network=facebook" className="text-gray-400 hover:text-accent transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Link>
              <Link href="/social?network=twitter" className="text-gray-400 hover:text-accent transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Link>
              <Link href="/social?network=instagram" className="text-gray-400 hover:text-accent transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </Link>
              <Link href="/social?network=linkedin" className="text-gray-400 hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wider uppercase">{t("footer.quick_links")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.admissions")}
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.faculty")}
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.campus_life")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-accent transition-colors">
                  {t("nav.gallery")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wider uppercase">{t("footer.contact_us")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {t("footer.address").split(", ").map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < t("footer.address").split(", ").length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.phone_label")}: +1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <span className="text-gray-400">{t("footer.email_label")}: info@gvhcollege.edu</span>
              </li>
            </ul>
          </div>

          {/* Map Link */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wider uppercase">{t("footer.location")}</h4>
            <div
              className="block relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-accent transition-all duration-300 shadow-inner group"
            >
              {/* Static Map Placeholder Image */}
              <Image
                src="/images/layout/map-footer.png"
                alt="GVH College Location Map"
                fill
                className="object-cover opacity-100 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 300px"
              />

              {/* Clickable Overlay with Two Separate Circular Buttons */}
              <div className="absolute inset-0 z-10 flex items-center justify-center gap-6 bg-black/0 group-hover:bg-black/60 transition-colors duration-300">
                {/* View Map Button */}
                <Link
                  href="/contact#map"
                  className="w-12 h-12 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                  title="View Interactive Map"
                >
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </Link>

                {/* View on Google Maps Button */}
                <a
                  href="https://www.google.com/maps/place/14.896620,75.554571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-[50ms]"
                  title="View on Google Maps"
                >
                  <MapPin className="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t("nav.college_name")}. {t("footer.rights")}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
