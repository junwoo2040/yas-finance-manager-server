import { Request } from "express";

export interface ITypedRequest<T> extends Request {
  body: T;
}
