/* middlewares/authorizationMiddleware.ts */

/* Imports */
import { NextFunction, Request, Response } from "express";

const memberAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /* Check if session is valid*/
  if (!req.session.userId) return res.status(401).send();

  /* If session is valid, continue request */
  return next();
};

export default memberAuthorizationMiddleware;
