// @flow
import HttpStatus from "http-status-codes";
import Model from "./facade";
import Controller from "../../lib/controller";
import type Facade from "../../lib/facade";
import { Responses, ErrorResponse } from "../../lib/responses";
import AuthPolicy from "../../policys/auth";

class UserController extends Controller {
  constructor(facade: Facade) {
    super(facade);
    this.fields = ["_id", "name", "email"];
  }

  async auth(req: express$ApiRequest, res: express$Response) {
    try {
      const policy = new AuthPolicy(req, this.facade);
      const valid = await policy.jwtAuth();
      if (valid) {
        const { token, user } = policy;

        Responses(res, {
          success: true,
          message: "Autenticado com sucesso",
          code: HttpStatus.OK,
          data: { token, user: this.filterFields(user) }
        });
      } else {
        Responses(res, {
          success: false,
          message: "Wrong password or email",
          code: HttpStatus.UNAUTHORIZED
        });
      }
    } catch (e) {
      ErrorResponse(res, { data: e, message: "Erro ao autenticar usuário" });
    }
  }

  me(req: express$ApiRequest, res: express$Response) {
    Responses(res, {
      success: true,
      code: HttpStatus.OK,
      data: this.filterFields(req.user)
    });
  }
}

export default new UserController(Model);
