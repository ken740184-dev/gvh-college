"use server";

import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import GalleryBlock from "@/models/GalleryBlock";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

async function fetchImageAsBase64(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return { base64, contentType };
  } catch (error) {
    console.error("Failed to fetch image as base64:", error);
    return null;
  }
}

async function aiGenerateMetadata(base64Data: string, mimeType: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      console.warn("Gemini API key is not configured. Skipping AI metadata generation.");
      return null;
    }

    const promptText = `You are an AI assistant for Gudleppa Hallikeri Arts and Commerce First Grade College (formerly known as GVH PU College) in Hosaritti, Haveri District, Karnataka, India - 581115.
Analyze this image uploaded to the college gallery.
Generate an appropriate title and a short description for this image that is suitable for the college's website.
The title should be concise (2-5 words) and represent what is shown (e.g. "Computer Science Lab", "Students on Campus", "Seminar Hall", "Principal Office").
The description should be 1-2 sentences, positive, and related to the college/student life.
Respond ONLY with a JSON object in the following format:
{
  "title": "Generated Title",
  "description": "Generated description."
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error("Gemini Multimodal API Error:", await response.text());
      return null;
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (textResponse) {
      const parsed = JSON.parse(textResponse.trim());
      return {
        title: parsed.title || "",
        description: parsed.description || ""
      };
    }
  } catch (error) {
    console.error("AI Metadata Generation failed:", error);
  }
  return null;
}

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

    // Keep track of the first image's base64 data for AI auto-fill if needed
    let firstImageBase64 = "";
    let firstImageMimeType = "";

    // Process each file in the formData
    for (const data of slotsData) {
      const file = formData.get(`file_${data.slotIndex}`) as File;
      if (!file) continue;

      // Convert file to base64 buffer for Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64DataOnly = buffer.toString("base64");
      const base64Image = `data:${file.type};base64,${base64DataOnly}`;

      if (!firstImageBase64) {
        firstImageBase64 = base64DataOnly;
        firstImageMimeType = file.type;
      }

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

    // AI Auto-Fill if title or description is missing
    if ((!title.trim() || !description.trim()) && firstImageBase64) {
      const aiResult = await aiGenerateMetadata(firstImageBase64, firstImageMimeType);
      if (aiResult) {
        if (!title.trim()) title = aiResult.title;
        if (!description.trim()) description = aiResult.description;
      }
    }

    // Also, if the uploaded image slots themselves have blank titles, let's fill them using block title
    uploadedImages.forEach((img) => {
      if (!img.title.trim()) {
        img.title = title;
      }
    });

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

    // Keep track of first image data for AI generation
    let firstImageBase64 = "";
    let firstImageMimeType = "";

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

        if (!firstImageBase64) {
          firstImageBase64 = base64DataOnly;
          firstImageMimeType = file.type;
        }

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
          folder: "gvh-college-gallery",
        });

        imageUrl = uploadResponse.secure_url;
        imagePublicId = uploadResponse.public_id;
      } else if (imageUrl && !firstImageBase64) {
        // Fetch existing image as base64 if needed for AI auto-fill
        const fetched = await fetchImageAsBase64(imageUrl);
        if (fetched) {
          firstImageBase64 = fetched.base64;
          firstImageMimeType = fetched.contentType;
        }
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

    // AI Auto-Fill if title or description is missing
    if ((!title.trim() || !description.trim()) && firstImageBase64) {
      const aiResult = await aiGenerateMetadata(firstImageBase64, firstImageMimeType);
      if (aiResult) {
        if (!title.trim()) title = aiResult.title;
        if (!description.trim()) description = aiResult.description;
      }
    }

    // Fill blank slot titles using block title
    finalImages.forEach((img) => {
      if (!img.title.trim()) {
        img.title = title;
      }
    });

    // Update the block in MongoDB
    oldBlock.layoutType = layoutType;
    oldBlock.backgroundColor = backgroundColor;
    oldBlock.category = category || oldBlock.category;
    oldBlock.title = title || "";
    oldBlock.description = description || "";
    oldBlock.images = finalImages;
    await oldBlock.save();

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

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

