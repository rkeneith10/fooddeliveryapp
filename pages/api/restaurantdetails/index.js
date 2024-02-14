import { ObjectId } from "mongodb";
import restaurants from "../models/restaurants";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  // Connect to the database
  await connectDB();

  // Check for GET method
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the restaurant ID from the query parameters
  const { restaurantId } = req.query;

  // Validate the restaurant ID
  if (!restaurantId || !ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ message: "Invalid restaurant ID" });
  }

  try {
    // Find the restaurant details by ID
    const restaurantDetails = await restaurants.findOne({
      _id: ObjectId(restaurantId),
    });

    // Check if the restaurant exists
    if (!restaurantDetails) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Return the restaurant details
    return res.status(200).json({
      success: true,
      restaurantDetails: {
        // Add the restaurantDetails key
        restaurant: restaurantDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
