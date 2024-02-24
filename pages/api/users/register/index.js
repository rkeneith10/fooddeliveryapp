import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import connectDB from "../../utils/database";

import users from "../../models/users";

const handler = async (req, res) => {
  await connectDB();
  if (req.method === "POST") {
    const { firstName, lastName, email, adress, telephone, password } =
      req.body;
    const existEmail = await users.findOne({ email });
    const existPhone = await users.findOne({ telephone });

    if (!existEmail || !existPhone) {
      const newUser = new users({
        firstName: firstName,
        lastName: lastName,
        email: email,
        adress: adress,
        telephone: telephone,
        password: await bcrypt.hash(password, 10),
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600, // 1 hour in seconds
          sameSite: "strict", // Better security with strict same-site policy
          path: "/", // The path for which the cookie is valid
        })
      );

      res.status(201).json({
        success: true,

        datauser: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          adress: newUser.adress,
          telephone: newUser.telephone,
        },
        token: token,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Email or phone number already taken",
      });
    }
  }
};
export default handler;
