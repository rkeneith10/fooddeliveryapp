import mongoose from "mongoose";

const schemaOrders = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant_name: {
      type: [String],
    },
    menu_item_name: {
      type: [String],
    },
    quantity: {
      type: Number,
    },
    delivery_adress: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Orders = mongoose.models.Orders || mongoose.model("Orders", schemaOrders);
export default Orders;
