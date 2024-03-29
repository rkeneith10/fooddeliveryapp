export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const domain =
        process.env.COOKIE_DOMAIN || "fooddelivery-kappa.vercel.app/";
      res.setHeader(
        "Set-Cookie",
        `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Domain=${domain}; Secure`
      );

      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
