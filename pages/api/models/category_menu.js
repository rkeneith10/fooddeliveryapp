import mongoose from "mongoose";

const schemaCategory = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

const category_menu = mongoose.model("category_menu", schemaCategory);
export default category_menu;
