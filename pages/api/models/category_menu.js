import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  category: { type: String, require: true },

  imageUrl: { type: String, require: true },
  cloudinary_id: {
    type: String,
  },
});

const categories =
  mongoose.models.categories || mongoose.model("categories", categorySchema);
export default categories;
