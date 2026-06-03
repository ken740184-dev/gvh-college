import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const newsItems = [
  {
    id: 1,
    title: "Admissions Open for Academic Year 2026-27",
    date: "June 1, 2026",
    category: "Admissions",
    excerpt: "We are now accepting applications for all undergraduate programs. Apply online before the deadline.",
    image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg"
  },
  {
    id: 2,
    title: "Examination Schedule Released for Even Semesters",
    date: "May 28, 2026",
    category: "Academics",
    excerpt: "The final examination schedule for B.Com and B.A. programs has been published. Please check the portal.",
    image: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png"
  },
  {
    id: 3,
    title: "Annual Cultural Fest 'Euphoria 2026' Concludes",
    date: "May 15, 2026",
    category: "Events",
    excerpt: "A spectacular three-day event filled with music, dance, and art competitions came to a grand close yesterday.",
    image: "/images/chatgpt-image.png"
  }
];

export default function NewsPage() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading title="Latest Updates" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <article key={news.id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-56 bg-gray-100">
                <Image src={news.image} alt={news.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {news.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <time className="text-sm text-secondary-text mb-2 block">{news.date}</time>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{news.title}</h3>
                <p className="text-secondary-text mb-6 line-clamp-3 flex-grow">{news.excerpt}</p>
                <Button variant="outline" className="w-full mt-auto">Read Full Article</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

