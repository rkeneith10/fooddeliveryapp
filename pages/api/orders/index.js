import jwt from "jsonwebtoken";
import Orders from "../models/orders";
import users from "../models/users";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  connectDB();

  if (req.method === "POST") {
    const { restaurant_name, price, menu_item_name, quantite } = req.body;

    const token = await req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await users
      .findOne({
        _id: decoded.id,
      })
      .select("-password");

    const newOrder = new Orders({
      user_id: user._id,
      restaurant_name: restaurant_name,
      menu_item_name: menu_item_name,
      quantite: quantite,
      delivery_adress: user.adress,
      price: price * quantite,
    });
    await newOrder.save();

    res.status(200).json({ success: true, data: newOrder });
  }
};
export default handler;
