"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Achievement from "@/models/Achievement";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { studentAchievements, facultyAchievements, institutionalAchievements } from "@/data/achievements";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function getAchievements() {
  try {
    await connectToDatabase();
    let achievements = await Achievement.find().sort({ createdAt: -1 }).lean();

    return { success: true, achievements: JSON.parse(JSON.stringify(achievements)) };
  } catch (error: any) {
    console.error("Error fetching achievements:", error);
    return { success: false, error: error.message };
  }
}

export async function addAchievement(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const layoutSize = (formData.get("layoutSize") as string) || "small";
    const isBanner = layoutSize === "medium" || layoutSize === "large";
    const file = formData.get("image") as File;

    if (!title || !date || !category || !description || !file) {
      throw new Error("All fields including an image are required.");
    }

    // Convert file to base64 buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "gvh-college-achievements",
    });

    await connectToDatabase();
    const count = await Achievement.countDocuments({ category });
    const newAchievement = await Achievement.create({
      title,
      date,
      category,
      description,
      isBanner,
      layoutSize,
      image: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
      order: count,
    });

    revalidatePath("/achievements");

    return { success: true, achievement: JSON.parse(JSON.stringify(newAchievement)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAchievement(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const layoutSize = (formData.get("layoutSize") as string) || "small";
    const isBanner = layoutSize === "medium" || layoutSize === "large";
    const file = formData.get("image") as File | null;

    await connectToDatabase();
    const existingAchievement = await Achievement.findById(id);
    if (!existingAchievement) throw new Error("Achievement not found");

    const updateData: any = {
      title,
      date,
      category,
      description,
      isBanner,
      layoutSize,
    };

    if (file && file.size > 0) {
      if (existingAchievement.imagePublicId) {
        await cloudinary.uploader.destroy(existingAchievement.imagePublicId);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-achievements",
      });

      updateData.image = uploadResponse.secure_url;
      updateData.imagePublicId = uploadResponse.public_id;
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(id, updateData, { new: true }).lean();

    revalidatePath("/achievements");

    return { success: true, achievement: JSON.parse(JSON.stringify(updatedAchievement)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAchievement(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();
    const item = await Achievement.findById(id);
    if (!item) throw new Error("Achievement not found");

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await Achievement.findByIdAndDelete(id);

    revalidatePath("/achievements");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
