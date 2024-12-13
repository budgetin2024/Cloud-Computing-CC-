const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config.js"); // Pastikan SECRET_KEY di config sudah ada

/**
 * Fungsi untuk memverifikasi token JWT.
 * @param {string} token - Token JWT untuk diverifikasi.
 * @returns {Object} Payload dari token yang sudah diverifikasi.
 * @throws {Error} Jika token tidak valid.
 */
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY); // Pastikan SECRET_KEY yang digunakan sama dengan yang digunakan untuk generate token
};

/**
 * Middleware untuk memeriksa autentikasi pengguna berdasarkan token JWT.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 * @param {Function} next - Fungsi untuk melanjutkan ke middleware/handler berikutnya.
 */
module.exports.checkAuth = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    // Cek apakah token ada dan diawali dengan 'Bearer '
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token is required or malformed." });
    }

    // Ekstrak token setelah 'Bearer '
    const token = authHeader.split(" ")[1];

    // Verifikasi token menggunakan fungsi verifyToken
    const decoded = verifyToken(token); // Pastikan verifyToken mengembalikan payload yang valid

    // Simpan data user (misalnya `id` atau informasi lain dari payload token) ke `req.user`
    req.user = decoded; // Pastikan decoded mengandung data pengguna yang diperlukan

    // Lanjut ke middleware atau handler berikutnya
    next();
  } catch (err) {
    // Tangani error spesifik dari JWT
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token. Access denied." });
    } else if (err.name === "NotBeforeError") {
      return res.status(401).json({ error: "Token is not active yet. Access denied." });
    }

    // Tangani error server jika terjadi kesalahan lain
    return res.status(500).json({ error: "Server error during token validation." });
  }
};
