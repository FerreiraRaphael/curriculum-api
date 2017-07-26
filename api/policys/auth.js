// @flow
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import httpStatus from "http-status-codes";
import config from "../tools/config";
import type Facade from "../lib/facade";
import { ErrorResponse } from "../lib/responses";

export default class AuthPolicy {
  email: string;
  password: string;
  token: string;
  facade: Facade;
  error: Error;
  user: Object;

  constructor(req: AuthResquest, facade: Facade) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.facade = facade;
    this.user = req.user;
  }

  async jwtAuth(): Promise<boolean> {
    try {
      const user = await this.facade.findOne({ email: this.email });

      if (!user) return false;

      const valid = await bcrypt.compare(this.password, user.password);

      if (!valid) return false;

      this.token = jwt.sign(user, config.SECRET, {
        expiresIn: 60 //* 60 * 24 // expires in 24 hours
      });

      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  static authUser(): Array<Function> {
    return [
      passport.authenticate("bearer", {
        session: false
      }),
      (req: AuthResquest, res: express$Response, next: Function): void => {
        if (req.user.error) {
          ErrorResponse(res, {
            message: req.user.error,
            code: httpStatus.UNAUTHORIZED
          });
        }
        next();
      }
    ];
  }

  static isCurrentUser(): Array<Function> {
    return [
      ...this.authUser(),
      (req: AuthResquest, res: express$Response, next: Function): void => {
        if (req.user._id !== req.params.id) {
          ErrorResponse(res, {
            message: "Não autorizado",
            code: httpStatus.UNAUTHORIZED
          });
        }
        next();
      }
    ];
  }
}
