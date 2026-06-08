import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      default: "",
    },
    image: {
      type: String, // Cloudinary secure_url
      required: true,
    },
    imagePublicId: {
      type: String, // Cloudinary public_id for deletion
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
