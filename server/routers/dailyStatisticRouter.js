const express = require("express");
const router = express();
const dailyStatisticController = require("../controllers/dailyStatisticsController");
const login_controller = require("../controllers/userProxy");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.createDailyStatistic(req, res);
  });
});

router.get("/statistics/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticById(req, res);
  });
});

router.get("/prodCode", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByProductCode(req, res);
  });
});

router.get("/profit", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByProfit(req, res);
  });
});

router.get("/timeRange", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByTimeRange(req, res);
  });
});

router.get("/all", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getAllStatistics(req, res);
  });
});

router.delete("/deleteById/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.deleteStatisticById(req, res);
  });
});

module.exports = router;
