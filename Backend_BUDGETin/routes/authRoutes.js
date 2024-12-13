const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authMiddleware"); // Middleware untuk otentikasi
const authController = require("../controllers/authController"); // Controller yang menangani rute

// Rute untuk register dan login
router.post("/register", authController.register);  // Menangani registrasi pengguna
router.post("/login", authController.login);  // Menangani login pengguna

// Rute untuk mendapatkan profil pengguna, tidak memerlukan otentikasi
router.get("/profile", authController.getProfile);  // Mengambil profil pengguna

// Rute untuk mendapatkan detail pengguna, memerlukan otentikasi
router.get("/user", checkAuth, authController.getUserDetails); // Menggunakan checkAuth middleware untuk memastikan otentikasi

// Rute untuk logout (Session-based Authentication) - menggunakan POST
router.post("/logout", (req, res) => {
  // Menghapus sesi pengguna
  req.session.destroy((err) => {
    if (err) {
      // Jika terjadi kesalahan saat menghancurkan sesi, kirimkan respons error
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    // Jika sesi berhasil dihancurkan, kirimkan respons sukses
    res.status(200).json({ message: "Logout successful" });
  });
});

// Rute untuk logout (GET) - hanya untuk pengujian
// Rute ini hanya untuk pengujian dan tidak disarankan digunakan di produksi
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;

