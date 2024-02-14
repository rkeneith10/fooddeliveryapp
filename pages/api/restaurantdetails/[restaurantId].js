import { isValidObjectId } from "mongoose";
import restaurants from "../models/restaurants";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  // Connect to the database
  await connectDB();
  if (req.method === "GET") {
    try {
      const { restaurantId } = req.query;
      if (!restaurantId || !isValidObjectId(restaurantId)) {
        return res.status(400).json({ error: "Invalid restaurant ID" });
      }

      const detailRestaurant = await restaurants.findOne({ _id: restaurantId });
      if (!detailRestaurant) {
        return res.status(404).json({ error: "Post not found" });
      }
      const responseData = {
        restaurantId: detailRestaurant._id,
        restaurant_name: detailRestaurant.restaurant_name,
        adress: detailRestaurant.adress,
        telephone: detailRestaurant.telephone,
        imageUrl: detailRestaurant.imageUrl,
        menus: detailRestaurant.menus || [],

        // ... other fields as needed
      };
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error); // Log for debugging
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
