// @flow
import HttpStatus from "http-status-codes";

class ApiResponse {
  /* eslint-disable no-undef*/
  res: express$Response;
  constructor(res: express$Response) {
    /* eslint-enable no-undef */
    this.res = res;
  }
}

export function Responses(
  res: express$Response, // eslint-disable-line no-undef
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
  res: express$Response, // eslint-disable-line no-undef
  options: {
    message?: string,
    data?: Object
  }
): void {
  const code = HttpStatus.EXPECTATION_FAILED;
  const success = false;

  res.status(code).json(Object.assign({}, { code, success }, options));
}
