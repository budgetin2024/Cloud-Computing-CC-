const Transaction = require("../models/Transaction"); // Mengimpor model Transaction

// Fungsi untuk membuat transaksi
exports.createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date } = req.body;

    // Validasi data yang diterima
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Membuat transaksi baru dengan userId yang diambil dari req.user.id
    const transaction = await Transaction.create({
      userId: req.user.id,  // Mengambil ID pengguna dari req.user yang sudah di-set oleh middleware
      type,
      category,
      amount,
      date,
    });

    res.status(201).json({
      message: "Transaction added successfully.",
      transaction,
    });
  } catch (error) {
    console.error("Error in createTransaction:", error); // Menambahkan log error
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi untuk mendapatkan semua transaksi berdasarkan userId
exports.getTransactions = async (req, res) => {
  console.log("Request received for getTransactions"); // Debug log

  try {
    // Ambil userId dari req.user (seharusnya sudah di-set oleh middleware checkAuth)
    const userId = req.user.id;

    if (!userId) {
      console.log("User ID missing"); // Debug log
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Querying database for transactions..."); // Debug log
    const transactions = await Transaction.find({ userId });

    if (transactions.length === 0) {
      console.log("No transactions found"); // Debug log
      return res.status(404).json({ message: "No transactions found." });
    }

    console.log("Transactions retrieved:", transactions); // Debug log
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error in getTransactions:", error); // Menambahkan log error
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi untuk mendapatkan transaksi berdasarkan filter tertentu
exports.getFilteredTransactions = async (req, res) => {
  console.log("Request received for getFilteredTransactions"); // Debug log

  const { type, category, amount, date } = req.query; // Menggunakan query params untuk filter

  // Validasi filter yang diterima
  if (!type && !category && !amount && !date) {
    return res.status(400).json({ message: "At least one filter is required" });
  }

  try {
    console.log("Querying database with filters..."); // Debug log
    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (amount) filters.amount = amount;
    if (date) filters.date = date;

    const transactions = await Transaction.find(filters).limit(10); // Tambahkan limit agar query lebih efisien

    if (transactions.length === 0) {
      console.log("No transactions found with the given filters"); // Debug log
      return res.status(404).json({ message: "No transactions found with the provided filters." });
    }

    console.log("Filtered transactions retrieved:", transactions); // Debug log
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error in getFilteredTransactions:", error); // Menambahkan log error
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
