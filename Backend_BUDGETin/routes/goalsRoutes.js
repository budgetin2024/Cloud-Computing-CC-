const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goalsController");
const { checkAuth } = require("../middlewares/authMiddleware");

// Tambah tujuan keuangan
router.post("/", checkAuth, goalsController.createGoal);

// Lihat daftar tujuan
router.get("/", checkAuth, goalsController.getGoals);

// Perbarui tujuan keuangan
router.put("/:id", checkAuth, goalsController.updateGoal);

// Hapus tujuan keuangan
router.delete("/:id", checkAuth, goalsController.deleteGoal);

module.exports = router;
