"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function ApplyPage() {
  const { t } = useLanguage();
  const steps = [
    t("apply.step_personal"),
    t("apply.step_academic"),
    t("apply.step_program"),
    t("apply.step_review")
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock form state
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
    lastSchool: "", percentage: "", yearOfPassing: "",
    program: ""
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-xl shadow-lg border border-border-color text-center max-w-lg w-full">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-sans font-bold mb-4">{t("apply.success_title")}</h2>
          <p className="text-secondary-text mb-8">
            {t("apply.success_desc1")}{formData.firstName}{t("apply.success_desc2")}{formData.program === 'B.Com' ? t("dept.bcom_title") : formData.program === 'B.A.' ? t("dept.ba_title") : formData.program}{t("apply.success_desc3")}
          </p>
          <Button onClick={() => window.location.href = "/"}>{t("apply.return_home")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <div className="bg-navbar py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-sans font-bold">{t("apply.portal_title")}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-accent z-0 transition-all duration-300" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((label, idx) => {
              const stepNumber = idx + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div key={label} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                    isActive ? "bg-white border-accent text-accent" : 
                    isCompleted ? "bg-accent border-accent text-white" : "bg-white border-gray-300 text-gray-400"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
                  </div>
                  <span className={`absolute top-12 text-xs font-medium whitespace-nowrap ${
                    isActive || isCompleted ? "text-primary-text" : "text-gray-400"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-border-color mt-16">
          <form onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {/* Step 1: Personal */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-sans font-bold mb-6 border-b pb-4">{t("apply.personal_details")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.first_name")}</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-md" 
                      value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.last_name")}</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-md"
                      value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.email")}</label>
                    <input required type="email" className="w-full px-4 py-2 border rounded-md"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.phone")}</label>
                    <input required type="tel" className="w-full px-4 py-2 border rounded-md"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-sans font-bold mb-6 border-b pb-4">{t("apply.academic_details")}</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">{t("apply.prev_school")}</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-md"
                    value={formData.lastSchool} onChange={e => setFormData({...formData, lastSchool: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.percentage")}</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-md"
                      value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("apply.passing_year")}</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-md"
                      value={formData.yearOfPassing} onChange={e => setFormData({...formData, yearOfPassing: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Program */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-sans font-bold mb-6 border-b pb-4">{t("apply.select_program")}</h2>
                <div className="space-y-4">
                  <label className={`block border-2 p-4 rounded-lg cursor-pointer transition-colors ${formData.program === 'B.Com' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent'}`}>
                    <input required type="radio" name="program" className="sr-only" 
                      onChange={() => setFormData({...formData, program: "B.Com"})} 
                      checked={formData.program === 'B.Com'} />
                    <span className="font-bold block text-lg">{t("dept.bcom_title")}</span>
                    <span className="text-sm text-secondary-text">{t("apply.bcom_desc")}</span>
                  </label>
                  <label className={`block border-2 p-4 rounded-lg cursor-pointer transition-colors ${formData.program === 'B.A.' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent'}`}>
                    <input required type="radio" name="program" className="sr-only" 
                      onChange={() => setFormData({...formData, program: "B.A."})}
                      checked={formData.program === 'B.A.'} />
                    <span className="font-bold block text-lg">{t("dept.ba_title")}</span>
                    <span className="text-sm text-secondary-text">{t("apply.ba_desc")}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-sans font-bold mb-6 border-b pb-4">{t("apply.review_title")}</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <span className="font-medium text-gray-500">{t("apply.rev_name")}:</span>
                    <span className="col-span-2 font-semibold">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <span className="font-medium text-gray-500">{t("apply.rev_contact")}:</span>
                    <span className="col-span-2 font-semibold">{formData.email} <br/> {formData.phone}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b pb-4">
                    <span className="font-medium text-gray-500">{t("apply.rev_academics")}:</span>
                    <span className="col-span-2 font-semibold">{formData.percentage} (Passed {formData.yearOfPassing}) <br/> {formData.lastSchool}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="font-medium text-gray-500">{t("apply.rev_program")}:</span>
                    <span className="col-span-2 font-bold text-accent">
                      {formData.program === 'B.Com' ? t("dept.bcom_title") : formData.program === 'B.A.' ? t("dept.ba_title") : (formData.program || "Not selected")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic text-center">
                  {t("apply.confirm_text")}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 1 || isSubmitting}>
                <ChevronLeft className="w-4 h-4 mr-2" /> {t("apply.back")}
              </Button>
              
              {currentStep < 4 ? (
                <Button type="submit">
                  {t("apply.next")} <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t("apply.submitting") : t("apply.submit")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
