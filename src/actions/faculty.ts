"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Faculty from "@/models/Faculty";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function getFaculty() {
  try {
    await connectToDatabase();
    // Return all faculty, sorted newest first
    const faculty = await Faculty.find().sort({ createdAt: -1 }).lean();
    return { success: true, faculty: JSON.parse(JSON.stringify(faculty)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addFaculty(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const qualification = formData.get("qualification") as string;
    const experience = (formData.get("experience") as string) || "";
    const specialization = (formData.get("specialization") as string) || "";
    const file = formData.get("image") as File;

    if (!name || !designation || !file) {
      throw new Error("Name, designation, and image are required.");
    }

    // Convert file to base64 buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "gvh-college-faculty",
    });

    await connectToDatabase();
    const newFaculty = await Faculty.create({
      name,
      designation,
      qualification,
      experience,
      specialization,
      image: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
    });

    revalidatePath("/faculty");

    return { success: true, faculty: JSON.parse(JSON.stringify(newFaculty)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateFaculty(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const qualification = formData.get("qualification") as string;
    const experience = (formData.get("experience") as string) || "";
    const specialization = (formData.get("specialization") as string) || "";
    const file = formData.get("image") as File | null;

    await connectToDatabase();
    const existingFaculty = await Faculty.findById(id);
    if (!existingFaculty) throw new Error("Faculty member not found");

    const updateData: any = {
      name,
      designation,
      qualification,
      experience,
      specialization,
    };

    if (file && file.size > 0) {
      // User uploaded a new image, delete the old one
      if (existingFaculty.imagePublicId) {
        await cloudinary.uploader.destroy(existingFaculty.imagePublicId);
      }

      // Upload new image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-faculty",
      });

      updateData.image = uploadResponse.secure_url;
      updateData.imagePublicId = uploadResponse.public_id;
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true }).lean();

    revalidatePath("/faculty");

    return { success: true, faculty: JSON.parse(JSON.stringify(updatedFaculty)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFaculty(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();
    const faculty = await Faculty.findById(id);
    if (!faculty) throw new Error("Faculty member not found");

    if (faculty.imagePublicId) {
      await cloudinary.uploader.destroy(faculty.imagePublicId);
    }

    await Faculty.findByIdAndDelete(id);

    revalidatePath("/faculty");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
