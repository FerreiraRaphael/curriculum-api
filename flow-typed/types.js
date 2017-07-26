/* eslint-disable no-unused-vars */

declare class AuthResquest extends express$Request {
  user: any
}

type ResponseObject = {
  success: boolean,
  code: number,
  message?: string,
  data?: Object
};
