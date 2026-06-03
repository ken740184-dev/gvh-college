interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 
        className={`text-3xl md:text-4xl font-bold mb-4 font-sans ${
          light ? "text-white" : "text-primary-text"
        }`}
      >
        {title}
      </h2>
      <div className={`w-16 h-1 bg-accent mb-6 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
          light ? "text-gray-300" : "text-secondary-text"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
