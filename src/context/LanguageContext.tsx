"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by only reading localStorage on client mount
    const stored = localStorage.getItem("gvh_lang");
    if (stored === "en" || stored === "kn") {
      setLanguageState(stored as Language);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("gvh_lang", lang);
  };

  const t = (key: string): string => {
    // Return translation if found, otherwise return the key or the English translation as fallback
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    
    const fallbackDict = translations["en"];
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
