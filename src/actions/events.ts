"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/models/Event";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function getEvents(category?: string) {
  try {
    await connectToDatabase();
    const query = category && category !== "All" ? { category } : {};
    const eventsList = await Event.find(query).sort({ date: -1, createdAt: -1 }).lean();
    return { success: true, events: JSON.parse(JSON.stringify(eventsList)) };
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return { success: false, error: error.message };
  }
}

export async function addEvent(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("images") as File[];

    if (!title || !date || !category || !description) {
      throw new Error("Title, date, category, and description are required.");
    }

    const uploadedImages = [];

    // Process each image file
    for (const file of files) {
      if (file.size === 0) continue;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-events",
      });

      uploadedImages.push({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      });
    }

    await connectToDatabase();
    const count = await Event.countDocuments();
    const newEvent = await Event.create({
      title,
      date,
      category,
      description,
      images: uploadedImages,
      uploadedBy: (session.user as any).id,
      order: count,
    });

    revalidatePath("/events");

    return { success: true, event: JSON.parse(JSON.stringify(newEvent)) };
  } catch (error: any) {
    console.error("Add event error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEvent(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const keptImagesStr = formData.get("keptImages") as string; // JSON array of kept images { url, publicId }
    const files = formData.getAll("images") as File[];

    if (!title || !date || !category || !description) {
      throw new Error("Title, date, category, and description are required.");
    }

    await connectToDatabase();
    const existingEvent = await Event.findById(id);
    if (!existingEvent) throw new Error("Event not found");

    const keptImages = keptImagesStr ? JSON.parse(keptImagesStr) : [];
    const keptPublicIds = new Set(keptImages.map((img: any) => img.publicId));

    // Destroy removed images from Cloudinary
    for (const img of existingEvent.images) {
      if (img.publicId && !keptPublicIds.has(img.publicId)) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    const finalImages = [...keptImages];

    // Upload new files
    for (const file of files) {
      if (file.size === 0) continue;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-events",
      });

      finalImages.push({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      });
    }

    existingEvent.title = title;
    existingEvent.date = date;
    existingEvent.category = category;
    existingEvent.description = description;
    existingEvent.images = finalImages as any;

    await existingEvent.save();

    revalidatePath("/events");

    return { success: true, event: JSON.parse(JSON.stringify(existingEvent)) };
  } catch (error: any) {
    console.error("Update event error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();
    const event = await Event.findById(id);
    if (!event) throw new Error("Event not found");

    // Destroy all images on Cloudinary
    for (const img of event.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await Event.findByIdAndDelete(id);

    revalidatePath("/events");

    return { success: true };
  } catch (error: any) {
    console.error("Delete event error:", error);
    return { success: false, error: error.message };
  }
}
