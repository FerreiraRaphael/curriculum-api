// @flow
/* eslint-disable no-console */
import mongoose from "mongoose";
import passport from "passport";
import bearer from "./lib/strategys";
import config from "./tools/config";
import Api from "./api";

const port: string = config.PORT;
const app = new Api();

mongoose.connect(config.DB_URL);

passport.use(bearer);

console.log(`Staring web server at PORT: ${port}`);

app.express.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    const url = `http://localhost:${port}`;
    console.log(`Server listening at ${url}`);
  }
});
