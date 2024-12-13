// Placeholder for ML data
const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  month: String,
  suggestedSavings: Number,
});

module.exports = mongoose.model("Prediction", predictionSchema);
