import menu_items from "../models/menu_items";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    try {
      const { menuCategory } = req.query;

      if (!menuCategory) {
        return res.status(400).json({ error: "Error category" });
      }

      const menuByCategory = await menu_items.find({ category: menuCategory });

      if (!menuByCategory || menuByCategory.length === 0) {
        return res.status(400).json({ error: "No items found" });
      }

      const responseData = menuByCategory.map((menuItem) => ({
        menuItemId: menuItem._id,
        item_name: menuItem.item_name,
        imageUrl: menuItem.imageUrl,
        price: menuItem.price,
        restaurant_name: menuItem.restaurant_name,
      }));

      return res.status(200).json({ all: responseData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default handler;
