import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodError } from "zod";

interface IValidators {
  params?: AnyZodObject | ZodEffects<AnyZodObject>;
  body?: AnyZodObject | ZodEffects<AnyZodObject>;
  query?: AnyZodObject | ZodEffects<AnyZodObject>;
}

const validationMiddleware = (validators: IValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params)
        req.params = await validators.params.parseAsync(req.params);

      if (validators.body)
        req.body = await validators.body.parseAsync(req.body);

      if (validators.query)
        req.query = await validators.query.parseAsync(req.query);

      return next();
    } catch (err) {
      if (err instanceof ZodError) res.status(422);
      return next(err);
    }
  };
};

export default validationMiddleware;
