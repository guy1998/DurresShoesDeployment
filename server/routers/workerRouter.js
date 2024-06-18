const express = require("express");
const router = express();
const workerController = require("../controllers/workersController");
const login_controller = require("../controllers/userProxy");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.createWorker(req, res);
  });
});

router.get("/getByName", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerByName(req, res);
  });
});

router.get("/getById/:workerID", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerById(req, res);
  });
});

router.get("/getBySurname", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerBySurname(req, res);
  });
});

router.get("/allWorkers", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getAllWorkers(req, res);
  });
});

router.put("/updateCost", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.updateCostPerDay(req, res);
  });
});

router.delete("/deleteById/:workerId", (req, res) => {
  login_controller.authorize.authorize(req, res, () => {
    workerController.deleteWorkerById(req, res);
  });
});

module.exports = router;
