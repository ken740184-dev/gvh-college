"use client";

import { useState, useEffect, useRef } from "react";
import MobileHeader from "@/components/admin/MobileHeader";
import { getFaculty, addFaculty, updateFaculty, deleteFaculty } from "@/actions/faculty";
import { compressImage } from "@/lib/imageCompression";
import { Plus, Trash2, Edit, X, Upload } from "lucide-react";

export default function FacultyAdminPage() {
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setIsLoading(true);
    const res = await getFaculty();
    if (res.success) {
      setFacultyList(res.faculty);
    } else {
      alert("Failed to load faculty: " + res.error);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDesignation("");
    setQualification("");
    setExperience("");
    setSpecialization("");
    setImageFile(null);
    setPreviewUrl(null);
    setIsModalOpen(false);
  };

  const handleOpenEdit = (faculty: any) => {
    setEditingId(faculty._id);
    setName(faculty.name);
    setDesignation(faculty.designation);
    setQualification(faculty.qualification);
    setExperience(faculty.experience);
    setSpecialization(faculty.specialization);
    setImageFile(null);
    setPreviewUrl(faculty.image);
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const compressedFile = await compressImage(file);
       setImageFile(compressedFile);
       const url = URL.createObjectURL(compressedFile);
       setPreviewUrl(url);
     }
   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation) {
      alert("Name and Designation are required.");
      return;
    }
    if (!editingId && !imageFile) {
      alert("An image is required for new faculty members.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("qualification", qualification);
    formData.append("experience", experience);
    formData.append("specialization", specialization);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    let res;
    if (editingId) {
      res = await updateFaculty(editingId, formData);
    } else {
      res = await addFaculty(formData);
    }

    if (res.success) {
      resetForm();
      fetchFaculty();
    } else {
      alert("Failed to save faculty: " + res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;
    
    const res = await deleteFaculty(id);
    if (res.success) {
      fetchFaculty();
    } else {
      alert("Failed to delete: " + res.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0 relative">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Faculty Roster</h1>
          <p className="text-gray-600">Manage the college teaching staff and administration.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> Add Faculty Member
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
        </div>
      ) : facultyList.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No faculty members found</h3>
          <p className="text-gray-500 mb-6">Start by adding your first faculty member to the roster.</p>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Add Faculty
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyList.map((faculty) => (
            <div key={faculty._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">
                  <button 
                    onClick={() => handleOpenEdit(faculty)}
                    className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
                    title="Edit Faculty"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(faculty._id)}
                    className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                    title="Delete Faculty"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-blue-700 font-semibold text-sm mb-4">{faculty.designation}</p>
                
                <div className="space-y-2 text-sm text-gray-600 flex-1">
                  {faculty.qualification && (
                    <div className="flex gap-2">
                      <span className="font-semibold text-gray-900 w-24 shrink-0">Qual:</span>
                      <span className="truncate" title={faculty.qualification}>{faculty.qualification}</span>
                    </div>
                  )}
                  {faculty.experience && (
                    <div className="flex gap-2">
                      <span className="font-semibold text-gray-900 w-24 shrink-0">Exp:</span>
                      <span className="truncate" title={faculty.experience}>{faculty.experience}</span>
                    </div>
                  )}
                  {faculty.specialization && (
                    <div className="flex gap-2">
                      <span className="font-semibold text-gray-900 w-24 shrink-0">Spec:</span>
                      <span className="truncate" title={faculty.specialization}>{faculty.specialization}</span>
                    </div>
                  )}
                </div>
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
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Faculty" : "Add Faculty"}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo *</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-48 w-full md:w-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${previewUrl ? 'border-blue-500' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">Change Photo</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-gray-500 font-medium text-sm">Upload Photo</span>
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

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. Dr. Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Designation *</label>
                  <input 
                    type="text" 
                    value={designation} 
                    onChange={e => setDesignation(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. Professor of Computer Science"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
                  <input 
                    type="text" 
                    value={qualification} 
                    onChange={e => setQualification(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. Ph.D. in Machine Learning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
                  <input 
                    type="text" 
                    value={experience} 
                    onChange={e => setExperience(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. 15 Years"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                  <input 
                    type="text" 
                    value={specialization} 
                    onChange={e => setSpecialization(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="e.g. Artificial Intelligence, Data Science"
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
                    <>{editingId ? "Save Changes" : "Publish Faculty"}</>
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
