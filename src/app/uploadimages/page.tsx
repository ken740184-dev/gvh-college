"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileImage, X, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function UploadImagesPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("Campus");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
      setUploadSuccess(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadSuccess(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadSuccess(true);
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <div className="bg-navbar py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Media Management</h1>
          <p className="text-lg text-gray-300">Upload images to the college gallery.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-border-color">
          
          {uploadSuccess ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
              <p className="text-secondary-text mb-8">The image has been securely added to the {category} category.</p>
              <Button onClick={clearSelection}>Upload Another Image</Button>
            </div>
          ) : (
            <>
              <SectionHeading title="Upload New Image" />
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary-text mb-2">Select Category</label>
                <select 
                  className="w-full md:w-1/2 px-4 py-2 border border-border-color rounded-md focus:ring-accent focus:border-accent"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isUploading}
                >
                  <option value="Campus">Campus</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              {!selectedFile ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                    dragActive ? "border-accent bg-accent/5" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                >
                  <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
                  <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-primary-text mb-1">Drag & drop your image here</p>
                  <p className="text-sm text-secondary-text">or click to browse files (JPEG, PNG, WebP)</p>
                </div>
              ) : (
                <div className="border border-border-color rounded-xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <FileImage className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-text truncate max-w-[200px] sm:max-w-xs">{selectedFile.name}</p>
                        <p className="text-sm text-secondary-text">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!isUploading && (
                      <button onClick={clearSelection} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {previewUrl && (
                    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 bg-black/5">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  )}

                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-primary-text">Uploading...</span>
                        <span className="text-accent">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleUpload} className="w-full sm:w-auto">
                        Upload to {category}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
