const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // Sebelumnya "goal"
  targetAmount: { type: Number, required: true },
  progress: { type: Number, default: 0 }, // Sebelumnya "currentAmount"
  dueDate: { type: Date, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model("Goal", goalSchema);
