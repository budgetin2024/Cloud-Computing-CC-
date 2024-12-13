const mongoose = require("mongoose");

const spendingLimitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  limit: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("SpendingLimit", spendingLimitSchema);
