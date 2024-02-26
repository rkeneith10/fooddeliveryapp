// import jwt from "jsonwebtoken";
// import Orders from "../models/orders";
// import connectDB from "../utils/database";
import moncash from "../utils/moncash";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const create_payment_json = {
      amount: 90,
      orderId: "90900",
    };

    const payment_creator = moncash.payment;
    payment_creator.create(create_payment_json, function (error, payment) {
      if (error) {
        res.json({
          success: false,
          message: error,
        });
        console.log(error);
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment_creator.redirect_uri(payment));
        opn(payment_creator.redirect_uri(payment));

        res.json({
          success: true,
          link: payment_creator.redirect_uri(payment),
        });
      }
    });
  }
};
export default handler;
