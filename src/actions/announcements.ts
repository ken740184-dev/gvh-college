"use server";

import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function getAnnouncement() {
  try {
    await connectToDatabase();
    let announcement = await Announcement.findOne().lean();
    
    // If no announcement configuration exists, create a default one
    if (!announcement) {
      const count = await Announcement.countDocuments();
      if (count === 0) {
        const defaultDoc = await Announcement.create({
          text: "Welcome to Gudleppa Hallikeri College! Admissions for the academic year 2026 are now open. Apply today!",
          isActive: true,
          popupActive: false,
          popupTitle: "",
          popupImageUrl: "",
          popupImagePublicId: "",
          popupLink: "",
          marqueeButtonText: "Apply Now",
          marqueeButtonLink: "/admissions/apply",
        });
        announcement = defaultDoc.toObject();
      }
    } else {
      // Ensure default values are populated on older DB records
      announcement = {
        ...announcement,
        popupActive: (announcement as any).popupActive ?? false,
        popupTitle: (announcement as any).popupTitle ?? "",
        popupImageUrl: (announcement as any).popupImageUrl ?? "",
        popupImagePublicId: (announcement as any).popupImagePublicId ?? "",
        popupLink: (announcement as any).popupLink ?? "",
        marqueeButtonText: (announcement as any).marqueeButtonText ?? "Apply Now",
        marqueeButtonLink: (announcement as any).marqueeButtonLink ?? "/admissions/apply",
      };
    }
    
    return { 
      success: true, 
      announcement: JSON.parse(JSON.stringify(announcement)) 
    };
  } catch (error: any) {
    console.error("Error fetching announcement:", error);
    return { success: false, error: error.message };
  }
}

export async function updateAnnouncement(text: string, isActive: boolean) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    if (!text || !text.trim()) {
      throw new Error("Announcement text cannot be empty.");
    }

    await connectToDatabase();
    
    let announcement = await Announcement.findOne();
    
    if (announcement) {
      announcement.text = text.trim();
      announcement.isActive = isActive;
      announcement.updatedBy = (session.user as any).id;
      await announcement.save();
    } else {
      announcement = await Announcement.create({
        text: text.trim(),
        isActive,
        updatedBy: (session.user as any).id,
      });
    }

    // Force revalidate the homepage cache so the marquee updates instantly
    revalidatePath("/");

    return { 
      success: true, 
      announcement: JSON.parse(JSON.stringify(announcement)) 
    };
  } catch (error: any) {
    console.error("Error updating announcement:", error);
    return { success: false, error: error.message };
  }
}

export async function updateAnnouncementConfig(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const text = formData.get("text") as string;
    const isActive = formData.get("isActive") === "true";
    const popupActive = formData.get("popupActive") === "true";
    const popupTitle = formData.get("popupTitle") as string;
    const popupLink = formData.get("popupLink") as string;
    const marqueeButtonText = formData.get("marqueeButtonText") as string;
    const marqueeButtonLink = formData.get("marqueeButtonLink") as string;
    const deleteImage = formData.get("deleteImage") === "true";

    if (!text || !text.trim()) {
      throw new Error("Marquee announcement text cannot be empty.");
    }

    await connectToDatabase();
    
    let announcement = await Announcement.findOne();
    
    let imageUrl = announcement?.popupImageUrl || "";
    let imagePublicId = announcement?.popupImagePublicId || "";

    // Handle Image deletion
    if (deleteImage && imagePublicId) {
      try {
        await cloudinary.uploader.destroy(imagePublicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
      imageUrl = "";
      imagePublicId = "";
    }

    // Handle new Image upload
    const file = formData.get("popupImage") as File;
    if (file && file.size > 0) {
      // Delete old image if it exists
      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId);
        } catch (err) {
          console.error("Cloudinary deletion of old image failed:", err);
        }
      }

      // Upload new file to Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64DataOnly = buffer.toString("base64");
      const base64Image = `data:${file.type};base64,${base64DataOnly}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-announcements",
      });

      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
    }

    if (announcement) {
      announcement.text = text.trim();
      announcement.isActive = isActive;
      announcement.popupActive = popupActive;
      announcement.popupTitle = (popupTitle || "").trim();
      announcement.popupImageUrl = imageUrl;
      announcement.popupImagePublicId = imagePublicId;
      announcement.popupLink = (popupLink || "").trim();
      (announcement as any).marqueeButtonText = (marqueeButtonText || "Apply Now").trim();
      (announcement as any).marqueeButtonLink = (marqueeButtonLink || "/admissions/apply").trim();
      announcement.updatedBy = (session.user as any).id;
      await announcement.save();
    } else {
      announcement = await Announcement.create({
        text: text.trim(),
        isActive,
        popupActive,
        popupTitle: (popupTitle || "").trim(),
        popupImageUrl: imageUrl,
        popupImagePublicId: imagePublicId,
        popupLink: (popupLink || "").trim(),
        marqueeButtonText: (marqueeButtonText || "Apply Now").trim(),
        marqueeButtonLink: (marqueeButtonLink || "/admissions/apply").trim(),
        updatedBy: (session.user as any).id,
      });
    }

    // Force revalidate the homepage cache so the marquee & popup update instantly
    revalidatePath("/");

    return { 
      success: true, 
      announcement: JSON.parse(JSON.stringify(announcement)) 
    };
  } catch (error: any) {
    console.error("Error updating announcement configuration:", error);
    return { success: false, error: error.message };
  }
}
