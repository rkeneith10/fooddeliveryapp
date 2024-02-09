import mongoose from "mongoose";

const schemaRestaurant = new mongoose.Schema({
  restaurant_name: {
    type: String,
  },
  adress: {
    type: String,
  },
  telephone: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  menus: {
    type: [{}],
  },
});

const restaurants = mongoose.model("restaurants", schemaRestaurant);
export default restaurants;
