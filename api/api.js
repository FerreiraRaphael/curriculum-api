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
    this.express.use(
      (
        req: express$Request,
        res: express$Response,
        next: express$NextFunction
      ) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      }
    );
  }

  routes(): void {
    this.express.use("/", routes);
  }
}
