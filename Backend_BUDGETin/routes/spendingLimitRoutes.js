const express = require("express");
const router = express.Router();
const spendingLimitController = require("../controllers/spendingLimitController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkAuth } = require("../middlewares/authMiddleware");

router.post("/", checkAuth, spendingLimitController.createSpendingLimit); // Tambah batas pengeluaran
router.get("/", checkAuth, spendingLimitController.getSpendingLimit); // Lihat batas pengeluaran
router.post("/alerts",  spendingLimitController.addSpendingAlert); // Tambah alert pengeluaran

module.exports = router;
