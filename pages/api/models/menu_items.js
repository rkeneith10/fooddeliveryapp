import mongoose from "mongoose";

const schemaMenu_item = new mongoose.Schema({
  restaurant_name: String,
  item_name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
  },
  imageURL: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const menu_items =
  mongoose.models.menu_items || mongoose.model("menu_items", schemaMenu_item);
export default menu_items;
