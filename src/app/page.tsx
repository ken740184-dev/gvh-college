import HomeClient from "@/components/home/HomeClient";
import { getAnnouncement } from "@/actions/announcements";
import { getNews } from "@/actions/news";
import { getEvents } from "@/actions/events";
import { getAchievements } from "@/actions/achievements";
import connectToDatabase from "@/lib/mongodb";
import GalleryBlock from "@/models/GalleryBlock";

export const revalidate = 60;

export default async function Home() {
  await connectToDatabase();
  const [announcementRes, newsRes, eventsRes, achievementsRes, allGalleryBlocks] = await Promise.all([
    getAnnouncement(),
    getNews(),
    getEvents(),
    getAchievements(),
    GalleryBlock.find().lean()
  ]);

  const announcement = announcementRes.success ? announcementRes.announcement : null;
  const news = newsRes.success ? newsRes.news : [];
  const events = eventsRes.success ? eventsRes.events : [];
  const achievements = achievementsRes.success ? achievementsRes.achievements : [];

  // Extract the first image from each gallery block to avoid multi-image layouts dominating the grid
  let allImages: any[] = [];
  allGalleryBlocks.forEach((block: any) => {
    if (block.images && Array.isArray(block.images) && block.images.length > 0) {
      const img = block.images[0];
      if (img) {
        allImages.push({
          url: img.url,
          title: img.title || block.title || "",
          createdAt: block.createdAt || new Date(0)
        });
      }
    }
  });

  // Sort by creation date descending (newest first)
  allImages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const campusLifeImages = JSON.parse(JSON.stringify(allImages.slice(0, 4)));

  return (
    <HomeClient 
      announcement={announcement} 
      news={news}
      events={events}
      achievements={achievements}
      campusLifeImages={campusLifeImages}
    />
  );
}
