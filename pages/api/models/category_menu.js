import mongoose from "mongoose";

const schemaCategory = new mongoose.Schema({
  category_name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  cloudinary_id: { type: String },
});

const category_menu = mongoose.model("category_menu", schemaCategory);
export default category_menu;
