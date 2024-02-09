import menu_item from "../models/menu_items";
import restaurants from "../models/restaurants";
import connectDB from "../utils/database";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const { item_name, restaurant_name, description, price, category } =
      req.body;
    const newMenuItem = new menu_item({
      restaurant_name: restaurant_name,
      item_name: item_name,
      category: category,
      description: description,
      price: price,
    });

    await newMenuItem.save();
    const filter = { restaurant_name: restaurant_name };
    const update = { $push: { menus: newMenuItem } };
    await restaurants.updateOne(filter, update);

    res.status(200).json({ success: true, data: newMenuItem });
  } else if (req.method === "GET") {
    const response = await menu_item.aggregate([
      {
        $match: {
          restaurant_name: req.body.restaurant_name,
          category: req.body.category,
        },
      },
      {
        $group: {
          _id: "$_id",
          category: { $last: "$category" },
          item_name: { $last: "$item_name" },
        },
      },
    ]);
    if (response) {
      res.status(200).json(response);
    }
  }
};
export default handler;
