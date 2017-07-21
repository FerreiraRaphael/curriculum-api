// @flow
import HttpStatus from "http-status-codes";
import type Facade from "./facade";
import { Responses, ErrorResponse } from "./responses";

export default class Controller {
  facade: Facade;

  constructor(facade: Facade) {
    this.facade = facade;
  }
  // eslint-disable-next-line no-undef
  async find(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.find(req.query);
      Responses(res, {
        code: HttpStatus.OK,
        success: true,
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao buscar Documentos",
        data
      });
    }
  }
  // eslint-disable-next-line no-undef
  async findOne(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.findOne(req.query);
      Responses(res, {
        code: HttpStatus.OK,
        success: true,
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao buscar Documento",
        data
      });
    }
  }
  // eslint-disable-next-line no-undef
  async findById(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.findById(req.params.id);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao buscar Documento",
        data
      });
    }
  }
  // eslint-disable-next-line no-undef
  async create(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.create(req.body);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao criar Documento",
        data
      });
    }
  }
  // eslint-disable-next-line no-undef
  async update(req: express$Request, res: express$Response) {
    try {
      const conditions = { _id: req.params.id };
      const data = await this.facade.update(conditions, req.body);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        message: "Documento atualizado",
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao atualizar Documento",
        data
      });
    }
  }
  // eslint-disable-next-line no-undef
  async remove(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.remove(req.params.id);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        message: "Documento deletado",
        data
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao deletar Documento",
        data
      });
    }
  }
}
