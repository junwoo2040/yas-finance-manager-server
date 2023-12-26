import { Request, Response } from "express";

import { prisma } from "@configs/prisma";

const authorizeController = (req: Request, res: Response) => {
  if (!req.session.userId) return res.status(401).send("No authorization");

  const user = prisma.user.findUnique({ where: { id: req.session.userId } });

  if (!user) return res.status(401).send("Invalid session");

  return res.status(204).send();
};

export default authorizeController;
