import jwt from "jsonwebtoken";
import users from "../../models/users";
import connectDB from "../../utils/database";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ auth: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;
      const userinfo = await users.findOne({ _id: userId });
      return res.status(200).json({
        info: userinfo,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  }
};
export default handler;
