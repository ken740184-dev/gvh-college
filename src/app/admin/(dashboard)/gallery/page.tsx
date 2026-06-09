"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, X, CheckCircle2, Trash2, Loader2, LayoutTemplate, Type, Image as ImageIcon, ArrowRight, ArrowLeft, Edit2, ChevronDown } from "lucide-react";
import { uploadGalleryBlock, getGalleryBlocks, deleteGalleryBlock, updateGalleryBlock, updateGalleryBlockOrder } from "@/actions/gallery";
import { compressImage } from "@/lib/imageCompression";

const LAYOUTS = [
  { 
    id: "single-card", 
    name: "Single Card Grid",
    slots: 1, 
    renderIcon: () => (
      <div className="w-full h-full flex flex-col gap-1 items-center justify-center p-2">
        <div className="w-12 h-12 bg-gray-200 rounded border border-gray-300"></div>
        <div className="w-10 h-1 bg-gray-300 rounded-full mt-1"></div>
        <div className="w-14 h-1 bg-gray-200 rounded-full"></div>
      </div>
    )
  },
  { 
    id: "two-column", 
    name: "Two-Column Card",
    slots: 1, 
    renderIcon: () => (
      <div className="w-full h-full flex flex-col gap-1 items-center justify-center p-2">
        <div className="w-20 h-10 bg-gray-200 rounded border border-gray-300 flex">
          <div className="w-1/2 h-full bg-gray-300 border-r border-gray-200"></div>
          <div className="w-1/2 h-full p-1 flex flex-col gap-0.5 justify-center">
            <div className="w-full h-1 bg-gray-400 rounded-full"></div>
            <div className="w-2/3 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  },
];

const COLORS = [
  { id: "bg-white", name: "White", hex: "#ffffff" },
  { id: "bg-gray-50", name: "Very Light Gray", hex: "#f9fafb" },
  { id: "bg-gray-700", name: "Dark Gray", hex: "#374151" },
  { id: "bg-black", name: "Pitch Black", hex: "#000000" },
  { id: "custom", name: "Custom Color", hex: "#1e40af" },
];

const isDarkColor = (color: string) => {
  if (!color) return false;
  if (['bg-gray-700', 'bg-black'].includes(color)) return true;
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  return false;
};

const CATEGORIES = ["Campus", "Academic", "Sports", "Events"];

type SlotData = {
  file: File | null;
  previewUrl: string | null;
  title: string;
  category: string;
  existingPublicId?: string;
};

const CustomSelect = ({ value, onChange, options, placeholder, className = "" }: { value: string, onChange: (v: string) => void, options: string[], placeholder?: string, className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-white/95 text-black px-3 py-2 rounded-lg text-sm font-bold border border-gray-200/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-white transition-all ${className}`}
      >
        <span className={!value ? "text-gray-500" : ""}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden py-1.5 transform origin-top animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${value === opt ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AdminGalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(true);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);
  
  // Builder State
  const [step, setStep] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState(LAYOUTS[0]);
  const [bgColor, setBgColor] = useState(COLORS[0]);
  const [customColor, setCustomColor] = useState("#1e40af");
  const [blockTitle, setBlockTitle] = useState("");
  const [blockDescription, setBlockDescription] = useState("");
  const [slots, setSlots] = useState<SlotData[]>(Array(LAYOUTS[0].slots).fill({ file: null, previewUrl: null, title: "", category: "Campus" }));
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    setLoadingBlocks(true);
    try {
      const res = await getGalleryBlocks();
      if (res?.success) {
        setBlocks(res.blocks);
      }
    } catch (error) {
      console.error("Failed to fetch gallery blocks:", error);
    } finally {
      setLoadingBlocks(false);
    }
  };

  const handleLayoutSelect = (layout: typeof LAYOUTS[0]) => {
    setSelectedLayout(layout);
    setSlots(Array(layout.slots).fill({ file: null, previewUrl: null, title: "", category: "Campus" }));
    setUploadSuccess(false);
    setStep(2);
  };

  const handleFileDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], index);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], index);
    }
  };

  const processFile = async (file: File, index: number) => {
    if (file && file.type.startsWith("image/")) {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSlots = [...slots];
        newSlots[index] = { ...newSlots[index], file: compressedFile, previewUrl: e.target?.result as string };
        setSlots(newSlots);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleTitleChange = (title: string, index: number) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], title };
    setSlots(newSlots);
  };

  const handleCategoryChange = (category: string, index: number) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], category };
    setSlots(newSlots);
  };

  const applyCategoryToAll = (category: string) => {
    setSlots(slots.map(slot => ({ ...slot, category })));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropIdx(index);
    
    // Auto-scroll logic when dragging near top or bottom
    const scrollThreshold = 100;
    const scrollSpeed = 15;
    if (e.clientY < scrollThreshold) {
      window.scrollBy(0, -scrollSpeed);
    } else if (window.innerHeight - e.clientY < scrollThreshold) {
      window.scrollBy(0, scrollSpeed);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDropIdx(null);
      return;
    }
    
    const newBlocks = [...blocks];
    const [removed] = newBlocks.splice(draggedIdx, 1);
    newBlocks.splice(targetIndex, 0, removed);
    
    setBlocks(newBlocks);
    setDraggedIdx(null);
    setDropIdx(null);
    
    try {
      await updateGalleryBlockOrder(newBlocks.map(b => b._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (block: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setEditingBlockId(block._id);
    const targetLayout = LAYOUTS.find(l => l.id === block.layoutType) || LAYOUTS[0];
    setSelectedLayout(targetLayout);
    
    if (block.backgroundColor && block.backgroundColor.startsWith("#")) {
      setBgColor({ id: "custom", name: "Custom Color", hex: block.backgroundColor });
      setCustomColor(block.backgroundColor);
    } else {
      setBgColor(COLORS.find(c => c.id === block.backgroundColor) || COLORS[0]);
    }
    
    // For dynamic layouts, ensure we have enough slots to hold all the existing images
    const maxSlotIndex = block.images.length > 0 ? Math.max(...block.images.map((img: any) => img.slotIndex)) : -1;
    const slotsCount = Math.max(targetLayout.slots, maxSlotIndex + 1);

    // Construct slots
    const newSlots = Array(slotsCount).fill(null).map((_, i) => {
      const existingImage = block.images.find((img: any) => img.slotIndex === i);
      if (existingImage) {
        return {
          file: null,
          previewUrl: existingImage.url,
          title: existingImage.title || "",
          category: existingImage.category || block.category || "Campus",
          existingPublicId: existingImage.publicId
        };
      }
      return { file: null, previewUrl: null, title: "", category: "Campus" };
    });
    
    setEditingBlockId(block._id);
    setSelectedLayout(targetLayout);
    setBgColor(COLORS.find(c => c.id === block.backgroundColor) || COLORS[0]);
    setBlockTitle(block.title || "");
    setBlockDescription(block.description || "");
    setSlots(newSlots);
    setStep(2);
  };

  const handleCancelEdit = () => {
    setEditingBlockId(null);
    setSelectedLayout(LAYOUTS[0]);
    setBgColor(COLORS[0]);
    setBlockTitle("");
    setBlockDescription("");
    setSlots(Array(LAYOUTS[0].slots).fill({ file: null, previewUrl: null, title: "", category: "Campus" }));
    setStep(1);
  };

  const handleUpload = async () => {
    // Validation allows slots that have a file OR an existing previewUrl
    const filledSlots = slots.filter(slot => slot.file || slot.previewUrl);

    if (filledSlots.length === 0) {
      alert("Please add at least one photo before publishing!");
      return;
    }

    if (selectedLayout.id.startsWith("bento") && filledSlots.length < selectedLayout.slots) {
      alert(`The ${selectedLayout.id} layout requires exactly ${selectedLayout.slots} photos!`);
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("layoutType", selectedLayout.id);
    formData.append("backgroundColor", bgColor.id === "custom" ? customColor : bgColor.id);
    formData.append("title", blockTitle);
    formData.append("description", blockDescription);

    const slotsWithOriginalIndex = slots.map((slot, index) => ({ slot, index })).filter(s => s.slot.file || s.slot.previewUrl);

    const slotsData = slotsWithOriginalIndex.map((s) => {
      if (s.slot.file) {
        formData.append(`file_${s.index}`, s.slot.file as File);
      }
      return { 
        slotIndex: s.index, 
        title: s.slot.title, 
        category: s.slot.category,
        existingUrl: s.slot.previewUrl,
        existingPublicId: s.slot.existingPublicId
      };
    });
    
    formData.append("slotsData", JSON.stringify(slotsData));

    let res;
    try {
      if (editingBlockId) {
        res = await updateGalleryBlock(editingBlockId, formData);
      } else {
        res = await uploadGalleryBlock(formData);
      }
      
      setIsUploading(false);
      
      if (res.success) {
        setSlots(Array(selectedLayout.slots).fill({ file: null, previewUrl: null, title: "", category: "Campus" }));
        setBlockTitle("");
        setBlockDescription("");
        setEditingBlockId(null);
        fetchBlocks(); 
      } else {
        alert(`Failed to ${editingBlockId ? "update" : "upload"} block: ` + res.error);
      }
    } catch (error: any) {
      setIsUploading(false);
      console.error(error);
      alert("Failed to connect to the server. The images might be too large, or your connection dropped.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entire layout block?")) return;
    
    setDeletingId(id);
    const res = await deleteGalleryBlock(id);
    if (res.success) {
      setBlocks(blocks.filter((b) => b._id !== id));
    } else {
      alert("Failed to delete: " + res.error);
    }
    setDeletingId(null);
  };

  const renderDropzones = () => {
    const renderSlot = (index: number, className: string) => (
      <div 
        key={index}
        className={`relative rounded-none border-2 border-dashed ${slots[index]?.previewUrl ? 'border-transparent shadow-none' : 'border-gray-300 hover:border-cyan-500 bg-gray-50 flex flex-col items-center justify-center cursor-pointer'} ${className} transition-all duration-300 min-h-[200px]`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleFileDrop(e, index)}
        onClick={() => !slots[index]?.previewUrl && fileInputRefs.current[index]?.click()}
      >
        <input 
          ref={el => { fileInputRefs.current[index] = el; }} 
          type="file" accept="image/*" className="hidden" 
          onChange={(e) => handleFileChange(e, index)} 
        />
        
        {slots[index]?.previewUrl ? (
          <>
            <img src={slots[index].previewUrl as string} alt={`Slot ${index}`} className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); const newSlots = [...slots]; newSlots[index] = { file: null, previewUrl: null, title: "", category: "Campus" }; setSlots(newSlots); }}
                className="bg-red-500 text-white p-2 rounded-none self-end hover:bg-red-600 transition-transform hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="space-y-2 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <CustomSelect
                  value={slots[index].category}
                  onChange={(v) => handleCategoryChange(v, index)}
                  options={CATEGORIES}
                  className="!py-2"
                />
                <input 
                  type="text" 
                  placeholder="Add Title (Optional)" 
                  value={slots[index].title}
                  onChange={(e) => handleTitleChange(e.target.value, index)}
                  className="w-full bg-white/90 text-black px-3 py-2 rounded-none font-medium border-0 focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-col items-start gap-1">
              <span className="bg-cyan-600 text-white px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider shadow-sm">{slots[index].category}</span>
              {slots[index].title && (
                <span className="bg-black/70 text-white px-2 py-1 rounded-none text-sm font-bold shadow-sm">{slots[index].title}</span>
              )}
            </div>
          </>
        ) : (
          <div className="text-center p-6 text-gray-500 transition-transform hover:scale-105">
            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm">Click or Drag Photo</p>
          </div>
        )}
      </div>
    );

    if (selectedLayout.id === "single-card") {
      return (
        <div className="max-w-md mx-auto">
          <div 
            className={`border ${
              isDarkColor(bgColor.id === 'custom' ? customColor : bgColor.id) ? 'border-gray-800/80' : 'border-white/50'
            } ${
              bgColor.id === 'bg-white' 
                ? 'bg-gradient-to-br from-white/75 via-white/50 to-white/20 backdrop-blur-xl' 
                : (bgColor.id.startsWith('bg-') ? bgColor.id : '')
            } h-full flex flex-col rounded-none shadow-lg`} 
            style={{ backgroundColor: bgColor.id === 'custom' ? customColor : undefined }}
          >
            <div className="p-3 md:p-4 pb-0 flex flex-col">
               {/* Top Line: right-aligned, reversed gradient */}
               <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3 md:mb-4 rounded-full opacity-90 shadow-sm ml-auto"></div>
               
               <div className="border border-white/20 overflow-hidden bg-gray-100">
                 {renderSlot(0, "aspect-square w-full")}
               </div>
            </div>
            <div className="p-6 flex flex-col flex-grow items-start">
               {/* Blue accent line: shorter than card, longer than small title */}
               <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>
               <h3 className="text-lg font-bold mb-1.5 font-sans text-slate-800 uppercase tracking-tight">{blockTitle || "Card Title"}</h3>
               <p className={`${isDarkColor(bgColor.id === 'custom' ? customColor : bgColor.id) ? 'text-slate-200' : 'text-slate-600'} text-sm leading-relaxed`}>{blockDescription || "Card description will appear here..."}</p>
            </div>
          </div>
        </div>
      );
    }
    if (selectedLayout.id === "two-column") {
      return (
        <div className="max-w-3xl mx-auto">
          <div 
            className={`border ${
              isDarkColor(bgColor.id === 'custom' ? customColor : bgColor.id) ? 'border-gray-800/80' : 'border-white/50'
            } ${
              bgColor.id === 'bg-white' 
                ? 'bg-gradient-to-br from-white/75 via-white/50 to-white/10 backdrop-blur-xl' 
                : (bgColor.id.startsWith('bg-') ? bgColor.id : '')
            } h-full flex flex-col md:flex-row rounded-none shadow-lg`} 
            style={{ backgroundColor: bgColor.id === 'custom' ? customColor : undefined }}
          >
            <div className="p-3 md:p-4 pb-0 md:pb-4 md:pr-0 flex flex-col w-full md:w-1/2">
               {/* Top Line: right-aligned, reversed gradient */}
               <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3 md:mb-4 rounded-full opacity-90 shadow-sm ml-auto"></div>
               
               <div className="border border-white/20 overflow-hidden bg-gray-100">
                 {renderSlot(0, "aspect-video w-full")}
               </div>
            </div>
            <div className="p-6 flex flex-col flex-grow items-start justify-center w-full md:w-1/2">
               {/* Blue accent line: shorter than card, longer than small title */}
               <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-4 rounded-full opacity-90 shadow-sm"></div>
               <h3 className="text-lg font-bold mb-1.5 font-sans text-slate-800 uppercase tracking-tight">{blockTitle || "Card Title"}</h3>
               <p className={`${isDarkColor(bgColor.id === 'custom' ? customColor : bgColor.id) ? 'text-slate-200' : 'text-slate-600'} text-sm leading-relaxed`}>{blockDescription || "Card description will appear here..."}</p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedLayout.id === "single") {
      return <div className="grid grid-cols-1">{renderSlot(0, "aspect-[21/9]")}</div>;
    }

    if (selectedLayout.id === "duo") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((_, i) => renderSlot(i, "aspect-video"))}
          {slots.length < 2 && (
            <div 
              onClick={() => setSlots([...slots, { file: null, previewUrl: null, title: "", category: "Campus" }])}
              className="border-2 border-dashed border-gray-300 rounded-none flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-cyan-500 transition-colors text-gray-500 hover:text-cyan-600 font-medium aspect-video"
            >
              + Add second photo
            </div>
          )}
        </div>
      );
    }

    if (selectedLayout.id === "grid-3") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slots.map((_, i) => renderSlot(i, "aspect-square"))}
          {slots.length < 3 && (
            <div 
              onClick={() => setSlots([...slots, { file: null, previewUrl: null, title: "", category: "Campus" }])}
              className="border-2 border-dashed border-gray-300 rounded-none flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-cyan-500 transition-colors text-gray-500 hover:text-cyan-600 font-medium aspect-square"
            >
              + Add photo
            </div>
          )}
        </div>
      );
    }
    
    if (selectedLayout.id === "bento-4") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-4 auto-rows-[200px]">
          {renderSlot(0, "col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 h-full")}
          {renderSlot(1, "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 h-full")}
          {renderSlot(2, "col-span-1 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 h-full")}
          {renderSlot(3, "col-span-2 md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3 h-full")}
        </div>
      );
    }

    if (selectedLayout.id === "bento-5") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr] gap-4 auto-rows-[200px]">
          {renderSlot(0, "col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3")}
          {renderSlot(1, "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2")}
          {renderSlot(2, "col-span-1 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2")}
          {renderSlot(3, "col-span-1 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3")}
          {renderSlot(4, "col-span-1 md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3")}
        </div>
      );
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Visual Gallery Builder</h1>
        <p className="text-gray-600">Create beautiful, magazine-style layouts step-by-step.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[600px] flex flex-col">
          <div className="flex-1 flex flex-col">
            
            {/* Wizard Progress Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-100 gap-4">
              <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${step >= 1 ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                <span className={`font-bold text-sm md:text-base transition-colors whitespace-nowrap ${step >= 1 ? 'text-cyan-900' : 'text-gray-400'}`}>Select Layout</span>
                <ArrowRight className="w-4 h-4 text-gray-300 mx-1 md:mx-2 hidden sm:block shrink-0" />
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${step >= 2 ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                <span className={`font-bold text-sm md:text-base transition-colors whitespace-nowrap ${step >= 2 ? 'text-cyan-900' : 'text-gray-400'}`}>Build & Publish</span>
              </div>
              
              {step > 1 && (
                <div className="flex gap-2 sm:gap-4 self-start sm:self-auto">
                  {editingBlockId && (
                    <button 
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors border border-red-200 hover:border-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors text-sm whitespace-nowrap bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </div>
              )}
            </div>

            {/* STEP 1: LAYOUT SELECTION */}
            <div className={`transition-all duration-500 ease-in-out ${step === 1 ? 'opacity-100 transform translate-x-0' : 'opacity-0 absolute inset-x-8 pointer-events-none transform -translate-x-12'}`}>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">What layout do you want to build?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {LAYOUTS.map(layout => (
                  <button 
                    key={layout.id}
                    onClick={() => handleLayoutSelect(layout)}
                    className="group bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:border-cyan-500 hover:bg-cyan-50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 text-left flex flex-col justify-between"
                  >
                    <div className="mb-2 sm:mb-4 transform group-hover:scale-105 transition-transform duration-500 w-full">
                      {layout.renderIcon()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-lg text-gray-900 leading-tight">{layout.name}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">Select to begin building.</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: PHOTO UPLOAD */}
            <div className={`transition-all duration-700 ease-in-out flex-1 flex flex-col ${step === 2 ? 'opacity-100 transform scale-100' : 'opacity-0 absolute inset-x-8 pointer-events-none transform scale-95'}`}>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-6 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Add your photos</h2>
                  <p className="text-gray-500 mt-1 text-sm md:text-base">Hover over any uploaded photo to set its Title and Category.</p>
                </div>
                
                <div className="bg-cyan-50 p-2 md:p-2.5 rounded-xl border border-cyan-100/50 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 shadow-sm w-full lg:w-auto">
                  <span className="text-sm font-bold text-cyan-800 ml-1">Bulk action:</span>
                  <div className="w-full sm:w-48">
                    <CustomSelect
                      value=""
                      placeholder="Apply to All..."
                      onChange={(v) => applyCategoryToAll(v)}
                      options={CATEGORIES}
                      className="border-white bg-white hover:border-cyan-200"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Preview Canvas (Expands) with live background color preview */}
              <div 
                className={`${bgColor.id.startsWith('bg-') ? bgColor.id : ''} p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 flex-1 flex flex-col justify-center mb-6 transition-colors duration-500`}
                style={{ backgroundColor: bgColor.id === "custom" ? customColor : undefined }}
              >
                <div className="w-full max-w-5xl mx-auto">
                  {renderDropzones()}
                </div>
              </div>

              {/* Compact Styling & Publish Row */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-50 p-4 rounded-xl border border-gray-200 gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                  <span className="text-sm font-bold text-gray-700">Background:</span>
                  <div className="flex gap-2 flex-wrap items-center">
                    {COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setBgColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm flex items-center justify-center shrink-0 overflow-hidden relative ${
                          bgColor.id === color.id 
                            ? 'border-cyan-500 scale-110 ring-4 ring-cyan-500/20' 
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.id === "custom" ? customColor : color.hex }}
                        title={color.name}
                      >
                        {color.id === "custom" && (
                          <input 
                            type="color" 
                            value={customColor}
                            onChange={(e) => {
                              setCustomColor(e.target.value);
                              setBgColor({ ...color, hex: e.target.value });
                            }}
                            className="absolute inset-[-10px] w-16 h-16 opacity-0 cursor-pointer"
                          />
                        )}
                        {bgColor.id === color.id && color.id !== "custom" && (
                          <CheckCircle2 className={`w-5 h-5 ${color.id === 'bg-white' || color.id === 'bg-gray-50' ? 'text-cyan-600' : 'text-white'}`} />
                        )}
                        {color.id === "custom" && bgColor.id !== "custom" && (
                          <span className="text-white text-[10px] font-bold drop-shadow-md">+</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0 px-0 lg:px-4">
                  <input
                    type="text"
                    placeholder="Block Title (optional)"
                    value={blockTitle}
                    onChange={(e) => setBlockTitle(e.target.value)}
                    className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Block Description (optional)"
                    value={blockDescription}
                    onChange={(e) => setBlockDescription(e.target.value)}
                    className="flex-[2] min-w-0 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={isUploading || slots.filter(s => s.file || s.previewUrl).length === 0}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex justify-center items-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-auto"
                >
                  {isUploading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> {editingBlockId ? "Saving..." : "Publishing..."}</>
                  ) : (
                    <>{editingBlockId ? "Save Changes" : "Publish Layout"} <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            </div>

          </div>
      </div>

          {/* PUBLISHED BLOCKS GRID WITH DRAG AND DROP */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Published Layout Blocks</h2>
              <p className="text-sm text-gray-500">Drag to reorder</p>
            </div>
            <div className="flex flex-col gap-8">
              {loadingBlocks ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                </div>
              ) : blocks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium mb-2">No blocks published yet.</p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-cyan-600 font-bold hover:text-cyan-700">Create your first block</button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {(() => {
                    const grouped: any[] = [];
                    let currentCardGroup: any = null;

                    blocks.forEach((block, index) => {
                      const blockWithOriginalIdx = { ...block, originalIndex: index };
                      if (blockWithOriginalIdx.layoutType === "single-card") {
                        if (!currentCardGroup) {
                          currentCardGroup = { _id: `group-${blockWithOriginalIdx._id}`, isGroup: true, blocks: [] };
                          grouped.push(currentCardGroup);
                        }
                        currentCardGroup.blocks.push(blockWithOriginalIdx);
                      } else {
                        currentCardGroup = null;
                        grouped.push(blockWithOriginalIdx);
                      }
                    });

                    return grouped.map((item) => {
                      if (item.isGroup) {
                        return (
                          <div key={item._id} className="w-full transition-colors duration-500 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                              {item.blocks.map((block: any) => (
                                <div 
                                  key={block._id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, block.originalIndex)}
                                  onDragOver={(e) => handleDragOver(e, block.originalIndex)}
                                  onDrop={(e) => handleDrop(e, block.originalIndex)}
                                  className={`relative group cursor-move ${draggedIdx === block.originalIndex ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'} ${dropIdx === block.originalIndex ? 'ring-4 ring-cyan-500 rounded-xl' : ''} transition-all`}
                                >
                                  {/* Floating Actions */}
                                  <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col gap-2 z-20 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(block); }} className="bg-white p-2 rounded shadow-md hover:bg-cyan-50 text-cyan-600 border border-gray-200" title="Edit">
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setDeletingId(block._id); deleteGalleryBlock(block._id).then(() => fetchBlocks()); }} className="bg-white p-2 rounded shadow-md hover:bg-red-50 text-red-600 border border-gray-200" title="Delete">
                                      {deletingId === block._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                  </div>

                                  <div 
                                    className={`flex flex-col border ${
                                      isDarkColor(block.backgroundColor) ? 'border-gray-800/80' : 'border-white/50'
                                    } ${
                                      block.backgroundColor === 'bg-white' 
                                        ? 'bg-gradient-to-br from-white/75 via-white/50 to-white/20 backdrop-blur-xl' 
                                        : (block.backgroundColor.startsWith('bg-') ? block.backgroundColor : '')
                                    } shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full rounded-none overflow-hidden`} 
                                    style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}
                                  >
                                    <div className="bg-gray-100/50 px-3 py-1.5 border-b border-gray-200/50 flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">{block.layoutType}</span>
                                      <div className={`w-3 h-3 rounded-full border border-gray-300 shadow-inner ${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}></div>
                                    </div>
                                    <div className="p-3 md:p-4 pb-0 flex flex-col">
                                      {/* Top Line: right-aligned, reversed gradient */}
                                      <div className="w-[60%] h-[3px] bg-gradient-to-r from-blue-400 to-accent mb-3 md:mb-4 rounded-full opacity-90 shadow-sm ml-auto"></div>
                                      
                                      <div className="w-full aspect-square relative overflow-hidden border border-white/20 bg-gray-100">
                                        {block.images[0] && (
                                          <img src={block.images[0].url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow items-start">
                                       {/* Blue accent line: shorter than card, longer than small title */}
                                       <div className="w-[60%] h-[3px] bg-gradient-to-r from-accent to-blue-400 mb-3.5 rounded-full opacity-90 shadow-sm"></div>
                                       {block.title ? (
                                         <h3 className="text-base font-bold mb-1.5 font-sans text-slate-800 uppercase tracking-tight">{block.title}</h3>
                                       ) : (
                                         <h3 className="text-base font-bold mb-1.5 font-sans text-slate-400 italic">Untitled Image</h3>
                                       )}
                                       {block.description ? (
                                         <p className={`${isDarkColor(block.backgroundColor) ? 'text-slate-200' : 'text-slate-600'} text-xs leading-relaxed`}>{block.description}</p>
                                       ) : (
                                         <p className="text-xs text-slate-400 italic">No description provided.</p>
                                       )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // Non-group blocks (bento, single, duo, etc)
                      const block = item;
                      const sortedImages = [...block.images].sort((a: any, b: any) => a.slotIndex - b.slotIndex);
                      
                      const renderImage = (img: any, className: string) => (
                        <div key={img._id} className={`${className} relative rounded-none overflow-hidden shadow-sm`}>
                          <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </div>
                      );

                      return (
                        <div 
                          key={block._id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, block.originalIndex)}
                          onDragOver={(e) => handleDragOver(e, block.originalIndex)}
                          onDrop={(e) => handleDrop(e, block.originalIndex)}
                          className={`relative group cursor-move ${draggedIdx === block.originalIndex ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'} ${dropIdx === block.originalIndex ? 'ring-4 ring-cyan-500 rounded-xl' : ''} transition-all py-4`}
                        >
                          {/* Floating Actions */}
                          <div className="absolute top-6 right-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex flex-col gap-2 z-20 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(block); }} className="bg-white p-2 rounded shadow-md hover:bg-cyan-50 text-cyan-600 border border-gray-200" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setDeletingId(block._id); deleteGalleryBlock(block._id).then(() => fetchBlocks()); }} className="bg-white p-2 rounded shadow-md hover:bg-red-50 text-red-600 border border-gray-200" title="Delete">
                              {deletingId === block._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>

                          <div className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col`}>
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{block.layoutType}</span>
                                <div className={`w-4 h-4 rounded-full border border-gray-300 shadow-inner ${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }} title="Background Color"></div>
                              </div>
                            </div>

                            <div className={`p-2 md:p-4 ${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}>
                              {(block.title || block.description) && (
                                <div className="mb-4 max-w-3xl">
                                  {block.title && <h3 className={`text-2xl font-bold mb-2 font-sans ${isDarkColor(block.backgroundColor) ? 'text-white' : 'text-red-600'}`}>{block.title}</h3>}
                                  {block.description && <p className={`${isDarkColor(block.backgroundColor) ? 'text-gray-300' : 'text-gray-600'}`}>{block.description}</p>}
                                </div>
                              )}

                              <div className="w-full max-w-7xl mx-auto">
                                {/* Using the exact renderGrid layouts from gallery page */}
                                {block.layoutType === "single" && sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-[21/9] sm:aspect-[3/1]")}
                                {block.layoutType === "duo" && (
                                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square md:aspect-[4/3]")}
                                  </div>
                                )}
                                {block.layoutType === "grid-3" && (
                                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[2] && renderImage(sortedImages[2], "w-full aspect-square md:aspect-[4/3]")}
                                  </div>
                                )}
                                {block.layoutType === "bento-4" && (
                                  <div className="grid grid-cols-1 sm:grid-cols-[1.8fr_1fr_1fr] gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "col-span-1 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 aspect-square sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px]")}
                                    <div className="col-span-1 sm:col-start-2 sm:col-end-4 grid grid-cols-2 gap-2 md:gap-4">
                                      {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square")}
                                      {sortedImages[2] && renderImage(sortedImages[2], "w-full aspect-square")}
                                    </div>
                                    {sortedImages[3] && renderImage(sortedImages[3], "col-span-1 sm:col-start-2 sm:col-end-4 aspect-[21/9] sm:aspect-auto sm:h-full")}
                                  </div>
                                )}
                                {block.layoutType === "bento-5" && (
                                  <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.5fr_1fr] gap-2 md:gap-4">
                                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 md:gap-4 h-[300px] sm:h-auto">
                                      {sortedImages[0] && renderImage(sortedImages[0], "w-full flex-1")}
                                      {sortedImages[1] && renderImage(sortedImages[1], "w-full flex-1")}
                                    </div>
                                    {sortedImages[2] && renderImage(sortedImages[2], "col-span-2 sm:col-span-1 aspect-square sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px]")}
                                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 md:gap-4 h-[300px] sm:h-auto">
                                      {sortedImages[3] && renderImage(sortedImages[3], "w-full flex-1")}
                                      {sortedImages[4] && renderImage(sortedImages[4], "w-full flex-1")}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
