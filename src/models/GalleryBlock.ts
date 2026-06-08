import mongoose from "mongoose";

const GalleryBlockSchema = new mongoose.Schema(
  {
    layoutType: {
      type: String,
      enum: ["single", "duo", "grid-3", "bento-4", "bento-5", "single-card"],
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "bg-white",
    },
    category: {
      type: String,
      default: "Campus",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        title: { type: String, default: "" },
        category: { type: String, default: "" }, // Support for per-photo categorization
        slotIndex: { type: Number, required: true }, // To know exactly which visual box this image goes in
      },
    ],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryBlock || mongoose.model("GalleryBlock", GalleryBlockSchema);
