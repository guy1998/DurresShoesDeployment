const express = require("express");
const app = express();
const login_controller = require("../controllers/userProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/authorize", (req, res) => {
  login_controller.authorize(req, res, () => {
    const user_info = login_controller.get_username_and_role_from_token(
      req.cookies.tokenObj.accessToken
    );
    res.status(200).json(user_info);
  });
});

module.exports = app;
