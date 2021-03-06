// @flow
import HttpStatus from "http-status-codes";
import type Facade from "./facade";
import { Responses, ErrorResponse } from "./responses";

export default class Controller {
  facade: Facade;
  fields: Array<string>;

  constructor(facade: Facade) {
    this.facade = facade;
    this.fields = [];
  }

  filterFields(data: Object): Object {
    return this.fields.length
      ? this.fields.reduce(
          (result, next) => ({ ...result, [next]: data[next] }),
          {}
        )
      : data;
  }

  async find(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.find(req.query, this.fields.join(" "));
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

  async findOne(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.findOne(req.query, this.fields.join(" "));
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

  async findById(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.findById(req.params.id);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        data: this.filterFields(data)
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao buscar Documento",
        data
      });
    }
  }

  async create(req: express$ApiRequest, res: express$Response) {
    try {
      const data = await this.facade.create(req.body);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        message: "Documento criado",
        data: this.filterFields(data)
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao criar Documento",
        data
      });
    }
  }

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

  async remove(req: express$Request, res: express$Response) {
    try {
      const data = await this.facade.remove(req.params.id);
      const code = data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      const success = !!data;
      Responses(res, {
        code,
        success,
        message: "Documento deletado",
        data: this.filterFields(data)
      });
    } catch (data) {
      ErrorResponse(res, {
        message: "Falha ao deletar Documento",
        data
      });
    }
  }
}
