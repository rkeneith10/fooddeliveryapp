import { isValidObjectId } from "mongoose";
import menu_item from "../models/menu_items";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  // Connect to the database
  await connectDB();

  // Handle GET requests
  if (req.method === "GET") {
    try {
      // Get the menu item ID from the query
      const { menuItemId } = req.query;

      // Validate the ID
      if (!menuItemId || !isValidObjectId(menuItemId)) {
        return res.status(400).json({ error: "Invalid menu item ID" });
      }

      // Find the menu item in the database
      const detailMenuItem = await menu_item.findOne({ _id: menuItemId });

      // Check if the menu item was found
      if (!detailMenuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }

      // Construct the response data
      const responseData = {
        menuItemId: detailMenuItem._id,
        restaurant_name: detailMenuItem.restaurant_name,
        item_name: detailMenuItem.item_name,
        category: detailMenuItem.category,
        imageUrl: detailMenuItem.imageUrl,
        price: detailMenuItem.price,
        // Add additional fields as needed
      };

      // Return the response
      return res.status(200).json(responseData);
    } catch (error) {
      // Log the error for debugging
      console.error(error);

      // Return an error response
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle other methods (optional)
  }
};

export default handler;
