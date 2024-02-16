import { isValidObjectId } from "mongoose";
import menuItems from "../models/menu_items";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  // Connect to the database
  await connectDB();
  if (req.method === "GET") {
    try {
      const { menuItemId } = req.query;
      if (!menuItemId || !isValidObjectId(menuItemId)) {
        return res.status(400).json({ error: "Invalid menuItem ID" });
      }

      const detailmenuItem = await menuItems.findOne({ _id: menuItemId });
      if (!detailmenuItem) {
        return res.status(404).json({ error: "Post not found" });
      }
      const responseData = {
        menuItemId: detailmenuItem._id,
        restaurant_name: detailmenuItem.restaurant_name,
        item_name: detailmenuItem.item_name,
        category: detailmenuItem.category,
        price: detailmenuItem.price,
        imageUrl: detailmenuItem.imageUrl,

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
