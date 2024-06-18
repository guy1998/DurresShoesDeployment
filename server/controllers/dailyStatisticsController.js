const DailyStatistics = require("../models/dailyStatistics");

async function createDailyStatistics(req, res) {
    try {
      const { code, quantity, costPerArticle } = req.body;
      const newArticle = new Article({
        code: code,
        quantity: quantity,
        costPerArticle: costPerArticle,
      });
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (err) {
      res.status(400).json({ error: "Failed to create article" });
    }
  }