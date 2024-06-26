const express = require("express");
const app = express();
const login_controller = require("../controllers/UserProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const login_result = await login_controller.login_process(
    req.body.username,
    req.body.password
  );
  if (login_result.token_obj.accessToken) {
    res.cookie("tokenCookie", login_result.token_obj, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false, //when true it implies https
      sameSite: "none",
    });
    res.status(200).json("User authenticated successfully!");
  } else {
    res.status(401).json(login_result.message);
  }
});

app.post("/logout", async (req, res) => {
  await login_controller.logOut(res);
});

module.exports = app;
