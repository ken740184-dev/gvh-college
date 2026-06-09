"use server";

import connectToDatabase from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

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
        });
        announcement = defaultDoc.toObject();
      }
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
