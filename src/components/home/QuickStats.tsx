"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, active]);

  return count;
}

interface StatItemProps {
  value: string;
  label: string;
  index: number;
  active: boolean;
}

function StatItem({ value, label, index, active }: StatItemProps) {
  // Parse numeric part and suffix (e.g. "5000+" → 5000, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const count = useCountUp(numericTarget, 1800 + index * 200, active);

  return (
    <div className="relative flex flex-col items-center text-center px-4 py-6 group">
      {/* Gold divider between items */}
      {index > 0 && (
        <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gold/30" />
      )}
      <div className="text-5xl md:text-6xl font-sans font-bold text-white mb-1 tabular-nums tracking-tight">
        {active ? count : 0}
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-semibold text-white/50 uppercase tracking-[0.18em] mt-1">
        {label}
      </div>
    </div>
  );
}

export default function QuickStats() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const stats = [
    { label: t("stats.years_label"),    value: "25+" },
    { label: t("stats.students_label"), value: "5000+" },
    { label: t("stats.faculty_label"),  value: "150+" },
    { label: t("stats.programs_label"), value: "20+" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-navy-deep border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
