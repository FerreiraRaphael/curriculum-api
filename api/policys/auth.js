// @flow
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import httpStatus from "http-status-codes";
import config from "../tools/config";
import type Facade from "../lib/facade";
import { ErrorResponse } from "../lib/responses";

const tokenExists: express$Middleware = (
  req: express$Request,
  res: express$Response,
  next: express$NextFunction
): void => {
  if (
    req.headers &&
    !req.headers.authorization &&
    (req.body && !req.body.access_token) &&
    (req.query && !req.query.access_token)
  ) {
    ErrorResponse(res, {
      message: "Token não informado",
      code: httpStatus.UNAUTHORIZED
    });
  }
  next();
};

const authBearer: Array<express$Middleware> = [
  passport.authenticate("bearer", {
    session: false
  }),
  (
    req: express$ApiRequest,
    res: express$Response,
    next: express$NextFunction
  ): void => {
    if (req.user && req.user.error) {
      ErrorResponse(res, {
        message: req.user.error,
        code: httpStatus.UNAUTHORIZED
      });
    }
    next();
  }
];

const checkIfIsCurrentUser: express$Middleware = (
  req: express$ApiRequest,
  res: express$Response,
  next: Function
): void => {
  if (req.user && req.user._id !== req.params.id) {
    ErrorResponse(res, {
      message: "Não autorizado",
      code: httpStatus.UNAUTHORIZED
    });
  }
  next();
};

export default class AuthPolicy {
  email: string;
  password: string;
  token: string;
  facade: Facade;
  error: Error;
  user: Object;

  constructor(req: express$ApiRequest, facade: Facade) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.facade = facade;
    this.user = req.user || {};
  }

  async jwtAuth(): Promise<boolean> {
    try {
      const user = await this.facade.findOne({ email: this.email });

      if (!user) return false;

      const valid = await bcrypt.compare(this.password, user.password);

      if (!valid) return false;

      this.token = jwt.sign(user, config.SECRET);

      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  static authUser(): Array<Function> {
    return [tokenExists, ...authBearer];
  }

  static isCurrentUser(): Array<Function> {
    return [...this.authUser(), checkIfIsCurrentUser];
  }
}
