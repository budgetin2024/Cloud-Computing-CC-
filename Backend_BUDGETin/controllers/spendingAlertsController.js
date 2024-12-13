// controllers/spendingAlertsController.js
exports.createSpendingAlert = (req, res) => {
    const { limit, frequency, category } = req.body;
  
    // Validasi input
    if (!limit || !frequency || !category) {
      return res.status(400).json({ message: "All fields (limit, frequency, category) are required." });
    }
  
    // Simpan data spending alert ke database (contoh pseudo-code)
    const newAlert = {
      id: Date.now(),
      limit,
      frequency,
      category,
    };
  
    // Kirimkan respons berhasil
    res.status(201).json({ message: "Spending alert created successfully!", data: newAlert });
  };
  