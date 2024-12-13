// routes/spendingAlertsRoutes.js
const express = require("express");
const router = express.Router();
const spendingAlertsController = require("../controllers/spendingAlertsController"); // Pastikan file controller ada

// Tambahkan endpoint POST untuk spending alerts
router.post("/spending-alerts", spendingAlertsController.createSpendingAlert);

module.exports = router;
