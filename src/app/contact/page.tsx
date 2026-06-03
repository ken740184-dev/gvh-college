import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
                    123 Education Boulevard<br />
                    University District<br />
                    City, State 12345
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
      <div className="w-full h-[500px] bg-gray-200 relative group">
        <iframe 
          src="https://maps.google.com/maps?q=14.896615234015393,75.55458990991627&hl=en&z=15&output=embed" 
          className="w-full h-full border-0" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
        
        {/* Floating Get Directions Button */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=14.896615234015393,75.55458990991627"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-bold shadow-xl transition-transform hover:scale-105 flex items-center gap-2 pointer-events-auto border-2 border-white/20"
          >
            <MapPin className="w-5 h-5" /> Get Directions on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
