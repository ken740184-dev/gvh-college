import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Please provide the image URL"],
    },
    publicId: {
      type: String,
      required: [true, "Please provide the Cloudinary public ID for deletion"],
    },
    title: {
      type: String,
      required: false,
    },
    layout: {
      type: String,
      enum: ["default", "large-left", "small-top-right", "small-bottom-right", "wide-bottom"],
      default: "default",
    },
    category: {
      type: String,
      enum: ["Campus", "Academic", "Sports", "Events"],
      default: "Campus",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional for now, to make it easier to test
    },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
