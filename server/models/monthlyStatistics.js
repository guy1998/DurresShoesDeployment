const mongoose = require("mongoose");
const { Schema } = mongoose;

const monthlyStatisticsSchema = new Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalProfit: { type: Number, required: true },
  timestamps: true,
});

const MonthlyStatistics = mongoose.model(
  "Monthly Statistics",
  monthlyStatisticsSchema
);

module.exports = MonthlyStatistics;
