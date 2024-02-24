import { serialize } from "cookie";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const serialized = serialize("token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({
        status: "success",
        message: "Logged out",
      });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
