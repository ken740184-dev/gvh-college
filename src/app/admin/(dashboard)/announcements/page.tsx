"use client";

import { useState, useEffect } from "react";
import { getAnnouncement, updateAnnouncement } from "@/actions/announcements";
import { Megaphone, Save, Loader2, Play, Square, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null);

  useEffect(() => {
    fetchAnnouncementSettings();
  }, []);

  const fetchAnnouncementSettings = async () => {
    setIsLoading(true);
    const res = await getAnnouncement();
    if (res.success && res.announcement) {
      setText(res.announcement.text);
      setIsActive(res.announcement.isActive);
    } else {
      setMessage({ type: "error", content: "Failed to load announcement settings: " + (res.error || "Unknown error") });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Announcement text cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    const res = await updateAnnouncement(text, isActive);
    
    if (res.success) {
      setMessage({ type: "success", content: "Announcement settings saved and homepage cache updated successfully!" });
    } else {
      setMessage({ type: "error", content: "Failed to save: " + res.error });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title & Actions Bar */}
      <div>
        <h1 className="text-3xl font-sans font-bold text-gray-900 tracking-tight">Announcement Manager</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage the scrolling marquee announcement ribbon displayed at the top of the homepage.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white border border-gray-100 rounded-none shadow-sm">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notification Alerts */}
          {message && (
            <div
              className={`p-4 flex items-center gap-3 border rounded-none text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{message.content}</span>
            </div>
          )}

          {/* Live Mock Preview Banner */}
          <div className="border border-gray-200 bg-gray-50 p-4 rounded-none shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Live Marquee Ribbon Mockup Preview</h3>
            
            {isActive ? (
              <div className="bg-accent text-white flex items-center relative overflow-hidden h-14 w-full border border-red-600 shadow-md">
                {/* Apply Button Label */}
                <div className="absolute left-0 top-0 bottom-0 bg-navbar px-4 flex items-center z-30 border-r border-white/10 shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
                  <div className="bg-white text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5 whitespace-nowrap">
                    Apply Now <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
                
                {/* Animated scrolling text */}
                <div className="flex w-max animate-marquee whitespace-nowrap pl-[110px] shrink-0">
                  <div className="flex items-center shrink-0">
                    <span className="mx-8 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shrink-0 select-none">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {text || "Write something in the text box below..."}
                    </span>
                    <span className="mx-8 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shrink-0 select-none">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
                      {text || "Write something in the text box below..."}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 text-gray-400 flex items-center justify-center h-14 w-full border border-dashed border-gray-300 select-none font-bold text-xs uppercase tracking-widest">
                <Square className="w-4 h-4 mr-2" /> Ribbon is currently disabled & hidden
              </div>
            )}
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200/85 p-6 md:p-8 rounded-none shadow-sm space-y-6">
            <div className="flex flex-col gap-6">
              {/* Ribbon Toggle */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div>
                  <label className="text-base font-bold text-gray-800 block">Ribbon Visibility</label>
                  <span className="text-xs text-gray-500 mt-0.5 block">
                    Toggle to display or completely hide the scrolling banner on the homepage.
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none shadow-inner flex items-center ${
                    isActive ? "bg-cyan-600 justify-end" : "bg-gray-200 justify-start"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300" />
                </button>
              </div>

              {/* Text Area Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700">Announcement Text</label>
                  <span className={`text-[10px] font-bold uppercase ${isActive ? "text-green-600" : "text-gray-400"}`}>
                    {isActive ? "Currently Active" : "Draft (Ribbon Disabled)"}
                  </span>
                </div>
                
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. Admission for 2026 has started, apply now! Last date for online submission is June 30th."
                  className="w-full border border-gray-200 rounded-none px-4 py-3 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner bg-gray-50/20"
                  maxLength={250}
                ></textarea>
                
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>Keep it clear and concise for scrolling readability.</span>
                  <span>{text.length}/250 characters</span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-none transition-all shadow-md shadow-cyan-600/10 flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Configuration</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
