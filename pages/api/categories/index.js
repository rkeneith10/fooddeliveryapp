import category_menu from "../models/category_menu";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  await connectDB();
  if (req.method === "POST") {
    const { category_name } = req.body;
    const categoryExist = await category_menu.findOne({ category_name });

    if (!categoryExist) {
      const category = new category_menu({
        category_name: category_name,
      });

      await category.save();
      res.status(200).json({
        //Category: categoryExist,
        msg: "Category saved sucessfully",
      });
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
