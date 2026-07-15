"use client";

import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";

interface TranslateButtonProps {
  /** The English source text to translate */
  sourceText: string;
  /** Called with the Kannada translation when done */
  onTranslated: (kannada: string) => void;
  className?: string;
}

/**
 * A small button that calls /api/translate to translate English → Kannada via Gemini.
 * Shows an inline spinner while loading; shows an error toast if it fails.
 */
export default function TranslateButton({
  sourceText,
  onTranslated,
  className = "",
}: TranslateButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!sourceText?.trim()) {
      setError("Type some English text first.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, targetLang: "Kannada" }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Translation failed");

      onTranslated(data.translated);
    } catch (err: any) {
      setError(err.message || "Translation failed. Try again.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={`inline-flex flex-col items-end gap-1 ${className}`}>
      <button
        type="button"
        onClick={handleTranslate}
        disabled={isTranslating}
        title="Auto-translate to Kannada using Gemini AI"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider
          bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 hover:border-violet-400
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
      >
        {isTranslating ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Languages className="w-3.5 h-3.5" />
        )}
        {isTranslating ? "Translating…" : "ಕನ್ನಡಕ್ಕೆ ಭಾಷಾಂತರಿಸಿ"}
      </button>

      {error && (
        <span className="text-[10px] text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
