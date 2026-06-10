"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import GalleryBlock from "@/models/GalleryBlock";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});



export async function uploadGalleryBlock(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const layoutType = formData.get("layoutType") as string;
    const backgroundColor = formData.get("backgroundColor") as string;
    const category = formData.get("category") as string;
    let title = (formData.get("title") as string) || "";
    let description = (formData.get("description") as string) || "";
    
    // We expect the client to send a JSON string of metadata for each file
    const slotsDataStr = formData.get("slotsData") as string;
    if (!slotsDataStr) throw new Error("No layout data provided");
    
    const slotsData = JSON.parse(slotsDataStr); // Array of { slotIndex, title }
    const uploadedImages = [];

    // Process each file in the formData
    for (const data of slotsData) {
      const file = formData.get(`file_${data.slotIndex}`) as File;
      if (!file) continue;

      // Convert file to base64 buffer for Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64DataOnly = buffer.toString("base64");
      const base64Image = `data:${file.type};base64,${base64DataOnly}`;

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "gvh-college-gallery",
      });

      uploadedImages.push({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
        title: data.title || "",
        category: data.category || "Campus",
        slotIndex: data.slotIndex,
      });
    }

    if (uploadedImages.length === 0) {
      throw new Error("No images were successfully uploaded.");
    }

    // Save the entire block to MongoDB
    await connectToDatabase();
    
    const newBlock = await GalleryBlock.create({
      layoutType,
      backgroundColor,
      category: category || "Campus",
      title: title || "",
      description: description || "",
      images: uploadedImages,
      uploadedBy: (session.user as any).id,
    });

    revalidatePath("/gallery");

    return { success: true, block: JSON.parse(JSON.stringify(newBlock)) };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}

export async function getGalleryBlocks(category?: string) {
  try {
    await connectToDatabase();
    
    const query = category && category !== "All" ? { category } : {};
    const blocks = await GalleryBlock.find(query).sort({ order: 1, createdAt: -1 }).lean();
    
    return { success: true, blocks: JSON.parse(JSON.stringify(blocks)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryBlock(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();
    const block = await GalleryBlock.findById(id);
    if (!block) throw new Error("Block not found");

    // Delete all images in this block from Cloudinary
    for (const image of block.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }

    // Delete the block from MongoDB
    await GalleryBlock.findByIdAndDelete(id);

    revalidatePath("/gallery");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateGalleryBlock(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const layoutType = formData.get("layoutType") as string;
    const backgroundColor = formData.get("backgroundColor") as string;
    const category = formData.get("category") as string;
    let title = (formData.get("title") as string) || "";
    let description = (formData.get("description") as string) || "";
    
    const slotsDataStr = formData.get("slotsData") as string;
    if (!slotsDataStr) throw new Error("No layout data provided");
    
    const slotsData = JSON.parse(slotsDataStr); // Array of { slotIndex, title, category, existingUrl, existingPublicId }
    const finalImages = [];

    await connectToDatabase();
    const oldBlock = await GalleryBlock.findById(id);
    if (!oldBlock) throw new Error("Block not found");

    // Track which old publicIds are being kept
    const keptPublicIds = new Set(slotsData.map((s: any) => s.existingPublicId).filter(Boolean));

    // Process each file in the formData
    for (const data of slotsData) {
      let imageUrl = data.existingUrl;
      let imagePublicId = data.existingPublicId;

      const file = formData.get(`file_${data.slotIndex}`) as File;
      if (file && file.size > 0) {
        // Upload new file to Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64DataOnly = buffer.toString("base64");
        const base64Image = `data:${file.type};base64,${base64DataOnly}`;

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
          folder: "gvh-college-gallery",
        });

        imageUrl = uploadResponse.secure_url;
        imagePublicId = uploadResponse.public_id;
      }

      if (imageUrl && imagePublicId) {
        finalImages.push({
          url: imageUrl,
          publicId: imagePublicId,
          title: data.title || "",
          category: data.category || "Campus",
          slotIndex: data.slotIndex,
        });
      }
    }

    if (finalImages.length === 0) {
      throw new Error("No images were successfully processed.");
    }

    // Delete any old images that were replaced or removed
    for (const oldImage of oldBlock.images) {
      if (oldImage.publicId && !keptPublicIds.has(oldImage.publicId)) {
        await cloudinary.uploader.destroy(oldImage.publicId);
      }
    }

    // Update the block in MongoDB
    oldBlock.layoutType = layoutType;
    oldBlock.backgroundColor = backgroundColor;
    oldBlock.category = category || oldBlock.category;
    oldBlock.title = title || "";
    oldBlock.description = description || "";
    oldBlock.images = finalImages;
    await oldBlock.save();

    revalidatePath("/gallery");

    return { success: true, block: JSON.parse(JSON.stringify(oldBlock)) };
  } catch (error: any) {
    console.error("Update error:", error);
    return { success: false, error: error.message };
  }
}


export async function updateGalleryBlockOrder(orderedIds: string[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    await connectToDatabase();

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));

    await GalleryBlock.bulkWrite(bulkOps);

    revalidatePath("/gallery");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

