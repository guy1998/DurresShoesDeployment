const DailyStatistics = require("../models/dailyStatistics");
const Workers = require("../models/workers");
const Article = require("../models/article");
const articleController = require("../controllers/articleController");

const getTotalWorkersCost = async () => {
  const workers = await Workers.find();
  const totalWorkersCost = workers.reduce(
    (total, worker) => total + worker.costPerDay,
    0
  );
  return totalWorkersCost;
};

const createDailyStatistic = async (req, res) => {
  try {
    let totalEarned = 0;
    const { products } = req.body;

    products.forEach((product) => {
      const cost1 = parseFloat(product.cost.toString());
      totalEarned += product.quantity * cost1;
    });

    const productionCost = await getTotalWorkersCost();
    const profit = totalEarned - parseFloat(productionCost.toString());

    const newDailyStatistic = new DailyStatistics({
      products: products.map((product) => ({
        code: product.code, 
        quantity: product.quantity,
        cost: product.cost,
      })),
      productionCost: Decimal128.fromString(productionCost.toString()),
      profit: profit,
      earned: totalEarned,
    });
    const savedStatistic = await newDailyStatistic.save();
    res.status(201).json(savedStatistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const statistic = await DailyStatistics.findById(statisticId);
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByProductCode = async (req, res) => {
  try {
    const { productCode } = req.body;
    const statistic = await DailyStatistics.find({
      "products.code": productCode,
    });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllStatistics = async (req, res) => {
  try {
    const statistic = await DailyStatistics.find();
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByProfit = async (req, res) => {
  try {
    const profit = req.body;
    const statistic = await DailyStatistics.find({ profit: profit });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByTimeRange = async (req, res) => {
  try {
    const { startDate } = req.body;
    const statistic = await DailyStatistics.find({
      createdAt: {
        $gte: new Date(startDate),
      },
    });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const deleteStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const deletedStatistic = await Article.findByIdAndDelete(statisticId);
    if (!deletedStatistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json({ message: "Statistic deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createDailyStatistic,
  getAllStatistics,
  getStatisticById,
  getStatisticByProfit,
  getStatisticByProductCode,
  getStatisticByTimeRange,
  deleteStatisticById,
  getTotalWorkersCost,
};
