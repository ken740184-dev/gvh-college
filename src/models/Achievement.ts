import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['student', 'faculty', 'institutional'],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
  },
  isBanner: {
    type: Boolean,
    default: false,
  },
  layoutSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'small',
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

if (mongoose.models.Achievement) {
  delete mongoose.models.Achievement;
}
const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
