// controllers/spendingLimitController.js

const SpendingLimit = require("../models/SpendingLimit");

exports.createSpendingLimit = async (req, res) => {
  try {
    // Mengambil data dari request body
    const { limitAmount, startDate, endDate } = req.body;

    // Proses untuk membuat SpendingLimit baru
    const spendingLimit = await SpendingLimit.create({
      userId: req.user.id,  // Menggunakan ID pengguna dari request (pastikan user sudah terautentikasi)
      limitAmount,          // Jumlah limit pengeluaran yang ditetapkan
      startDate,            // Tanggal mulai pengeluaran
      endDate,              // Tanggal akhir pengeluaran
    });

    // Menangani respons jika berhasil membuat SpendingLimit
    res.status(201).json({
      message: "Spending limit added successfully.",
      spendingLimit,
    });
  } catch (error) {
    // Menangani error jika terjadi kesalahan server
    res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};

exports.getSpendingLimit = async (req, res) => {
  try {
    // Mengambil semua spending limits berdasarkan userId
    const spendingLimits = await SpendingLimit.find({ userId: req.user.id });

    // Menangani respons jika data ditemukan
    res.status(200).json({ spendingLimits });
  } catch (error) {
    // Menangani error jika terjadi kesalahan server
    res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};

// Fungsi untuk menambahkan spending alert (dummy function)
exports.addSpendingAlert = async (req, res) => {
  try {
    // Implementasi untuk alert pengeluaran (bisa diintegrasikan dengan notifikasi real-time di masa depan)
    res.status(200).json({ message: "Spending alert configured successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};
