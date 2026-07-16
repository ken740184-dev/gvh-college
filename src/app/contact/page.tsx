"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 md:pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">{t("contact.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading title={t("contact.get_in_touch")} />
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t("contact.address_title")}</h4>
                  <p className="text-secondary-text">
                    {t("footer.address").split(", ").map((part, index) => (
                      <span key={index}>
                        {part}
                        {index < t("footer.address").split(", ").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t("contact.phone_title")}</h4>
                  <p className="text-secondary-text">
                    {t("contact.admission_office")}: +91 XXXXX XXXXX<br />
                    {t("contact.admin_office")}: +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t("contact.email_title")}</h4>
                  <p className="text-secondary-text">
                    hallikerigv@gmail.com<br />
                    admissions@gvhcollege.edu
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-accent mr-4 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t("contact.hours_title")}</h4>
                  <p className="text-secondary-text">
                    {t("contact.hours_weekdays")}<br />
                    {t("contact.hours_saturday")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-lg shadow-xl border border-border-color">
              <h3 className="text-2xl font-sans font-bold mb-6">{t("contact.form_title")}</h3>

              {/* Success Message */}
              {status === "success" && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="font-medium">Message sent! We'll get back to you soon.</p>
                </div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="font-medium">{errorMsg}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form_name")}</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder={t("contact.form_placeholder_name")}
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form_phone")}</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder={t("contact.form_placeholder_phone")}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form_email")}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={t("contact.form_placeholder_email")}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t("contact.form_message")}</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={t("contact.form_placeholder_msg")}
                    suppressHydrationWarning
                  ></textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      t("contact.form_submit")
                    )}
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
        
        {/* Info Card */}
        <div className="absolute top-4 left-4 z-10 w-[260px] sm:w-[360px] bg-white/95 backdrop-blur-md p-3.5 rounded-md shadow-lg border border-gray-200/85 pointer-events-auto">
          <div className="flex gap-3 text-gray-800">
            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-xs sm:text-sm text-gray-900 leading-tight break-words">
                {t("footer.address").split(", ")[0]}
              </h4>
              <p className="text-[10px] font-semibold text-accent mt-0.5">
                14.896620, 75.554571
              </p>
              <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">
                {t("footer.address").split(", ").slice(1).map((part, index) => (
                  <span key={index}>
                    {part}
                    {index < t("footer.address").split(", ").slice(1).length - 1 && <br />}
                  </span>
                ))}
              </p>
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-3">
                <a
                  href="https://www.google.com/maps/place/14.896620,75.554571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105"
                  title="View Larger Map"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=14.896620,75.554571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105"
                  title="Get Directions"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path fill="#1a73e8" d="M12 2L2 12l10 10 10-10L12 2z" />
                    <path fill="#fff" d="M11.5 15.5v-4a1 1 0 0 1 1-1h2.5V8.5L18.5 12l-3.5 3.5V13.5h-2.5v2h-1z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-24 h-16 sm:w-32 sm:h-20 flex-shrink-0 relative rounded-md overflow-hidden border border-gray-100 shadow-sm self-start mt-0.5">
              <img
                src="/images/about/campus-overview.jpg"
                alt="Gudleppa Hallikeri College Campus"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Top-Right Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2.5 pointer-events-auto">
          <a
            href="https://www.google.com/maps/place/14.896620,75.554571"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 border border-white/20 text-xs sm:text-sm"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>{t("contact.maps_view")}</span>
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=14.896620,75.554571"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 border border-white/20 text-xs sm:text-sm pointer-events-auto"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>{t("contact.maps_directions")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
