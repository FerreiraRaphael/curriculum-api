// @flow
/* eslint-disable no-console */

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import bearer from "./lib/strategys";
import config from "./tools/config";
import routes from "./routes";

const port: string = config.PORT;
const app = express();

mongoose.connect(config.DB_URL);

passport.use(bearer);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/static", express.static("static"));

console.log(`Staring web server at PORT: ${port}`);

app.use("/", routes);

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    const url = `http://localhost:${port}`;
    console.log(`Server listening at ${url}`);
  }
});
