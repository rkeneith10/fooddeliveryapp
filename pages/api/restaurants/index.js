import restaurants from "../models/restaurants";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const restaurantExist = await restaurants.findOne({ restaurant_name });

    if (!restaurantExist) {
      const newrestaurants = new restaurants({
        restaurant_name: restaurant_name,
        adress: adress,
        telephone: telephone,
      });

      await newrestaurants.save();

      res.status(200).json({
        success: true,
        data: newrestaurants,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Restaurant already exist",
      });
    }
  } else if (req.method === "GET") {
    try {
      const allrestaurants = await restaurants.find({}).sort({ _id: -1 });

      if (!allrestaurants || allrestaurants.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Data non trouvé",
        });
      }

      res.status(200).json({
        success: true,
        all: allrestaurants,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Erreur interne du serveur" });
    }
  }
};
export default handler;
