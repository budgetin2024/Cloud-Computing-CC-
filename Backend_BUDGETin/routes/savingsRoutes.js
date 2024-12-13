const express = require("express");
const router = express.Router();
const savingsController = require("../controllers/savingsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkAuth } = require("../middlewares/authMiddleware");

router.post("/", checkAuth, savingsController.createSaving);  // Tambah target tabungan
router.get("/",  checkAuth, savingsController.getSavings);  // Lihat target tabungan

module.exports = router;
