interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  /** Render a small gold decorative rule above the title */
  accent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
  accent = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {accent && (
        <div className={`flex items-center gap-2 mb-4 ${centered ? "justify-center" : ""}`}>
          <span className="block w-6 h-px bg-gold" />
          <span className="block w-3 h-px bg-gold opacity-50" />
        </div>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-3 font-sans ${
          light ? "text-white" : "text-primary-text"
        }`}
      >
        {title}
      </h2>
      {/* Gold accent underline */}
      <div className={`w-10 h-[3px] bg-gold mb-6 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`text-lg max-w-2xl font-serif italic ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-secondary-text"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
