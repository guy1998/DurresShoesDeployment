const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailyStatisticsSchema = new Schema({
  articleCode: { type: Schema.Types.ObjectId, required: true, ref: "Article" },
  profit: { type: Number, required: true },
  productionCost: { type: Number, required: true },
  timestamps: true,
});

const DailyStatistics = mongoose.model(
  "Daily Statistics",
  dailyStatisticsSchema
);

module.exports = DailyStatistics;
