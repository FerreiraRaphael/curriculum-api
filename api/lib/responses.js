// @flow
import HttpStatus from "http-status-codes";

export function Responses(
  res: express$Response,
  options: {
    success: boolean,
    code: number,
    message?: string,
    data?: Object
  }
): void {
  res.status(options.code).json(options);
}

export function ErrorResponse(
  res: express$Response,
  options: {
    message?: string,
    data?: Object,
    code?: number
  }
): void {
  const code = HttpStatus.INTERNAL_SERVER_ERROR;
  const success = false;

  res.status(code).json(Object.assign({}, { code, success }, options));
}
