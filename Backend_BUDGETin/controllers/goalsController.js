const Goal = require("../models/Goal");

// Fungsi untuk membuat goal
exports.createGoal = async (req, res) => {
  try {
    const { goalName, goalAmount, currentAmount = 0, deadline, category } = req.body;

    if (!goalName || !goalAmount || !deadline || !category) {
      return res.status(400).json({
        message: "All fields (goalName, goalAmount, deadline, category) are required."
      });
    }

    if (isNaN(new Date(deadline))) {
      return res.status(400).json({ message: "Invalid date format for deadline." });
    }

    const existingGoal = await Goal.findOne({ userId: req.user.id, name: goalName });
    if (existingGoal) {
      return res.status(400).json({ message: "Goal with the same name already exists." });
    }

    const goal = await Goal.create({
      userId: req.user.id,
      name: goalName,
      targetAmount: goalAmount,
      progress: currentAmount,
      dueDate: deadline,
      category
    });

    res.status(201).json({ message: "Goal created successfully.", goal });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi untuk melihat daftar goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi untuk memperbarui goal
exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params; // ID goal dari parameter URL
    const { goalName, goalAmount, currentAmount, deadline, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Goal ID is required." });
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name: goalName, targetAmount: goalAmount, progress: currentAmount, dueDate: deadline, category },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    res.status(200).json({ message: "Goal updated successfully.", goal });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Fungsi untuk menghapus goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params; // ID goal dari parameter URL

    if (!id) {
      return res.status(400).json({ message: "Goal ID is required." });
    }

    const goal = await Goal.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    res.status(200).json({ message: "Goal deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
