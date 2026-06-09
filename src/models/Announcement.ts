import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      default: "Admission for 2026 has started, apply now!",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

if (mongoose.models.Announcement) {
  delete mongoose.models.Announcement;
}

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;
