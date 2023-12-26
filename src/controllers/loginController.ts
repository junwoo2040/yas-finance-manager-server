import { Response } from "express";
import { compare } from "bcrypt";

import { prisma } from "@configs/prisma";

import { ILogin } from "@models/user.model";
import { ITypedRequest } from "@utils/types";

const loginController = async (req: ITypedRequest<ILogin>, res: Response) => {
  /* Find user with username*/
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  /* If not found send error*/
  if (!user) return res.status(404).send();

  /* Compare stored password and current password */
  const isValid = compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send();

  /* Set session userId */
  req.session.userId = user.id;
  return res.status(204).send();
};

export default loginController;
