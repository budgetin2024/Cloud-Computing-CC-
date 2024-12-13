const jwt = require("jsonwebtoken");

// Gunakan JWT_SECRET dari .env, atau fallback ke "your_secret_key" jika tidak ada
const JWT_SECRET = process.env.JWT_SECRET || "Token_1234"; // Pastikan menggunakan JWT_SECRET yang konsisten

// Fungsi untuk membuat token JWT
exports.generateToken = (payload) => {
  // Pastikan payload adalah objek yang valid
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Expected payload to be a plain object");
  }

  // Sertakan data pengguna yang diperlukan dalam payload, seperti id pengguna
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // Token berlaku selama 1 hari
};

// Fungsi untuk memverifikasi token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
