// @flow
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";

export default class Api {
  express: express$Application;

  constructor() {
    this.express = express();
    this.middlawares();
    this.routes();
  }

  middlawares(): void {
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use(morgan("dev"));
    this.express.use("/static", express.static("static"));
  }

  routes(): void {
    this.express.use("/", routes);
  }
}
