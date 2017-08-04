// @flow
import HttpStatus from "http-status-codes";
import Model from "./facade";
import Controller from "../../lib/controller";
import { Responses, ErrorResponse } from "../../lib/responses";

class WorkController extends Controller {
  async create(req: express$ApiRequest, res: express$Response) {
    try {
      if (!req.user) {
        ErrorResponse(res, {
          message: "Usuário invalido"
        });
        return;
      }
      const requestBody = Object.assign({}, req.body, { user: req.user._id });
      const data = await this.facade.create(requestBody);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_MODIFIED;
      const success = !!data;
      Responses(res, {
        code,
        success,
        message: "Documento criado",
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao criar Documento",
        data
      });
    }
  }
}

export default new WorkController(Model);
