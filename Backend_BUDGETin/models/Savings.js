const mongoose = require("mongoose");

const savingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goal: String,
  targetAmount: Number,
  dueDate: Date,
});

module.exports = mongoose.model("Savings", savingsSchema);
