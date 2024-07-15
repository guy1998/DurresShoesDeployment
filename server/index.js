const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDb } = require("./database/db.js");
const logInRouter = require("./routers/loginRouter.js");
const signUpRouter = require("./routers/signUpRouter.js");
const articleRouter = require("./routers/articleRouter.js");
const employerRouter = require("./routers/workerRouter.js");
const dailyStatisticRouter = require("./routers/dailyStatisticRouter.js");
const monthlyStatisticsRouter = require("./routers/monthlyStatisticsRouter.js");
const authorizationRouter = require("./routers/authorization.js");
const additionalCostsRouter = require("./routers/otherCostsRouter.js");
const fierStatisticsRouter = require("./routers/fierStatisticRouter.js");

const allowedOrigins = ["http://localhost:3000", "postman://app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/signUp", signUpRouter);
app.use("/article", articleRouter);
app.use("/employers", employerRouter);
app.use("/dailyStatistics", dailyStatisticRouter);
app.use("/login", logInRouter);
app.use("/monthlyStatistics", monthlyStatisticsRouter);
app.use("/auth", authorizationRouter);
app.use("/additionalCosts", additionalCostsRouter);
app.use("/fierStatistics", fierStatisticsRouter);

const port = 8003;

connectToDb(async (err) => {
  if (err) {
    console.log("Sth went wrong with the server");
  } else {
    app.listen(port, () => {
      console.log(`Listening to HTTPS on port ${port}`);
    });
  }
});
