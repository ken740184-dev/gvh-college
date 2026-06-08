"use client";

import { useState, useEffect, useRef } from "react";
import MobileHeader from "@/components/admin/MobileHeader";
import { getNews, addNews, updateNews, deleteNews } from "@/actions/news";
import { Plus, Trash2, Edit, X, Upload, Calendar } from "lucide-react";

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
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  }
  return dateStr;
};

export default function NewsAdminPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayString());
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    const res = await getNews();
    if (res.success) {
      setNewsList(res.news);
    } else {
      alert("Failed to load news: " + res.error);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDate(getTodayString());
    setCategory("General");
    setExcerpt("");
    setImageFile(null);
    setPreviewUrl(null);
    setIsModalOpen(false);
  };

  const handleOpenEdit = (newsItem: any) => {
    setEditingId(newsItem._id);
    setTitle(newsItem.title);
    setDate(formatDbDateForInput(newsItem.date));
    setCategory(newsItem.category);
    setExcerpt(newsItem.excerpt);
    setImageFile(null);
    setPreviewUrl(newsItem.image);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !category || !excerpt) {
      alert("All text fields are required.");
      return;
    }
    if (!editingId && !imageFile) {
      alert("An image is required for new articles.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("category", category);
    formData.append("excerpt", excerpt);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    let res;
    if (editingId) {
      res = await updateNews(editingId, formData);
    } else {
      res = await addNews(formData);
    }

    if (res.success) {
      resetForm();
      fetchNews();
    } else {
      alert("Failed to save news article: " + res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    
    const res = await deleteNews(id);
    if (res.success) {
      fetchNews();
    } else {
      alert("Failed to delete: " + res.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0 relative">
      <MobileHeader />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">News & Announcements</h1>
          <p className="text-gray-600">Manage the latest news and updates for the college website.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> Add Article
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
        </div>
      ) : newsList.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No news articles found</h3>
          <p className="text-gray-500 mb-6">Start by adding your first news article to keep students updated.</p>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Add Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
              <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
                    title="Edit Article"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 flex-1">{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Article" : "Add Article"}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image *</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-56 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${previewUrl ? 'border-blue-500' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-gray-500 font-medium text-sm">Upload Cover Image</span>
                        <span className="text-gray-400 text-xs mt-1">Recommended size: 800x600px</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Article Title *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. Admissions Open for 2026-27"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
                    required
                  >
                    <option value="General">General</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Academics">Academics</option>
                    <option value="Events">Events</option>
                    <option value="Sports">Sports</option>
                    <option value="Campus Life">Campus Life</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt (Short Description) *</label>
                  <textarea 
                    value={excerpt} 
                    onChange={e => setExcerpt(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none h-28"
                    placeholder="Write a brief 1-2 sentence summary of the article..."
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
                  ) : (
                    <>{editingId ? "Save Changes" : "Publish Article"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
