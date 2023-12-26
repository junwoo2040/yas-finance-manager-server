import { prisma } from "@configs/prisma";
import { NextFunction, Request, Response } from "express";

const adminAuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });

  if (!user?.isAdmin) return res.status(401).send();

  return next();
};

export default adminAuthorizationMiddleware;
