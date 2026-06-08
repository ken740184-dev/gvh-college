"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import News from "@/models/News";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

const sampleNews = [
  {
    title: "Admissions Open for Academic Year 2026-27",
    date: "June 1, 2026",
    category: "Admissions",
    excerpt: "We are now accepting applications for all undergraduate programs. Apply online before the deadline.",
    image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.webp"
  },
  {
    title: "Examination Schedule Released for Even Semesters",
    date: "May 28, 2026",
    category: "Academics",
    excerpt: "The final examination schedule for B.Com and B.A. programs has been published. Please check the portal.",
    image: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.webp"
  },
  {
    title: "Annual Cultural Fest 'Euphoria 2026' Concludes",
    date: "May 15, 2026",
    category: "Events",
    excerpt: "A spectacular three-day event filled with music, dance, and art competitions came to a grand close yesterday.",
    image: "/images/chatgpt-image.webp"
  }
];

export async function getNews() {
  try {
    await connectToDatabase();
    let newsList = await News.find().sort({ order: 1, createdAt: -1 }).lean();

    // Seed if empty
    if (newsList.length === 0) {
      await News.insertMany(sampleNews.map((item, index) => ({ ...item, order: index })));
      newsList = await News.find().sort({ order: 1, createdAt: -1 }).lean();
    }

    return { success: true, news: JSON.parse(JSON.stringify(newsList)) };
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return { success: false, error: error.message };
  }
}

export async function addNews(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const file = formData.get("image") as File;

    if (!title || !date || !category || !excerpt || !file) {
      throw new Error("All fields including an image are required.");
    }

    // Convert file to base64 buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "gvh-college-news",
    });

    await connectToDatabase();
    const count = await News.countDocuments();
    const newNews = await News.create({
      title,
      date,
      category,
      excerpt,
      image: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
      order: count,
    });

    return { success: true, news: JSON.parse(JSON.stringify(newNews)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateNews(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const file = formData.get("image") as File | null;

    await connectToDatabase();
    const existingNews = await News.findById(id);
    if (!existingNews) throw new Error("News item not found");

    const updateData: any = {
      title,
      date,
      category,
      excerpt,
    };

    if (file && file.size > 0) {
      if (existingNews.imagePublicId) {
        await cloudinary.uploader.destroy(existingNews.imagePublicId);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-news",
      });

      updateData.image = uploadResponse.secure_url;
      updateData.imagePublicId = uploadResponse.public_id;
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true }).lean();

    return { success: true, news: JSON.parse(JSON.stringify(updatedNews)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteNews(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();
    const newsItem = await News.findById(id);
    if (!newsItem) throw new Error("News item not found");

    if (newsItem.imagePublicId) {
      await cloudinary.uploader.destroy(newsItem.imagePublicId);
    }

    await News.findByIdAndDelete(id);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
