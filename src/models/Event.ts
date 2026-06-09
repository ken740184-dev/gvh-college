import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String, // Stored as YYYY-MM-DD string
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "Cultural",
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
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

if (mongoose.models.Event) {
  delete mongoose.models.Event;
}

const Event = mongoose.model("Event", EventSchema);

export default Event;
