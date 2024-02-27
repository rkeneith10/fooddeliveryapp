import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import users from "../../models/users";
import connectDB from "../../utils/database";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await users.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        auth: false,
        msg: "User does not exist",
      });
    } else {
      const equalPassword = bcrypt.compareSync(password, user.password);
      if (!equalPassword) {
        res.status(400).json({
          auth: false,
          msg: "Wrong Password",
        });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        // Set cookie with JWT token
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

        // Return response
        res.status(200).json({
          auth: true,
          datauser: {
            firstName: user.firstName,
            lastName: user.lastName,
            adress: user.adress,
            telephone: user.telephone,
          },
          msg: "Login successfully",
        });
      }
    }
  }
};

export default handler;
