/* eslint-disable no-unused-vars */

declare class express$AuthRequest extends express$Request {
  user: any
}
declare type express$Middleware =
  | ((
      req: express$Request,
      res: express$Response,
      next: express$NextFunction
    ) => mixed)
  | ((
      req: express$AuthRequest,
      res: express$Response,
      next: express$NextFunction
    ) => mixed)
  | ((
      error: ?Error,
      req: express$Request,
      res: express$Response,
      next: express$NextFunction
    ) => mixed);

type ResponseObject = {
  success: boolean,
  code: number,
  message?: string,
  data?: Object
};
