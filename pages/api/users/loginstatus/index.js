import jwt from "jsonwebtoken";
import connectDB from "../../utils/database";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    // Check if the request contains the HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ auth: false });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Extract relevant information from the decoded token
      const userId = decoded.id;

      // If verification is successful, user is authenticated
      res.status(200).json({ auth: true, userId });
    } catch (error) {
      // If verification fails, token is invalid
      res.status(401).json({ auth: false });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
