"use client";

import { useState, useEffect, useRef } from "react";
import { getEvents, addEvent, updateEvent, deleteEvent } from "@/actions/events";
import { compressImage } from "@/lib/imageCompression";
import { Plus, Trash2, Edit2, X, UploadCloud, Calendar, Loader2, Image as ImageIcon } from "lucide-react";

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDbDateForInput = (dateStr: string) => {
  if (!dateStr) return getTodayString();
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(dateStr)) {
    return dateStr;
  }
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return getTodayString();
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(dateStr)) {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  }
  return dateStr;
};

const CATEGORIES = [
  "Academic",
  "Cultural",
  "Sports",
  "Competitions",
  "Workshops & Seminars",
  "Exhibitions",
  "Community Service / NSS",
  "Festivals & Celebrations"
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayString());
  const [category, setCategory] = useState("Academic");
  const [description, setDescription] = useState("");
  
  // Images to upload
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  
  // Existing images (for edit mode)
  const [existingImages, setExistingImages] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const res = await getEvents();
    if (res.success) {
      setEvents(res.events);
    } else {
      alert("Failed to load events: " + res.error);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDate(getTodayString());
    setCategory("Academic");
    setDescription("");
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setExistingImages([]);
    setIsModalOpen(false);
  };

  const handleOpenEdit = (event: any) => {
    setEditingId(event._id);
    setTitle(event.title);
    setDate(formatDbDateForInput(event.date));
    setCategory(event.category || "Cultural");
    setDescription(event.description);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setExistingImages(event.images || []);
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsSubmitting(true); // Temp loading indicators while compressing
      const addedFiles: File[] = [];
      const addedPreviews: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImage(files[i]);
        addedFiles.push(compressed);
        addedPreviews.push(URL.createObjectURL(compressed));
      }

      setNewImageFiles((prev) => [...prev, ...addedFiles]);
      setNewImagePreviews((prev) => [...prev, ...addedPreviews]);
      setIsSubmitting(false);
    }
  };

  const handleRemoveNewImage = (idx: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveExistingImage = (idx: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !category || !description.trim()) {
      alert("All text fields are required.");
      return;
    }

    if (!editingId && newImageFiles.length === 0) {
      alert("Please upload at least one photo for the event.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("category", category);
    formData.append("description", description);

    // Append kept existing images if editing
    if (editingId) {
      formData.append("keptImages", JSON.stringify(existingImages));
    }

    // Append newly selected image files
    newImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    let res;
    if (editingId) {
      res = await updateEvent(editingId, formData);
    } else {
      res = await addEvent(formData);
    }

    if (res.success) {
      resetForm();
      fetchEvents();
    } else {
      alert("Failed to save event: " + res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event and all its photos?")) return;
    setDeletingId(id);
    const res = await deleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } else {
      alert("Failed to delete event: " + res.error);
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-gray-900 tracking-tight">Event Builder</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, publish, and schedule college events.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Publish Event
        </button>
      </div>

      {/* Grid Events List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-bold mb-1">No events published yet.</p>
          <p className="text-gray-400 text-xs mb-4">Add your first campus event to get started.</p>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="text-cyan-600 font-bold hover:text-cyan-700 text-sm"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Event Info</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Photos</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50/55 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <h4 className="font-bold text-gray-800 truncate">{event.title}</h4>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(event.date)}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-cyan-100">
                        {event.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-xs">{event.images?.length || 0} photos</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenEdit(event)}
                          className="bg-white p-2 rounded-lg border border-gray-200 hover:border-cyan-200 text-cyan-600 hover:bg-cyan-50/30 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={deletingId === event._id}
                          className="bg-white p-2 rounded-lg border border-gray-200 hover:border-red-200 text-red-600 hover:bg-red-50/30 transition-all shadow-sm"
                          title="Delete"
                        >
                          {deletingId === event._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] flex flex-col transform scale-100 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Campus Event" : "Publish New Event"}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Event Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Annual Sports Day 2026"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Event Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Event Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none bg-white transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Description & Details</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed paragraphs about the event, activities, participants, etc..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Photos upload section */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">Event Photos</label>
                
                {/* File Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-cyan-500 bg-gray-50/50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                  <div>
                    <span className="font-bold text-sm text-gray-700 block">Click or Drop Photos here</span>
                    <span className="text-xs text-gray-400 block mt-0.5">Select one or multiple photos to upload</span>
                  </div>
                </div>

                {/* Existing Images Previews (Edit Mode) */}
                {editingId && existingImages.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500">Currently Published Photos:</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {existingImages.map((img, idx) => (
                        <div key={img._id || idx} className="relative aspect-square border border-gray-100 rounded-lg overflow-hidden group">
                          <img src={img.url} className="w-full h-full object-cover" alt="" />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Selected Images Previews */}
                {newImagePreviews.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-gray-500">Photos Queue to Upload:</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {newImagePreviews.map((url, idx) => (
                        <div key={idx} className="relative aspect-square border border-gray-100 rounded-lg overflow-hidden group animate-in fade-in zoom-in-90 duration-150">
                          <img src={url} className="w-full h-full object-cover" alt="" />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(idx)}
                            className="absolute top-1 right-1 bg-gray-900/80 hover:bg-red-600 text-white p-1 rounded-full shadow-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Modal Footer actions */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-3xl">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-cyan-600/15 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <>{editingId ? "Save Changes" : "Publish Event"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
