"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getNews } from "@/actions/news";

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

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    const res = await getNews();
    if (res.success) {
      setNewsItems(res.news);
    } else {
      console.error("Failed to load news:", res.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">News & Announcements</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest happenings, academic notices, and upcoming events at GVH College.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[50vh]">
        <SectionHeading title="Latest Updates" />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl">No news articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article key={news._id} className="bg-white border border-border-color rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1">
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {news.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <time className="text-sm text-secondary-text mb-2 block font-medium">{formatDate(news.date)}</time>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">{news.title}</h3>
                  <p className="text-secondary-text mb-6 line-clamp-3 flex-grow leading-relaxed">{news.excerpt}</p>

                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
