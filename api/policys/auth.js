// @flow
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../tools/config";
import type Facade from "../lib/facade";

export default class AuthPolicy {
  email: string;
  password: string;
  token: string;
  facade: Facade;
  error: Error;
  user: Object;

  // eslint-disable-next-line no-undef
  constructor(req: AuthResquest, facade: Facade) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.facade = facade;
    this.user = req.user;
  }

  async jwtAuth() {
    try {
      const user = await this.facade.findOne({ email: this.email });

      if (!user) return false;

      const valid = await bcrypt.compare(this.password, user.password);

      if (!valid) return false;

      this.token = jwt.sign(user, config.SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  isCurrentUser(id: string): boolean {
    return this.user._id === id;
  }
}
