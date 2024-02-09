import jwt from "jsonwebtoken";
import connectDB from "../../utils/database";
import bcrypt from bcrypt;

import users from "../../models/users";

const handler =async(req,res)=>{
  connectDB();
  if(req.method==="POST"){
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
        res.status(401).json({
          auth: false,
          msg: "Wrong Password",
        });
      } else {
        const token = jwt.sign({ id: user._id }, secretKey, {
          expiresIn: "1h",
        });
        res.setHeader("x-access-token", token).status(201).json({
          auth: true,
          token: token,
          result: user,
          msg: "Login successfully",
        });
      }
    }
  }
}
export default handler;