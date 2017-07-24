import BearerStrategy from "passport-http-bearer";
import jwt from "jsonwebtoken";
import config from "../tools/config";

const Bearer = new BearerStrategy((token, done) => {
  jwt.verify(token, config.SECRET, (err, user) => {
    if (err) {
      return done("err");
    }
    if (!user) {
      return done(null, {
        success: false,
        message: "Failed to authenticate token."
      });
    }
    return done(null, user._doc);
  });
});

export default Bearer;
