import connectDB from "./utils/database";

connectDB();

export default function handler(req, res) {
  // Logique de votre fonction d'API
  res.status(200).json({ message: "Hello World" });
}
