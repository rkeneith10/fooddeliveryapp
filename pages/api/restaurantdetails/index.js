import restaurants from "../models/restaurants";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { restaurantId } = req.query;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant paramater",
    });
  }

  try {
    const restaurantDetails = await restaurants.findOne({
      _id: new Object(restaurantId),
    });

    if (!restaurantDetails) {
      return res.status(400).json({
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      success: true,
      all: restaurantDetails,
    });
  } catch (error) {
    console.error("Error fetching restaurant details", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default handler;
