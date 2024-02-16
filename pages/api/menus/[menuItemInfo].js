import { isValidObjectId } from "mongoose";
import menu_item from "../models/menu_items";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    try {
      const { menuItemId } = req.query;
      if (!menuItemId || !isValidObjectId(menuItemId)) {
        return res.status(400).json({ error: "Invalid menuItem ID" });
      }

      const detailMenuItem = await menu_item.findOne({ _id: menuItemId });
      if (!detailMenuItem) {
        return res.status(404).json({ error: "Post not found" });
      }
      const responseData = {
        menuItemId: detailMenuItem._id,
        restaurant_name: detailMenuItem.restaurant_name,
        item_name: detailMenuItem.item_name,
        category: detailMenuItem.category,
        imageUrl: detailMenuItem.imageUrl,
        price: detailMenuItem.price,

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
