export default async function handler(req, res) {
  if (req.method === "POST") {
    // Clear the HTTP-only cookie named 'token'
    res.setHeader(
      "Set-Cookie",
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
    );

    // Respond with a success message
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
