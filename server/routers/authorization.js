const express = require("express");
const app = express();
const login_controller = require("../controllers/UserProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/authorize", (req, res) => {
  login_controller.authorize(req, res, () => {
    res.status(200).json("Authorized")
  });
});

module.exports = app;
