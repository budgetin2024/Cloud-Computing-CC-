require("dotenv").config();
const express = require("express");
const session = require("express-session");  // Impor express-session
const cors = require("cors");
const db = require("./utils/db"); // Pastikan db.js dikonfigurasi dengan benar
const authRoutes = require('./routes/authRoutes'); // Pastikan pathnya benar
const transactionRoutes = require('./routes/transactionRoutes'); // Pastikan pathnya benar
const savingsRoutes = require('./routes/savingsRoutes'); // Pastikan pathnya benar
const spendingLimitRoutes = require('./routes/spendingLimitRoutes'); // Pastikan pathnya benar
const newsRoutes = require('./routes/newsRoutes'); // Pastikan pathnya benar
const goalsRoutes = require('./routes/goalsRoutes'); // Pastikan pathnya benar
const predictionRoutes = require('./routes/predictionRoutes'); // Pastikan pathnya benar
const errorMiddleware = require("./middlewares/errorMiddleware"); // Pastikan middleware error ada
const spendingAlertsRoutes = require("./routes/spendingAlertsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Konfigurasi session
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key",  // Secret key untuk enkripsi sesi
  resave: false,  // Tidak perlu menyimpan sesi jika tidak ada perubahan
  saveUninitialized: true,  // Simpan sesi meskipun belum diubah
  cookie: { secure: process.env.NODE_ENV === "production" }  // Atur secure cookie di production
}));

// Middleware
app.use(cors());
app.use(express.json()); // Pastikan middleware JSON parser ada


// Routes
app.use("/auth", authRoutes); // Auth routes
app.use("/transactions", transactionRoutes); // Transaction routes
app.use("/savings", savingsRoutes); // Savings routes
app.use("/spending-limit", spendingLimitRoutes); // Spending limit routes
app.use("/news", newsRoutes); // News routes
app.use("/goals", goalsRoutes); // Goals routes
app.use("/predictions", predictionRoutes); // Predictions routes
app.use("/", spendingAlertsRoutes); // Pastikan path sesuai
app.use('/api/predictions', predictionRoutes); // Sesuaikan endpoint Anda

// Error Middleware
app.use(errorMiddleware); // Pastikan errorMiddleware menangani error dengan benar

// Start server
db.connect()  // Pastikan koneksi ke DB berhasil
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
  console.log(predictionRoutes); // Periksa apakah ini adalah fungsi router
  

  
