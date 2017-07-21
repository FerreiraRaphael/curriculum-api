import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";
import config from "../../tools/config";
import Model from "./facade";
import Controller from "../../lib/controller";
import { Responses, ErrorResponse } from "../../lib/responses";

class UserController extends Controller {
  async auth(req, res) {
    try {
      const user = await this.facade.findOne({ email: req.body.email });
      if (!user)
        Responses(res, {
          success: false,
          message: "Wrong password or email",
          code: HttpStatus.UNAUTHORIZED
        });

      const valid = await bcrypt.compare(req.body.password, user.password);

      if (!valid)
        Responses(res, {
          success: false,
          message: "Wrong password or email",
          code: HttpStatus.UNAUTHORIZED
        });

      const token = jwt.sign(user, config.SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      Responses(res, {
        success: false,
        message: "Autenticado com sucesso",
        code: HttpStatus.OK,
        data: { token }
      });
    } catch (data) {
      ErrorResponse({
        message: "Erro ao autenticar usuário",
        data
      });
    }
  }
}

export default new UserController(Model);
