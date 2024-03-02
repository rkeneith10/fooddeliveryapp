import jwt from "jsonwebtoken";
import Orders from "../models/orders";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ auth: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;
      const allOrders = await Orders.find({ user_id: userId });
      if (allOrders && allOrders.length > 0) {
        res.status(200).json({
          success: true,
          all: allOrders,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No order found",
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
};
export default handler;
