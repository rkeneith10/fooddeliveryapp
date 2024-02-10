import multer from "multer";
import category_menu from "../models/category_menu";
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
  await connectDB();
  if (req.method === "POST") {
    const { category_name } = req.body;
    const categoryExist = await category_menu.findOne({ category_name });

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

    if (!categoryExist) {
      try {
        const result = await cloudinary.v2.uploader
          .upload_stream(
            { resource_type: "auto", folder: "FoodApp" },
            async (error, result) => {
              if (error) {
                return res.status(500).json({
                  msg: "Not uploading to cloudinary",
                });
              }
              const category = new category_menu({
                category_name: category_name,
                imageUrl: result.secure_url,
                cloudinary_id: result.public_id,
              });

              await category.save();
              res.status(200).json({
                //Category: categoryExist,
                msg: "Category saved sucessfully",
              });
            }
          )
          .end(req.file.buffer);
      } catch (cloudinaryError) {
        res.status(500).json({
          error: "Not uploading to cloudinary",
        });
      }
    } else {
      res.status(400).json({
        msg: "Category already exist",
      });
    }
  } else if (req.method === "GET") {
    const allCategories = await category_menu.find().sort({ category_name: 1 });
    res.status(200).json(allCategories);
  }
};
export default handler;
