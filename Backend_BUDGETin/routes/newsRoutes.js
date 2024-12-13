const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/", newsController.getNews); // Mendapatkan berita keuangan terbaru

module.exports = router;
