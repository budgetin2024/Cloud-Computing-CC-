const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");  // Mengimpor fungsi spesifik
const authMiddleware = require("../middlewares/authMiddleware");
const { checkAuth } = require("../middlewares/authMiddleware");  // Pastikan middleware checkAuth diimpor dengan benar

// Pastikan ini adalah fungsi, bukan objek
router.post("/", checkAuth, transactionController.createTransaction);
// Pastikan ini adalah fungsi, bukan objek
router.get("/", checkAuth, transactionController.getTransactions);

module.exports = router;
