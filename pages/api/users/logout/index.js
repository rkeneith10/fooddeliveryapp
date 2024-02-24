export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Clear the cookie, specifying domain and Secure flag (if applicable)
      const domain = "fooddelivery-kappa.vercel.app/"; // Get domain from environment variable or set default
      res.setHeader(
        "Set-Cookie",
        `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Domain=${domain}; Secure`
      );

      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
