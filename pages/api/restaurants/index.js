import multer from "multer";
import restaurants from "../models/restaurants";
import cloudinary from "../utils/cloudinaryConfig";
import connectDB from "../utils/database";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 },
}).single("media");

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({
        error: "No file found",
      });
    }
    const { restaurant_name, adress, telephone } = req.body;
    const restaurantExist = await restaurants.findOne({ restaurant_name });

    if (!restaurantExist) {
      const result = await cloudinary.v2.uploader
        .upload_stream(
          { resource_type: "auto", folder: "FoodApp" },
          async (error, result) => {
            if (error) {
              return res.status(500).json({
                msg: "Not uploading to cloudinary",
              });
            }

            const newrestaurants = new restaurants({
              restaurant_name: restaurant_name,
              adress: adress,
              telephone: telephone,
              imageUrl: result.secure_url,
              cloudinary_id: result.public_id,
            });

            await newrestaurants.save();

            res.status(200).json({
              msg: "Upload to cloudinary && save to mongoDB",
              data: newrestaurants,
            });
          }
        )
        .end(req.file.buffer);
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
