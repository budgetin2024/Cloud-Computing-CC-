// Import model Savings
const Savings = require("../models/Savings");

/**
 * Fungsi untuk menambahkan target tabungan baru.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
exports.createSaving = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Debug untuk memastikan req.user ada
    const { targetName, targetAmount, currentAmount, deadline } = req.body;

    // Validasi input
    if (!targetName || !targetAmount || !deadline) {
      return res.status(400).json({
        message: "All fields (targetName, targetAmount, deadline) are required."
      });
    }

    // Validasi format deadline
    if (isNaN(new Date(deadline))) {
      return res.status(400).json({ message: "Invalid date format for deadline." });
    }

    // Membuat entri tabungan baru di database
    const saving = await Savings.create({
      userId: req.user.id, // ID user dari middleware otentikasi
      targetName,
      targetAmount,
      currentAmount: currentAmount || 0, // Default ke 0 jika tidak diberikan
      deadline
    });

    res.status(201).json({
      message: "Saving target added successfully.",
      saving
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * Fungsi untuk mendapatkan daftar tabungan berdasarkan pengguna.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
exports.getSavings = async (req, res) => {
  try {
    // Mengambil data tabungan untuk user tertentu
    const savings = await Savings.find({ userId: req.user.id });

    res.status(200).json({ savings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * Fungsi untuk menghapus target tabungan berdasarkan ID.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
exports.deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;

    // Menghapus tabungan berdasarkan ID dan userId untuk keamanan
    const result = await Savings.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!result) {
      return res.status(404).json({
        message: "Saving target not found or not authorized to delete."
      });
    }

    res.status(200).json({ message: "Saving target deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * Fungsi untuk memperbarui target tabungan.
 * @param {Object} req - Objek permintaan HTTP.
 * @param {Object} res - Objek respons HTTP.
 */
exports.updateSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validasi input untuk pembaruan (misalnya, tidak boleh menghapus semua properti)
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields to update provided." });
    }

    // Validasi format deadline jika diperbarui
    if (updates.deadline && isNaN(new Date(updates.deadline))) {
      return res.status(400).json({ message: "Invalid date format for deadline." });
    }

    // Memperbarui tabungan berdasarkan ID dan userId untuk keamanan
    const saving = await Savings.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true, runValidators: true } // Mengembalikan dokumen yang diperbarui dan validasi input
    );

    if (!saving) {
      return res.status(404).json({
        message: "Saving target not found or not authorized to update."
      });
    }

    res.status(200).json({
      message: "Saving target updated successfully.",
      saving
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
