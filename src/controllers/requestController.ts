import { Response } from "express";

import { ITypedRequest } from "@utils/types";
import { prisma } from "@configs/prisma";
import encrypt from "@utils/encrypt";
import { ICreateAccountRequestInput } from "@models/user.model";

const requestController = async (
  req: ITypedRequest<ICreateAccountRequestInput>,
  res: Response,
) => {
  const { confirmPassword, ...body } = req.body;

  try {
    await prisma.accountRequest.create({
      data: {
        ...body,
        password: await encrypt(req.body.password, 10),
      },
    });
  } catch (e) {
    return res.status(400).send();
  }

  return res.status(200).send();
};

export default requestController;
