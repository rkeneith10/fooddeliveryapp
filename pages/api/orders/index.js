import Orders from "../models/orders";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  try {
    await connectDB();

    if (req.method === "POST") {
      const { restaurant_name, price, menu_item_name, quantite } = req.body;

      const newOrder = new Orders({
        restaurant_name: restaurant_name,
        menu_item_name: menu_item_name,
        quantite: quantite,
        delivery_adress: req.body.adress,
        price: price,
      });
      await newOrder.save();

      return res.status(200).json({ success: true, data: newOrder });
    } else {
      // Handle unsupported HTTP methods
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    // Handle database connection errors
    console.error("Database connection error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default handler;
