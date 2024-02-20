import users from "../../models/users";
import connectDB from "../../utils/database";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { userid } = req.query;
      const userinfo = await users.findOne({ _id: userid });
      res.status(200).json({
        success: true,
        data: userinfo,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  }
};
export default handler;
