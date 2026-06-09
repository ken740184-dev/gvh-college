"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team for any inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="Get in Touch" />
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Campus Address</h4>
                  <p className="text-secondary-text">
                    Gudleppa Hallikeri Arts and Commerce First Grade College (Entrance)<br />
                    Hosaritti, Haveri District<br />
                    Karnataka, India - 581115
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone Numbers</h4>
                  <p className="text-secondary-text">
                    Admission Office: +1 (555) 123-4567<br />
                    Admin Office: +1 (555) 987-6543
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Addresses</h4>
                  <p className="text-secondary-text">
                    info@gvhcollege.edu<br />
                    admissions@gvhcollege.edu
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Office Hours</h4>
                  <p className="text-secondary-text">
                    Monday - Friday: 8:30 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-lg shadow-xl border border-border-color">
              <h3 className="text-2xl font-sans font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="John Doe"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+1 (555) 000-0000"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="john@example.com"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="How can we help you?"
                    suppressHydrationWarning
                  ></textarea>
                </div>
                <div suppressHydrationWarning>
                  <Button type="button" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div id="map" className="w-full h-[500px] bg-gray-200 relative group">
        <iframe 
          src="https://maps.google.com/maps?q=14.896620,75.554571&hl=en&z=17&output=embed" 
          className="w-full h-full border-0" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
        
        {/* Info Card (Top-Left) */}
        <div className="absolute top-4 left-4 z-10 w-[260px] sm:w-[360px] bg-white/90 backdrop-blur-md p-3.5 rounded-md shadow-lg border border-gray-200/85 pointer-events-auto">
          <div className="flex gap-3 text-gray-800">
            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-xs sm:text-sm text-gray-900 leading-tight break-words">
                Gudleppa Hallikeri Arts and Commerce First Grade College
              </h4>
              <p className="text-[10px] font-semibold text-accent mt-0.5">
                14.896620, 75.554571
              </p>
              <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                Hosaritti, Haveri District<br />
                Karnataka - 581115
              </p>
              <div className="mt-2.5 pt-2 border-t border-gray-100">
                <a 
                  href="https://www.google.com/maps/place/14.896620,75.554571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>View larger map</span>
                </a>
              </div>
            </div>
            
            {/* College Photo Thumbnail */}
            <div className="w-24 h-16 sm:w-32 sm:h-20 flex-shrink-0 relative rounded-md overflow-hidden border border-gray-100 shadow-sm self-start mt-0.5">
              <img 
                src="/images/about/campus-overview.webp" 
                alt="Gudleppa Hallikeri College Campus" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
        
        {/* Directions Button (Top-Right) */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=14.896620,75.554571"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 pointer-events-auto border border-white/20 text-xs sm:text-sm"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Get Directions on Google Maps</span>
            <span className="inline sm:hidden">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
