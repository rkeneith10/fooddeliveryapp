import multer from "multer";
import menu_item from "../models/menu_items";
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

    const { item_name, restaurant_name, description, price, category } =
      req.body;

    const result = await cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "auto", folder: "FoodApp" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({
              msg: "Not uploading to cloudinary",
            });
          }
          const newMenuItem = new menu_item({
            restaurant_name: restaurant_name,
            item_name: item_name,
            category: category,
            description: description,
            price: price,
            imageUrl: result.secure_url,
            cloudinary_id: result.public_id,
          });

          await newMenuItem.save();
          const filter = { restaurant_name: restaurant_name };
          const update = { $push: { menus: newMenuItem } };
          await restaurants.updateOne(filter, update);

          res.status(200).json({
            msg: "Upload to cloudinary && save to mongoDB",
            data: newMenuItem,
          });
        }
      )
      .end(req.file.buffer);
  } else if (req.method === "GET") {
    const response = await menu_item.find({});
    if (response) {
      res.status(200).json({ data: response });
    }
  }
};
export default handler;
