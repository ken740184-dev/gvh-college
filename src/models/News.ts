import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
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
  },
  excerpt: {
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
  order: {
    type: Number,
    default: 0,
  },
  isBanner: {
    type: Boolean,
    default: false,
  },
  layoutSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'small',
  }
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;
