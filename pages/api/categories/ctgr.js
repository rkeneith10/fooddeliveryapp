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
      const menuByCategory = await menu_items.find({ category: "Sandwiches" });
      if (!menuByCategory) {
        res.status(400).json({ error: "No item found" });
      }
      const responseData = {
        menuItemId: menuByCategory._id,
        item_name: menuByCategory.item_name,
        imageUrl: menuByCategory.imageUrl,
        price: menuByCategory.price,
        restaurant_name: menuByCategory.restaurant_name,
      };
      return res.status(200).json({ all: responseData });
    } catch (error) {
      console.error(error);

      // Return an error response
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
export default handler;
