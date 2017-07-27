// @flow
import HttpStatus from "http-status-codes";

export function Responses(
  res: express$Response,
  options: ResponseObject
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
  const code = options.code || HttpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  const resObject: ResponseObject = Object.assign(
    {},
    { code, success },
    options
  );

  res.status(code).json(resObject);
}
