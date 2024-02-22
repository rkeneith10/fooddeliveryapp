import multer from "multer";
import category from "../models/category_menu";
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

  switch (req.method) {
    case "POST":
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

      const categoyExist = await category.findOne({
        category: req.body.category,
      });
      if (!categoyExist) {
        const result = await cloudinary.v2.uploader
          .upload_stream(
            { resource_type: "auto", folder: "FoodApp" },
            async (error, result) => {
              if (error) {
                return res.status(500).json({
                  msg: "Not uploading to cloudinary",
                });
              }

              const newCategory = new category({
                category: req.body.category,
                imageUrl: result.secure_url,
                cloudinary_id: result.public_id,
              });

              await newCategory.save();

              res.status(200).json({
                msg: "Upload to cloudinary && save to mongoDB",
                data: newCategory,
              });
            }
          )
          .end(req.file.buffer);
      } else {
        res
          .status(400)
          .json({ success: false, message: "Category already exist" });
      }

      break;

    case "GET":
      try {
        // Requête pour récupérer les catégories avec des menus associés
        const categoriesWithMenus = await category.aggregate([
          {
            $lookup: {
              from: "menu_items",
              localField: "category",
              foreignField: "category",
              as: "menus",
            },
          },
          {
            $match: {
              menus: { $ne: [] },
            },
          },
        ]);

        res.status(200).json({
          success: true,
          all: categoriesWithMenus,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: "Internal server error",
        });
      }
      break;

    default:
      res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
};

export default handler;
