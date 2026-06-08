"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAchievements } from "@/actions/achievements";

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

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("student");
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getAchievements();
    if (res.success) {
      setAchievements(res.achievements);
    } else {
      console.error("Failed to load achievements:", res.error);
    }
    setIsLoading(false);
  };

  const filteredAchievements = achievements.filter(a => a.category === activeTab);

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Achievements</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Celebrating excellence across academics, sports, and institutional milestones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "student" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Student Achievements
          </button>
          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "faculty" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Faculty Achievements
          </button>
          <button
            onClick={() => setActiveTab("institutional")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "institutional" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Institutional Achievements
          </button>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl">No achievements found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              let bannerIndex = 0;
              return filteredAchievements.map((item) => {
                const currentBannerIndex = item.isBanner ? bannerIndex++ : 0;
                return (
                  <div
                    key={item._id}
                    className={`bg-white border border-border-color rounded-none overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                      item.isBanner
                        ? `md:col-span-2 lg:col-span-3 ${
                            currentBannerIndex % 2 === 1
                              ? "md:flex-row-reverse"
                              : "md:flex-row"
                          }`
                        : ""
                    }`}
                  >
                    <div
                      className={`relative bg-gray-100 shrink-0 ${
                        item.isBanner
                          ? "w-full md:w-1/2 h-[250px] md:h-auto min-h-[300px]"
                          : "w-full aspect-square"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes={
                          item.isBanner
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                      />
                    </div>
                    <div 
                      className={`p-6 flex flex-col justify-center ${
                        item.isBanner 
                          ? `md:w-1/2 md:p-8 border-t-[3px] ${
                              currentBannerIndex % 2 === 1 
                                ? "md:border-r-[3px] md:border-t-0" 
                                : "md:border-l-[3px] md:border-t-0"
                            } border-accent`
                          : "border-t-[3px] border-accent"
                      }`}
                    >
                      <span className="text-sm text-accent font-semibold mb-2 block">{formatDate(item.date)}</span>
                      <h3 className={`font-bold mb-3 ${item.isBanner ? "text-2xl md:text-3xl" : "text-xl"}`}>
                        {item.title}
                      </h3>
                      <p className="text-secondary-text leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
