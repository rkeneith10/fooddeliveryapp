import jwt from "jsonwebtoken";
import Orders from "../models/orders";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  try {
    await connectDB();

    if (req.method === "POST") {
      const {
        restaurant_name,
        price,
        menu_item_name,
        quantity,
        delivery_adress,
      } = req.body;
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ auth: false });
      }

      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const userId = decoded.id;

        const newOrder = new Orders({
          user_id: userId,
          restaurant_name: restaurant_name,
          menu_item_name: menu_item_name,
          quantity: quantity,
          price: price,
          delivery_adress,
        });
        await newOrder.save();

        return res.status(200).json({ success: true, data: newOrder });
      } catch (error) {}
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
