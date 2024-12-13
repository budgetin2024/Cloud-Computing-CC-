const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController"); // Pastikan path ini benar

// Rute untuk prediksi
router.post("/predict", predictionController.predict); // Memastikan metode POST
router.post("/statistics", predictionController.getStatistics); // Memastikan metode POST

module.exports = router;
