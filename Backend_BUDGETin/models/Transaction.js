const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: String,
  amount: Number,
  date: Date,
});

module.exports = mongoose.model("Transaction", transactionSchema);
