"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import { getAchievements, addAchievement, updateAchievement, deleteAchievement } from "@/actions/achievements";
import { compressImage } from "@/lib/imageCompression";

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

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("student");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: getTodayString(),
    category: "student",
    description: "",
    layoutSize: "small",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    const res = await getAchievements();
    if (res.success) {
      setAchievements(res.achievements);
    }
    setIsFetching(false);
  };

  const openModal = (achievement?: any) => {
    if (achievement) {
      setEditingId(achievement._id);
      setFormData({
        title: achievement.title,
        date: formatDbDateForInput(achievement.date),
        category: achievement.category,
        description: achievement.description,
        layoutSize: achievement.layoutSize || (achievement.isBanner ? "medium" : "small"),
      });
      setPreviewImage(achievement.image);
    } else {
      setEditingId(null);
      setFormData({ title: "", date: getTodayString(), category: activeTab, description: "", layoutSize: "small" });
      setPreviewImage(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setPreviewImage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const compressedFile = await compressImage(file);
      setImageFile(compressedFile);
      setPreviewImage(URL.createObjectURL(compressedFile));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const compressedFile = await compressImage(file);
      setImageFile(compressedFile);
      setPreviewImage(URL.createObjectURL(compressedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("layoutSize", formData.layoutSize);
    if (imageFile) {
      data.append("image", imageFile);
    }

    let res;
    if (editingId) {
      res = await updateAchievement(editingId, data);
    } else {
      res = await addAchievement(data);
    }

    if (res.success) {
      await fetchData();
      closeModal();
    } else {
      alert("Error: " + res.error);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      const res = await deleteAchievement(id);
      if (res.success) {
        setAchievements(achievements.filter(a => a._id !== id));
      } else {
        alert("Failed to delete.");
      }
    }
  };

  const filteredAchievements = achievements.filter(a => a.category === activeTab);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Achievements</h1>
        <button
          onClick={() => openModal()}
          className="bg-accent text-white px-4 py-2 rounded-lg flex items-center hover:bg-accent/90 transition-colors w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Achievement
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-full max-w-fit">
        <button
          onClick={() => setActiveTab("student")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "student" ? "bg-accent text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "faculty" ? "bg-accent text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => setActiveTab("institutional")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === "institutional" ? "bg-accent text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Institutional
        </button>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No achievements found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              <div
                className="bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0 w-full aspect-video"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 sm:opacity-100 sm:bg-transparent sm:items-start sm:justify-end sm:p-2 z-10">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-white p-2 rounded-full text-blue-600 hover:scale-110 transition-transform shadow-md"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-white p-2 rounded-full text-red-600 hover:scale-110 transition-transform shadow-md"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
                <div className="p-5 flex flex-col flex-grow justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md">{formatDate(item.date)}</span>
                    <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Size: {item.layoutSize || (item.isBanner ? "medium" : "small")}
                    </span>
                  </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingId ? "Edit Achievement" : "Add Achievement"}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload Area */}
              <div 
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging ? "border-accent bg-accent/5" : "border-gray-300 hover:border-gray-400"
                } ${previewImage ? "border-none p-0 overflow-hidden aspect-video" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="relative w-full h-full group">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Change Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
                    <label className="cursor-pointer text-accent font-medium hover:underline">
                      browse your files
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    placeholder="e.g. University Gold Medalist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                >
                  <option value="student">Student Achievement</option>
                  <option value="faculty">Faculty Achievement</option>
                  <option value="institutional">Institutional Achievement</option>
                </select>
              </div>                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Layout Size</label>
                  <select
                    value={formData.layoutSize}
                    onChange={(e) => setFormData({...formData, layoutSize: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white text-sm"
                  >
                    <option value="small">Small (1 Column, Text Below)</option>
                    <option value="medium">Medium (Full Width, Image & Text Side-by-Side)</option>
                    <option value="large">Large (Full Width, Image Top, Text Below, Grey Block)</option>
                  </select>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none"
                  placeholder="Describe the achievement..."
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || (!editingId && !imageFile)}
                  className="px-6 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    editingId ? "Update Achievement" : "Save Achievement"
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
