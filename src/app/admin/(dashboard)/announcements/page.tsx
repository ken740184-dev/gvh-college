"use client";

import { useState, useEffect } from "react";
import { getAnnouncement, updateAnnouncementConfig } from "@/actions/announcements";
import { 
  Megaphone, 
  Save, 
  Loader2, 
  Play, 
  Square, 
  AlertCircle, 
  ArrowRight, 
  Image as ImageIcon, 
  Trash2, 
  Sparkles, 
  X,
  Upload,
  Layers,
  Layout
} from "lucide-react";
import TranslateButton from "@/components/admin/TranslateButton";

export default function AdminAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"marquee" | "popup">("marquee");
  
  // Marquee settings
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [marqueeButtonText, setMarqueeButtonText] = useState("Apply Now");
  const [marqueeButtonLink, setMarqueeButtonLink] = useState("/admissions/apply");
  
  // Popup settings
  const [popupActive, setPopupActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupLink, setPopupLink] = useState("");
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const [popupImagePublicId, setPopupImagePublicId] = useState("");
  
  // Local files / upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string>("");
  const [deleteImage, setDeleteImage] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoTranslating, setIsAutoTranslating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null);

  useEffect(() => {
    fetchAnnouncementSettings();
  }, []);

  const fetchAnnouncementSettings = async () => {
    setIsLoading(true);
    const res = await getAnnouncement();
    if (res.success && res.announcement) {
      setText(res.announcement.text || "");
      setIsActive(res.announcement.isActive !== false);
      setPopupActive(!!res.announcement.popupActive);
      setPopupTitle(res.announcement.popupTitle || "");
      setPopupLink(res.announcement.popupLink || "");
      setPopupImageUrl(res.announcement.popupImageUrl || "");
      setPopupImagePublicId(res.announcement.popupImagePublicId || "");
      setMarqueeButtonText(res.announcement.marqueeButtonText || "Apply Now");
      setMarqueeButtonLink(res.announcement.marqueeButtonLink || "/admissions/apply");
    } else {
      setMessage({ type: "error", content: "Failed to load announcement settings: " + (res.error || "Unknown error") });
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Image file size should not exceed 10MB");
        return;
      }
      setSelectedFile(file);
      setDeleteImage(false);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setSelectedFilePreview("");
    setDeleteImage(true);
  };

  const handleTextBlur = async () => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.includes("|") || trimmed.length < 3) return;

    setIsAutoTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Translation failed");

      if (data.sourceLang === "Kannada") {
        setText(`${data.translated} | ${trimmed}`);
      } else {
        setText(`${trimmed} | ${data.translated}`);
      }
    } catch (err: any) {
      console.error("Auto translation error:", err);
    } finally {
      setIsAutoTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Marquee announcement text cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    let finalMarqueeText = text.trim();
    // Auto-translate if no separator is present
    if (!finalMarqueeText.includes("|") && finalMarqueeText.length >= 3) {
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: finalMarqueeText }),
        });
        const data = await res.json();
        if (res.ok && !data.error && data.translated) {
          if (data.sourceLang === "Kannada") {
            finalMarqueeText = `${data.translated} | ${finalMarqueeText}`;
          } else {
            finalMarqueeText = `${finalMarqueeText} | ${data.translated}`;
          }
          setText(finalMarqueeText);
        }
      } catch (err) {
        console.error("Auto translation during submit failed:", err);
      }
    }

    const formData = new FormData();
    formData.append("text", finalMarqueeText);
    formData.append("isActive", String(isActive));
    formData.append("popupActive", String(popupActive));
    formData.append("popupTitle", popupTitle);
    formData.append("popupLink", popupLink);
    formData.append("marqueeButtonText", marqueeButtonText);
    formData.append("marqueeButtonLink", marqueeButtonLink);
    formData.append("deleteImage", String(deleteImage));
    
    if (selectedFile) {
      formData.append("popupImage", selectedFile);
    }

    const res = await updateAnnouncementConfig(formData);
    
    if (res.success && res.announcement) {
      setMessage({ type: "success", content: "Announcement settings saved and homepage cache updated successfully!" });
      
      // Update local states with response
      setText(res.announcement.text || "");
      setIsActive(res.announcement.isActive !== false);
      setPopupActive(!!res.announcement.popupActive);
      setPopupTitle(res.announcement.popupTitle || "");
      setPopupLink(res.announcement.popupLink || "");
      setPopupImageUrl(res.announcement.popupImageUrl || "");
      setPopupImagePublicId(res.announcement.popupImagePublicId || "");
      setMarqueeButtonText(res.announcement.marqueeButtonText || "Apply Now");
      setMarqueeButtonLink(res.announcement.marqueeButtonLink || "/admissions/apply");
      
      setSelectedFile(null);
      setSelectedFilePreview("");
      setDeleteImage(false);
    } else {
      setMessage({ type: "error", content: "Failed to save: " + (res.error || "Unknown error") });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Title & Actions Bar */}
      <div>
        <h1 className="text-3xl font-sans font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
          <Megaphone className="w-8 h-8 text-cyan-600" />
          Announcement Manager
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure what notifications are displayed to students and visitors when they open the website.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white border border-gray-100 shadow-sm">
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

          {/* Unified Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Custom Tab Selector */}
            <div className="flex border-b border-gray-200 bg-gray-50/50 p-1 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("marquee")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-bold transition-all ${
                  activeTab === "marquee"
                    ? "bg-white text-cyan-600 border-t-2 border-cyan-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                Marquee scrolling banner
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("popup")}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-bold transition-all ${
                  activeTab === "popup"
                    ? "bg-white text-cyan-600 border-t-2 border-cyan-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Layout className="w-4 h-4" />
                Entrance Pop-up Modal
              </button>
            </div>

            {/* TAB CONTENT: MARQUEE */}
            {activeTab === "marquee" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form fields */}
                <div className="lg:col-span-2 bg-white border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <div>
                      <label className="text-base font-bold text-gray-800 block">Marquee Visibility</label>
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

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-700">
                        Announcement Text {isAutoTranslating && <span className="text-xs font-normal text-cyan-600 animate-pulse ml-2">(Auto-translating...)</span>}
                      </label>
                    </div>
                    
                    <textarea
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onBlur={handleTextBlur}
                      disabled={isAutoTranslating}
                      placeholder="e.g. Admission for 2026 has started, apply now! Last date for online submission is June 30th."
                      className="w-full border border-gray-200 rounded-none px-4 py-3 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner bg-gray-50/20 disabled:opacity-75"
                      maxLength={500}
                    ></textarea>
                    
                    <div className="flex justify-between text-xs text-gray-400 font-medium">
                      <span>Tip: Enter text in English or Kannada. When you click away (blur) or click Save, it automatically translates and combines both languages.</span>
                      <span>{text.length}/500 characters</span>
                    </div>
                  </div>

                  {/* Marquee Button Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">Marquee Button Text</label>
                      <input
                        type="text"
                        value={marqueeButtonText}
                        onChange={(e) => setMarqueeButtonText(e.target.value)}
                        placeholder="e.g. Apply Now"
                        className="w-full border border-gray-200 rounded-none px-4 py-2 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none bg-gray-50/20"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">Marquee Button Link</label>
                      <input
                        type="text"
                        value={marqueeButtonLink}
                        onChange={(e) => setMarqueeButtonLink(e.target.value)}
                        placeholder="e.g. /admissions/apply"
                        className="w-full border border-gray-200 rounded-none px-4 py-2 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none bg-gray-50/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Ribbon Preview */}
                <div className="bg-gray-55 border border-gray-200 p-6 space-y-4 shadow-sm flex flex-col justify-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                    Live Marquee Mockup
                  </h3>
                  
                  {isActive ? (
                    <div className="bg-[#8b0000] text-white flex items-center relative overflow-hidden h-14 w-full border border-red-700 shadow-md">
                      <div className="absolute left-0 top-0 bottom-0 bg-slate-900 px-3 flex items-center z-30 border-r border-white/10">
                        <div className="bg-white text-red-700 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5 whitespace-nowrap">
                          {marqueeButtonText || "Apply Now"} <ArrowRight className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      
                      <div className="flex w-max animate-marquee whitespace-nowrap pl-[90px] shrink-0">
                        <div className="flex items-center shrink-0">
                          <span className="mx-6 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shrink-0 select-none">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {text || "Enter marquee text in the input box..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-400 flex items-center justify-center h-14 w-full border border-dashed border-gray-300 select-none font-bold text-xs uppercase tracking-widest">
                      <Square className="w-4 h-4 mr-2" /> Banner Hidden
                    </div>
                  )}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This marquee ribbon will scroll continuously at the very top of the homepage to draw attention to generic deadlines.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: POPUP MODAL */}
            {activeTab === "popup" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form inputs */}
                <div className="lg:col-span-2 bg-white border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm">
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <div>
                      <label className="text-base font-bold text-gray-800 block">Pop-up Modal Visibility</label>
                      <span className="text-xs text-gray-500 mt-0.5 block">
                        Toggle to enable the entrance announcement popup modal on first visit.
                      </span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setPopupActive(!popupActive)}
                      className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none shadow-inner flex items-center ${
                        popupActive ? "bg-cyan-600 justify-end" : "bg-gray-200 justify-start"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300" />
                    </button>
                  </div>

                  {/* Pop-up Title */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-gray-700">Pop-up Header Title</label>
                      <TranslateButton sourceText={popupTitle} onTranslated={setPopupTitle} />
                    </div>
                    <input
                      type="text"
                      value={popupTitle}
                      onChange={(e) => setPopupTitle(e.target.value)}
                      placeholder="e.g. KLE Vidyarthi Scholarship Test 2024-25"
                      className="w-full border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none bg-gray-50/20"
                    />
                  </div>

                  {/* Pop-up Action Link */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Pop-up Link (Optional)</label>
                    <input
                      type="url"
                      value={popupLink}
                      onChange={(e) => setPopupLink(e.target.value)}
                      placeholder="e.g. https://scholarship.kle.org"
                      className="w-full border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none bg-gray-50/20"
                    />
                    <span className="text-xs text-gray-400">
                      Redirects visitors to this page when they click the popup banner image or action button.
                    </span>
                  </div>

                  {/* Vertical Image File Upload */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Pop-up Banner Image (Vertical Rectangle)</label>
                    
                    {/* Upload Box / Preview Area */}
                    <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center bg-gray-50/50 relative">
                      {selectedFilePreview || (popupImageUrl && !deleteImage) ? (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative w-44 aspect-[3/4] border border-gray-200 shadow-md bg-white overflow-hidden">
                            <img
                              src={selectedFilePreview || popupImageUrl}
                              alt="Flyer Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 border border-red-250 flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove Image
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer py-6 w-full">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-cyan-600 font-bold hover:text-cyan-700">Upload a Flyer Image</span>
                          <span className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP (Max size 10MB)</span>
                          <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1">Vertical layout recommended</span>
                          
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                </div>

                {/* Live Mockup of Vertical Popup */}
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden min-h-[450px]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6 self-start flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                    Popup Live Simulation
                  </h3>
                  
                  {popupActive ? (
                    <div className="relative border border-gray-200 bg-white shadow-2xl w-full max-w-[260px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                      {/* Sim Close button */}
                      <div className="absolute top-2.5 right-2.5 bg-white/90 p-1.5 rounded-full border border-gray-150 shadow-sm z-30">
                        <X className="w-3 h-3 text-slate-700" />
                      </div>

                      {/* Sim Header Title */}
                      {popupTitle && (
                        <div className="px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
                          <h4 className="text-[10px] font-sans font-bold text-slate-800 truncate pr-4 uppercase tracking-wider">
                            {popupTitle}
                          </h4>
                        </div>
                      )}

                      {/* Sim Image */}
                      <div className="p-3">
                        <div className="relative w-full aspect-[3/4] bg-slate-50 overflow-hidden border border-slate-200/60 rounded-md shadow-inner flex items-center justify-center">
                          {selectedFilePreview || (popupImageUrl && !deleteImage) ? (
                            <img
                              src={selectedFilePreview || popupImageUrl}
                              alt="Simulation"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <ImageIcon className="w-6 h-6 text-slate-350 mb-1 animate-pulse" />
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Sim Button */}
                      {popupLink && (
                        <div className="p-2 border-t border-slate-100 bg-white">
                          <div className="bg-cyan-600 text-white text-[9px] font-sans font-bold uppercase tracking-widest text-center py-2">
                            View Details
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 bg-white p-8 text-center text-gray-400 font-sans font-bold text-xs uppercase tracking-widest w-full max-w-[240px] aspect-[3/4.2] flex flex-col items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-gray-300 mb-2" />
                      <span>Popup is Disabled</span>
                    </div>
                  )}
                  
                  <span className="text-[10px] text-gray-400 text-center mt-6 block leading-relaxed max-w-[240px]">
                    This simulate mock displays a vertical layout matching standard mobile and desktop aspect ratios.
                  </span>
                </div>
              </div>
            )}

            {/* Form Action Buttons (Unified at bottom) */}
            <div className="flex justify-end pt-4 border-t border-gray-150">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-sans font-bold py-3 px-8 rounded-none transition-all shadow-md shadow-cyan-600/10 flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving Configuration...</>
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
